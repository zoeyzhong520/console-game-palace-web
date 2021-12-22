/*
react-router-dom的使用：
1 安装 npm install -S react-router-dom
2 导入组件
3 使用 Routes 组件包裹整个应用
*/ 
import { BrowserRouter as Router, Switch, Route, Routes,  NavLink } from 'react-router-dom';
import Home from './pages/home/home'
import Games from './pages/games/games'
import Articles from './pages/articles/articles'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/games' element={<Games />} />
          <Route path='/articles' element={<Articles />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
