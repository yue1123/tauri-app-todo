import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.less'
// import 'antd/dist/antd.css'
import './styles/light.css'
import './styles/dark.css'
import initLang from './utils/momentI18n.js'


initLang()
ReactDOM.createRoot(document.getElementById('root')!).render(
	// <React.StrictMode>
	// <ConfigProvider prefixCls='dark'>
	<App />
	// </ConfigProvider>
	// </React.StrictMode>
)
