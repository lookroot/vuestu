import clg from './clg';
import divdoc from './js/divdoc';

// import './css/app.less'
import './css/app.css'
// console.log('webpack init');
clg('webpack init ');
divdoc();
if (module.hot) {
    module.hot.accept('./clg.js', () => {
        console.log("监听到clg.js文件修改");
    })
}

let say = () => {
    console.log("say");
}
say();