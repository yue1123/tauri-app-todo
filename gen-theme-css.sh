pnpm lessc --js --modify-var="ant-prefix=light" node_modules/antd/dist/antd.less ./src/styles/light.css
pnpm lessc --js --modify-var="ant-prefix=dark" node_modules/antd/dist/antd.dark.less ./src/styles/dark.css
