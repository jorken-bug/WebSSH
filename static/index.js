const ws = new WebSocket(`ws://${location.hostname}:3000`)

const term = new Terminal({
  rendererType: "canvas", //渲染类型
  rows: 45, //行数，影响最小高度
  convertEol: true, //启用时，光标将设置为下一行的开头
  disableStdin: false, //是否应禁用输入。
  cursorStyle: "underline", //光标样式
  cursorBlink: true, //光标闪烁
  rightClickSelectsWord: true, // 是否支持鼠标右键选中整行
  theme: {
    foreground: '#F8F8F8',
    background: '#2D2E2C',
    cursor: "help", //设置光标
    lineHeight: 14,
  },
  fontFamily: '"Cascadia Code", Menlo, monospace'
});

const fitAddon = new FitAddon.FitAddon();
term.loadAddon(fitAddon);

// 第一行显示的内容
term.writeln("Welcome to \x1b[1;32mYorlg\x1b[0m.") // \x1b[1;32mYorlg\x1b[0m 为绿色
term.writeln('This is Web Terminal of Modb;\n') // 换行

fitAddon.fit();
// 当窗口大小更改时，适应终端大小
// window.addEventListener('resize', () => {
//   fitAddon.fit();
// });

term.open(document.getElementById('terminal')); // 打开终端
term.focus(); // 焦点

// 接收来自服务器的消息并将其显示在终端窗口中
ws.onmessage = (event) => {
  term.write(event.data)
};
// 读取键盘输入并将其发送到服务器
term.onData((e) => {
  // console.log(e);
  // 这里不做任何判断 直接发送后端，后端做判断
  ws.send(e)
});