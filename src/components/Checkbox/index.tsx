import './index.less'
import { BsCheck2 } from 'react-icons/bs'
import { FC, useState } from 'react'

interface CheckboxProps {
	isChecked: boolean
	onChange: (value: boolean) => void
}

const Checkbox: FC<CheckboxProps> = (props) => {
  const [state, setState] = useState<boolean>(props.isChecked)
	return (
		<span className='checkbox-container'>
			<input
				className='checkbox-el'
				type='checkbox'
				checked={state}
				onChange={() => {
					setState(!state)
          props.onChange(!state)
				}}
			/>
			<span>
				<BsCheck2 />
			</span>
		</span>
	)
}

export default Checkbox
