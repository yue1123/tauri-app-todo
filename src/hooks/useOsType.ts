import { useEffect, useState } from 'react'
import { type } from '@tauri-apps/api/os'

const osTypeMap: Record<string, string> = {
	Linux: 'Linux',
	Darwin: 'macOS',
	Windows_NT: 'Windows'
}

export default function useOsType() {
  const [osType, setOsType] = useState<string>()
	useEffect(() => {
		type().then((os) => {
			setOsType(osTypeMap[os as unknown as string])
		})
	}, [])
  return {
		osType
	}
}
