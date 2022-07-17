import { useState, useMemo, useRef, FC, useEffect } from 'react'
import moment from 'moment'
import { Button, Dropdown, Empty, Menu, Tooltip } from 'antd'
import { BsListNested, BsListStars, BsFillSunFill, BsMoonStarsFill, BsLaptop } from 'react-icons/bs'
import { MdDragIndicator, MdOutlineFileDownloadDone } from 'react-icons/md'
import { FiMoreHorizontal } from 'react-icons/fi'
import { VscListSelection } from 'react-icons/vsc'
import { AiFillPushpin, AiOutlineStock } from 'react-icons/ai'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Checkbox from '../../components/Checkbox'
import AddNew from '../../components/AddNew'
import { ThemeValue } from '../../hooks/useTheme'
import useWindowTop from '../../hooks/useWindowTop'
import useLocalStorage, { storageKey } from '../../hooks/useLocalStorage'

import './index.less'
import EMPTY_IMAGE_LIGHT from '../../static/empty-light.svg'
import EMPTY_IMAGE_DARK from '../../static/empty-dark.svg'

export type TodoStatus = '0' | '1' | '2'
export interface TodoItem {
	id: string
	content: string
	isCompleted: boolean
	description?: string
	time?: moment.Moment
	isLink?: boolean
}

export interface StorageTodoData {
	todoList: TodoItem[]
	currentStatus: TodoStatus
}

export interface MainProps {
	changeTheme: (theme: ThemeValue) => void
	theme: ThemeValue
	autoTheme: Exclude<ThemeValue, 'auto'>
}

const EMPTY_IMAGE: Record<'light' | 'dark', string> = {
	light: EMPTY_IMAGE_LIGHT,
	dark: EMPTY_IMAGE_DARK
}
const today = moment().startOf('hour')

const reorder = (list: TodoItem[], startIndex: number, endIndex: number) => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

const getItemStyle = (isDragging: boolean, draggableStyle: any, background?: string) => ({
	userSelect: 'none',
	background: isDragging ? 'var(--button-hover-bg)' : 'none',
	...draggableStyle
})

const Main: FC<MainProps> = ({ theme, autoTheme, changeTheme }) => {
	const statusWithIconMap: Record<string, JSX.Element> = {
		0: <VscListSelection size={18} />,
		1: <MdOutlineFileDownloadDone size={18} />,
		2: <AiOutlineStock size={18} />
	}

	const themeWithIconMap: Record<string, JSX.Element> = {
		light: <BsFillSunFill size={17} />,
		dark: <BsMoonStarsFill size={17} />,
		auto: <BsLaptop size={17} />
	}
	// 数据存储
	const { data, set } = useLocalStorage<StorageTodoData>(storageKey.TODO_DATA)
	// 窗口置顶
	const { isTop, toggleTop } = useWindowTop()
	// todo list data
	const [todoList, setTodoList] = useState<TodoItem[]>([])
	// 当前 todo list 过滤状态
	const [currentStatus, setCurrentStatus] = useState<TodoStatus>('0')
	// status 过滤后的 todo list
	const filterList = useMemo(() => {
		if (currentStatus === '0') {
			return todoList
		} else if (currentStatus === '1') {
			return todoList.filter((item) => item.isCompleted)
		} else {
			return todoList.filter((item) => !!item.isCompleted === false)
		}
	}, [currentStatus, todoList])
	// addNew 组件应用
	const addNewComRef = useRef<any>(null)
	// 添加
	const handleAddNew = (todoData: Omit<TodoItem, 'id'>) => {
		if ((todoData as TodoItem).id) {
			const index = todoList.findIndex((item) => item.id === (todoData as TodoItem).id)
			const _todoList = todoList.slice()
			_todoList.splice(index, 1, todoData as TodoItem)
			setTodoList(_todoList)
		} else {
			const id = todoList.length ? todoList[todoList.length - 1]!.id + 1 : 1
			const _todoData: TodoItem = { ...todoData, id: String(id) }
			setTodoList([...todoList, _todoData])
		}
	}
	// 更多操作
	const handleMoreAction = (key: 'delete' | 'edit', todoData: TodoItem) => {
		if (key === 'delete') {
			const index = todoList.findIndex((item) => item.id === todoData.id)
			const _todoList = todoList.slice()
			_todoList.splice(index, 1)
			setTodoList(_todoList)
		} else if (key === 'edit') {
			if (addNewComRef.current) {
				addNewComRef.current.edit(todoData)
			}
		}
	}

	const realTheme = useMemo(() => {
		return theme === 'auto' ? autoTheme : theme
	}, [theme, autoTheme])

	useEffect(() => {
		console.log(data)
		set({
			currentStatus,
			todoList
		})
	}, [todoList])

	return (
		<div className='main-container'>
			<div className='header'>
				<h1>Todo List</h1>
				<div className='right'>
					<Tooltip placement='bottomRight' title={isTop ? '取消置顶' : '窗口置顶'}>
						<Button type='text' onClick={() => toggleTop()}>
							<AiFillPushpin
								color={isTop ? 'var(--antd-wave-shadow-color)' : 'var(--text-color)'}
								size={18}
							></AiFillPushpin>
						</Button>
					</Tooltip>
					<Dropdown
						arrow
						placement='bottomRight'
						overlay={
							<Menu
								defaultSelectedKeys={[theme]}
								selectedKeys={[theme]}
								onClick={({ key }) => {
									setTimeout(() => {
										changeTheme(key as ThemeValue)
									}, 300)
								}}
								items={[
									{
										label: '浅色',
										key: 'light',
										icon: themeWithIconMap['light']
									},
									{
										label: 'dark',
										key: 'dark',
										icon: themeWithIconMap['dark']
									},
									{
										label: '跟随系统',
										key: 'auto',
										icon: themeWithIconMap['auto']
									}
								]}
							/>
						}
					>
						<Button type='text'>{themeWithIconMap[theme]}</Button>
					</Dropdown>
					<Dropdown
						arrow
						placement='bottomRight'
						overlay={
							<Menu
								defaultSelectedKeys={[currentStatus]}
								selectedKeys={[currentStatus]}
								onClick={(item) => {
									setCurrentStatus(item.key as TodoStatus)
								}}
								items={[
									{
										label: '全部',
										key: '0',
										icon: statusWithIconMap[0]
									},
									{
										label: '已完成',
										key: '1',
										icon: statusWithIconMap[1]
									},
									{
										label: '未完成',
										key: '2',
										icon: statusWithIconMap[2]
									}
								]}
							/>
						}
					>
						<Button type='text' className='status-icon'>
							<span className='icon'>{statusWithIconMap[currentStatus]}</span>
						</Button>
					</Dropdown>
				</div>
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
													className={[
														'todo-item',
														`status-${item.isCompleted ? 'completed' : 'normal'}`,
														`${snapshot.isDragging ? 'dragging' : ''}`
													].join(' ')}
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
													<Dropdown
														overlay={
															<Menu
																defaultSelectedKeys={[currentStatus]}
																selectedKeys={[currentStatus]}
																onClick={(menuItem) => {
																	handleMoreAction(menuItem.key as 'delete' | 'edit', item)
																}}
																items={[
																	{
																		label: '编辑',
																		key: 'edit'
																	},
																	{
																		label: '删除',
																		key: 'delete'
																	}
																]}
															/>
														}
													>
														<Button className='more-op' type='text' size='small' icon={<FiMoreHorizontal />}></Button>
													</Dropdown>
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
					<Empty style={{ padding: '50px 0' }} description={'全部都完成啦!!'} image={EMPTY_IMAGE[realTheme]} />
				)}
			</div>
			<AddNew cRef={addNewComRef} onAdd={handleAddNew}></AddNew>
		</div>
	)
}

export default Main
