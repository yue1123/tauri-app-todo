import { useEffect, useState } from "react"

export enum storageKey  {
  THEME_CONFIG = 'theme_config',
  TODO_DATA = 'todo_data'
}

export default function useLocalStorage<T = any>(key: storageKey) {
  const _get = () => JSON.parse(window.localStorage.getItem(key) || 'null')
  const [data, setData] = useState<T>(_get())
  const set = (data: T) => {
		try {
			window.localStorage.setItem(key, JSON.stringify(data || null))
			setData(data)
		} catch (err) {
			console.log(err)
		}
	}
  const get =  () => {
		try {
			let data = _get()
			setData(data)
		} catch (err) {
			console.log(err)
		}
	}
  useEffect(()=>{
    get()
  }, [])
  return {
		data,
		set,
		get
	}
}