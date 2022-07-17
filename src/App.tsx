import Main from './views/main'
import './App.less'
import { ConfigProvider } from 'antd'
import { useEffect, useState } from 'react'
import useTheme, { ACTION, ThemeValue } from './hooks/useTheme'

function App() {
  const [config, dispatch] = useTheme()
  useEffect(() => {
		let themeMedia: MediaQueryList = window.matchMedia('(prefers-color-scheme: light)')
		const fn = (e: any) => {
			const type = ACTION.SET_AUTO_THEME
			const themePayload = e.matches ? { type, payload: 'light' } : { type, payload: 'dark' }
			dispatch(themePayload)
		}
		const clear = () => themeMedia.removeEventListener('change', fn)

		if (config.theme === 'auto') {
      themeMedia = window.matchMedia('(prefers-color-scheme: light)')
      themeMedia.addEventListener('change', fn)
      fn(themeMedia)
		} else {
			// 不是跟随主题,就清楚主题监听
			clear()
		}
		return clear
	}, [config.theme === 'auto'])
  const theme = config.theme === 'auto' ? config.autoTheme : config.theme
  // console.log(config, theme)
	return (
		<div className={`App ${theme}`}>
			<ConfigProvider prefixCls={theme}>
				<Main
					theme={config.theme}
					autoTheme={config.autoTheme}
					changeTheme={(theme: ThemeValue) => dispatch({ type: ACTION.SET_THEME, payload: theme })}
				/>
			</ConfigProvider>
		</div>
	)
}

export default App
