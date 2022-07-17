import { useEffect, useReducer } from 'react'
import useLocalStorage,{storageKey} from './useLocalStorage'

export type ThemeValue = 'dark' | 'light' | 'auto'
export interface InitState {
	theme: ThemeValue
	autoTheme: Exclude<ThemeValue, 'auto'>
}

const initState: InitState = {
	theme: 'dark',
	autoTheme: window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export enum ACTION {
	SET_THEME = 'SET_THEME',
  SET_AUTO_THEME = 'SET_AUTO_THEME',
}

function reducer(state: InitState, action: any): InitState {
	switch (action.type) {
		case ACTION.SET_THEME:
			return {
				...state,
				theme: action.payload
			}
		case ACTION.SET_AUTO_THEME:
			return {
				...state,
				autoTheme: action.payload
			}
	}
	return state
}

export default function useTheme(){
  const { data, set } = useLocalStorage<InitState>(storageKey.THEME_CONFIG)
  const _reducer = useReducer(reducer, data || initState)
  useEffect(() => {
		set(_reducer[0])
	}, [_reducer[0]])
  return _reducer
}