import { useState } from 'react'

import Checkbox from '../../components/Checkbox'
import AddNew from '../../components/AddNew'
import moment from 'moment'
export interface TodoItem {
	id: number
	content: string
	isCompleted: boolean
	description?: string
	time?: moment.Moment
	isLink?: boolean
}
const today = moment().startOf('hour')

function Main() {
  
	const [todoList, setTodoList] = useState<TodoItem[]>([
		{
			id: 1,
			content: '看书读报,了解世界',
			isCompleted: true,
			time: moment(new Date('2022.7.15')),
			isLink: false
		}
	])
	return (
		<div className='main-container'>
			<h1>Todo List</h1>
			<div className='todo-list'>
				{todoList.map((item, index) => {
					return (
						<div
							key={item.id}
							className={['todo-item', `status-${item.isCompleted ? 'completed' : 'normal'}`].join(' ')}
						>
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
					)
				})}
			</div>
			<AddNew
				onAdd={(todoData) => {
					const id = todoList.length ? todoList[todoList.length - 1]!.id + 1 : 1
					const _todoData: TodoItem = { ...todoData, id }
					setTodoList([...todoList, _todoData])
				}}
			></AddNew>
		</div>
	)
}

export default Main
