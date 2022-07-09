import { useState } from 'react'

import Checkbox from '../../components/Checkbox'
import AddNew from '../../components/AddNew'
export interface TodoItem {
	id: number
	content: string
	isCompleted: boolean
	description?: string
	time?: Date
	isLink?: boolean
}

function Main() {
	const [todoList, setTodoList] = useState<TodoItem[]>([
		{
			id: 1,
			content: '看书读报,了解世界',
			isCompleted: true,
			time: new Date(),
			isLink: false
		},
		{
			id: 2,
			content: '吃饭睡觉打豆豆',
			isCompleted: false,
			time: new Date(),
			isLink: false
		},
		{
			id: 3,
			content: '吃饭睡觉打豆豆',
			isCompleted: false,
			time: new Date(),
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
								{item.time && <p className='time'>{item.time.toLocaleDateString()}</p>}
							</div>
						</div>
					)
				})}
			</div>
			<AddNew></AddNew>
		</div>
	)
}

export default Main
