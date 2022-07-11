import {  useState,useMemo } from 'react'

import Checkbox from '../../components/Checkbox'
import AddNew from '../../components/AddNew'
import moment from 'moment'
import { Button, Dropdown, Empty, Menu } from 'antd'
import { BsFilterRight } from 'react-icons/bs'
import { MdDragIndicator } from 'react-icons/md'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export interface TodoItem {
	id: string
	content: string
	isCompleted: boolean
	description?: string
	time?: moment.Moment
	isLink?: boolean
}
const today = moment().startOf('hour')

const reorder = (list: TodoItem[], startIndex: number, endIndex: number) => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
	userSelect: 'none',
	background: isDragging ? '#262626' : 'none',
	...draggableStyle
})

function Main() {
  const statusMap: Record<string, string> = {
		0: '全部',
		1: '已完成',
		2: '未完成'
	}
	const [todoList, setTodoList] = useState<TodoItem[]>([
		// {
		// 	id: '1',
		// 	content: '看书读报,了解世界',
		// 	isCompleted: true,
		// 	time: moment(),
		// 	isLink: false
		// },
		// {
		// 	id: '2',
		// 	content: '看书读报,了解世界1',
		// 	isCompleted: true,
		// 	time: moment(),
		// 	isLink: false
		// }
	])
  const [currentStatus, setCurrentStatus] = useState<string>('0')
  const filterList = useMemo(() => {
		if (currentStatus === '0') {
			return todoList
		} else if (currentStatus === '1') {
			return todoList.filter((item) => item.isCompleted)
		} else {
			return todoList.filter((item) => !!item.isCompleted === false)
		}
	}, [currentStatus, todoList])
	return (
		<div className='main-container'>
			<div className='header'>
				<h1>Todo List</h1>
				<Dropdown
					overlay={
						<Menu
							defaultSelectedKeys={[currentStatus]}
							selectedKeys={[currentStatus]}
							onClick={(item) => {
								setCurrentStatus(item.key)
							}}
							items={[
								{
									label: '全部',
									key: '0'
								},
								{
									label: '已完成',
									key: '1'
								},
								{
									label: '未完成',
									key: '2'
								}
							]}
						/>
					}
				>
					<Button type='text'>
						<span className='status'>{statusMap[currentStatus]}</span>
						<span className='icon'>
							<BsFilterRight />
						</span>
					</Button>
				</Dropdown>
			</div>

			<div className='todo-list'>
				{filterList.length ? (
					<DragDropContext
						onDragEnd={(result) => {
							if (!result.destination) {
								return
							}
							const items = reorder(todoList, result.source.index, result.destination.index)
							setTodoList(items)
						}}
					>
						<Droppable droppableId='droppable'>
							{(provided, snapshot) => (
								<div {...provided.droppableProps} ref={provided.innerRef}>
									{filterList.map((item, index) => (
										<Draggable key={item.id} draggableId={item.id} index={index}>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
													className={['todo-item', `status-${item.isCompleted ? 'completed' : 'normal'}`].join(' ')}
												>
													<div className='handle-bar' {...provided.dragHandleProps}>
														<MdDragIndicator />
													</div>
													<div className='content-container'>
														<Checkbox
															isChecked={item.isCompleted}
															onChange={async (e) => {
																const _todoList = todoList.slice()
																_todoList[index].isCompleted = e
																setTodoList(_todoList)
															}}
														/>
														<div className='content'>
															<p className='text'>{item.content}</p>
															<p className='desc'>{item.description}</p>
															{item.time && (
																<p className='time'>
																	{item.time.calendar(today, {
																		sameDay: '[今天]',
																		nextDay: '[明天]',
																		nextWeek: 'dddd',
																		lastDay: '[昨天]',
																		lastWeek: '[上个] dddd',
																		sameElse: 'YYYY/MM/DD'
																	})}
																</p>
															)}
														</div>
													</div>
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				) : (
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
				)}
			</div>
			<AddNew
				onAdd={(todoData) => {
					const id = todoList.length ? todoList[todoList.length - 1]!.id + 1 : 1
					const _todoData: TodoItem = { ...todoData, id: String(id) }
					setTodoList([...todoList, _todoData])
				}}
			></AddNew>
		</div>
	)
}

export default Main
