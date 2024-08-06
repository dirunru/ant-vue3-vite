// 美化打印实现方法
// %s - 字符串
// %d or %i - 整数
// %f - 浮点数
// %o - 表示DOM元素 // console.log('%o', document.body)
// %c - CSS样式
// %O - 表示javascript对象 // console.log('%O', document.body)
// console.clear()  // 清空
// console.debug()  // 打印调试
// console.time("循环")
// console.timeEnd("循环")

const prettyLog = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isEmpty = (value: any) => {
    return value == null || value === undefined || value === '';
  };
  const prettyPrint = (title: string, text: string, color: string) => {
    if (isProduction) return;
    console.log(`%c ${title} %c ${text} %c`, `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`, `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`, 'background:transparent');
  };
  const info = (textOrTitle: string, content = '') => {
    const title = isEmpty(content) ? 'Info' : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, '#909399');
  };
  const error = (textOrTitle: string, content = '') => {
    const title = isEmpty(content) ? 'Error' : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, '#F56C6C');
  };
  const warning = (textOrTitle: string, content = '') => {
    const title = isEmpty(content) ? 'Warning' : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, '#E6A23C');
  };
  const success = (textOrTitle: string, content = '') => {
    const title = isEmpty(content) ? 'Success ' : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, '#67C23A');
  };
  const table = () => {
    const data = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 }
    ];
    console.log('%c id%c name%c age', 'color: white; background-color: black; padding: 2px 10px;', 'color: white; background-color: black; padding: 2px 10px;', 'color: white; background-color: black; padding: 2px 10px;');

    data.forEach((row: any) => {
      console.log(`%c ${row.id} %c ${row.name} %c ${row.age} `, 'color: black; background-color: lightgray; padding: 2px 10px;', 'color: black; background-color: lightgray; padding: 2px 10px;', 'color: black; background-color: lightgray; padding: 2px 10px;');
    });
  };
  const picture = (url: string, scale = 1) => {
    if (isProduction) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const c = document.createElement('canvas');
      const ctx = c.getContext('2d');
      if (ctx) {
        c.width = img.width;
        c.height = img.height;
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0);
        const dataUri = c.toDataURL('image/png');

        console.log(
          `%c sup?`,
          `font-size: 1px;
                  padding: ${Math.floor((img.height * scale) / 2)}px ${Math.floor((img.width * scale) / 2)}px;
                  background-image: url(${dataUri});
                  background-repeat: no-repeat;
                  background-size: ${img.width * scale}px ${img.height * scale}px;
                  color: transparent;
                  `
        );
      }
    };
    img.src = url;
  };

  // retu;
  return {
    info,
    error,
    warning,
    success,
    picture,
    table
  };
};

export default prettyLog()

// export default {  
//   install(app:any, options:any) {  
//     app.config.globalProperties.$log = prettyLog()
//   }
// }
// 如果使用插件的话，在组件中的调用方式
// const instance = getCurrentInstance();
// if (instance.appContext.config.globalProperties.$log) {
//   console.log('instance.appContext.config.globalProperties.$log', instance.appContext.config.globalProperties.$log);
//   instance.appContext.config.globalProperties.$log.error('这是一条带有时间戳的日志');
// }