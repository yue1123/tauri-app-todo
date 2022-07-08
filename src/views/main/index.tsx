import { useState } from 'react'

import Checkbox from '../../components/Checkbox'
import { FaBeer } from 'react-icons/fa'

export interface TodoItem {
	id: number
	isCompleted: boolean
	time: Date
	isLink: boolean
}
function Main() {
	const [todoList, setTodoList] = useState<TodoItem[]>([])
	return (
		<div className='main-container'>
			<h1>Todo List</h1>
			<div className='todo-list'>
				<div className='todo-item'>
					<Checkbox />
					<div className='content'>
						<p>内容</p>
						<p>6月6日</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Main
