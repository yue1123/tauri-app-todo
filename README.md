# tauri app

Beautiful todo app example built on Tauri + React + Ts

## functions

1. todo
    1. add
    2. delete
    3. drag to sort
    4. edit
    5. 过滤状态
2. theme
    1. light
    2. dark
    3. auto
3. window on top
4. frosted background(macos)
5. data catch
## windows

<p>
  <img style="width:24%" src='./screenshots/win_empty_light.png'>
  <img style="width:24%" src='./screenshots/win_light.png'>
  <img style="width:24%" src='./screenshots/win_empty_dark.png'>
  <img style="width:24%" src='./screenshots/win_dark.png'>
</p>

[download](./release/Todo%20List_0.1.0_x64_en-US.msi)

## macos (apple m1)

<p>
  <img style="width:24%" src='./screenshots/macos_empty_light.png'>
  <img style="width:24%" src='./screenshots/macos_light.png'>
  <img style="width:24%" src='./screenshots/macos_empty_dark.png'>
  <img style="width:24%" src='./screenshots/macos_dark.png'>
</p>

[download](./release/Todo%20List_0.1.0_aarch64.dmg)

## run

```bash
git clone https://github.com/yue1123/tauri-app-todo

cd ./tauri-app-todo

pnpm install

bash ./gen-theme-css.sh

pnpm run tauri_dev
```
