import { FC, useState } from 'react'

import { AiOutlinePlus } from 'react-icons/ai'
import './index.less'

import { Button } from 'antd'

const AddNew:FC = () =>{
  return (
		<div className='add-new'>
			<Button
				icon={
					<span className='anticon'>
						<AiOutlinePlus />
					</span>
				}
				type='text'
			>
				添加
			</Button>
		</div>
	)
}

export default AddNew
