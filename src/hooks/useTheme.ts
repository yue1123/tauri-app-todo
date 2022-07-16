import { useReducer } from 'react'

export type ThemeValue = 'dark' | 'light' | 'auto'
export interface InitState {
	theme: ThemeValue
	autoTheme: Exclude<ThemeValue, 'auto'>
}


const initState: InitState = {
	theme: 'light',
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
  return useReducer(reducer, initState)
}