// import ReactDOM from 'react-dom/client'
// import App from './App'
// import './styles/index.less'
// // import 'antd/dist/antd.css'
// import './styles/light.css'
// import './styles/dark.css'
// import initLang from './utils/momentI18n.js'


// initLang()


function loadScript(url, id, callback) {
	if (document.getElementById(id)) return callback()
	var script = document.createElement('script')
	script.type = 'text/javascript'
	script.id = id
	if (script.readyState) {
		//IE
		script.onreadystatechange = function () {
			if (script.readyState == 'loaded' || script.readyState == 'complete') {
				script.onreadystatechange = null
				callback()
			}
		}
	} else {
		//Others: Firefox, Safari, Chrome, and Opera
		script.onload = function () {
			callback()
		}
	}
	script.src = url
	document.body.appendChild(script)
}
loadScript('https://cdn.jsdelivr.net/gh/yue1123/yue1123@20214/code/l2dwidget.min.js', 'live2d', () => {
	// hijiki/assets/hijiki.model.json
	window.L2Dwidget.init({
		model: {
			jsonPath: 'https://cdn.jsdelivr.net/gh/yue1123/yue1123@20210410/model/white_car/assets/tororo.model.json' // xxx.model.json 的路径
		},
		display: {
			superSample: 1, // 超采样等级
			width: 250, // canvas的宽度
			height: 300, // canvas的高度
			position: 'right', // 显示位置：左或右
			hOffset: 0, // canvas水平偏移
			vOffset: 0 // canvas垂直偏移
		},
		mobile: {
			show: false, // 是否在移动设备上显示
			scale: 1, // 移动设备上的缩放
			motion: true // 移动设备是否开启重力感应
		},
		react: {
			opacityDefault: 1, // 默认透明度
			opacityOnHover: 1 // 鼠标移上透明度
		}
	})
})
// ReactDOM.createRoot(document.getElementById('root')!).render(
// 	// <React.StrictMode>
// 	// <ConfigProvider prefixCls='dark'>
// 	<App />
// 	// </ConfigProvider>
// 	// </React.StrictMode>
// )
