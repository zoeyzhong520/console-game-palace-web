import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// 引入Bmob
import Bmob from 'hydrogen-js-sdk'

// 初始化Bmob
Bmob.initialize('df3cba52942cb8b9', 'kn03PK')
// 调试模式
Bmob.debug(true)
// 将Bmob挂载到原型中
React.$bmob = Bmob

ReactDOM.render(
  <React.StrictMode>
      <App />
    </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
