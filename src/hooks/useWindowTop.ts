import { useState } from 'react'
import { window as Window } from '@tauri-apps/api'
// 窗口置顶
export default function useWindowTop() {
  const [isTop, setIsTop] = useState<boolean>(false)
	let curWin = Window.getCurrent()
  return {
		isTop,
		toggleTop() {
			curWin.setAlwaysOnTop(!isTop)
			setIsTop(!isTop)
		}
	}
}
