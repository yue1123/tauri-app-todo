import { FC, useState, useImperativeHandle, useEffect } from 'react'

import { AiOutlinePlus } from 'react-icons/ai'
import './index.less'
import { Button, DatePicker, Space } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import type { TodoItem } from '../../views/main/index'
import moment from 'moment'

type _TodoItem = Omit<TodoItem, 'id'>
interface AddNewProps {
	onAdd: (value: _TodoItem) => void
	cRef: any
}

const AddNew: FC<AddNewProps> = (props) => {
	const defaultValue = {
		content: '',
		description: '',
		time: undefined,
		isCompleted: false
	}
	const OP_TEXT_MAP: Record<string, string> = {
		edit: '保存编辑',
		new: '添加任务'
	}
	const [showInput, setShowInput] = useState<boolean>(false)
	const [todoData, setTodoData] = useState<_TodoItem | TodoItem>(defaultValue)
	const [op, setOp] = useState('new')
	useImperativeHandle(props.cRef, () => ({
		edit: (todoData: TodoItem) => {
			setShowInput(true)
			setTodoData(todoData)
		}
	}))
	useEffect(() => {
		setOp((todoData as TodoItem).id ? 'edit' : 'new')
	}, [(todoData as TodoItem).id])
	return (
		<div className='add-new'>
			{showInput && (
				<>
					<div className='input-container'>
						<div>
							<div className='title-input'>
								<input
									// ref={titleInput}
									type='text'
									placeholder='例如: 周日看书 1 小时'
									value={todoData.content}
									onChange={(e: any) => {
										setTodoData({
											...todoData,
											content: e.target.value
										})
									}}
								/>
							</div>
							<div className='desc-input'>
								<input
									type='text'
									placeholder='描述'
									value={todoData.description}
									onChange={(e: any) => {
										setTodoData({
											...todoData,
											description: e.target.value
										})
									}}
								/>
							</div>
							<div className='mate-input'>
								<DatePicker
									size='small'
									placeholder='截止日期'
									locale={locale}
									value={todoData.time ? moment(todoData.time) : undefined}
									onChange={(date) => {
										setTodoData({
											...todoData,
											time: date || undefined
										})
									}}
								/>
							</div>
						</div>
					</div>
					<div className='buttons'>
						<Space>
							<Button
								type='default'
								onClick={() => {
									setShowInput(false)
									setTodoData(defaultValue)
								}}
							>
								取消
							</Button>
							<Button
								type='primary'
								disabled={!todoData.content}
								onClick={() => {
									props.onAdd(todoData)
									setTodoData(defaultValue)
								}}
							>
								{OP_TEXT_MAP[op]}
							</Button>
						</Space>
					</div>
				</>
			)}
			{!showInput && (
				<Button
					icon={
						<span className='anticon'>
							<AiOutlinePlus />
						</span>
					}
					type='text'
					onClick={() => {
						setShowInput(true)
					}}
				>
					添加任务
				</Button>
			)}
		</div>
	)
}

export default AddNew
