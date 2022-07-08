import './index.less'
import { BsCheck2 } from 'react-icons/bs'

export default function checkbox() {
	return (
		<div className='checkbox'>
			<input className='checkbox-el' type='checkbox' id='checkbox' name='checkbox' />
			<label htmlFor='checkbox' className='label'>
				<BsCheck2 />
			</label>
		</div>
	)
}
