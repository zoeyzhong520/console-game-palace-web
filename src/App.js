/*
react-router-dom的使用：
1 安装 npm install -S react-router-dom
2 导入组件
3 使用 Routes 组件包裹整个应用
*/
import { BrowserRouter as Router, Switch, Route, Routes, NavLink } from 'react-router-dom';
import Home from './pages/home/home'
import Games from './pages/games/games'
import Articles from './pages/articles/articles'
import GamesDetail from './pages/detail/gamesDetail/gamesDetail'
import ArticlesDetail from './pages/detail/articlesDetail/articlesDetail'
import GamesSearch from './pages/search/gamesSearch'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/games/:type' element={<Games />} />
          <Route path='/articles' element={<Articles />} />
          <Route path='/gamesDetail/:objectId' element={<GamesDetail />} />
          <Route path='/articlesDetail/:objectId' element={<ArticlesDetail />} />
          <Route path='/gamesSearch/:gamesCount' element={<GamesSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

const stateToProps = (state) => {
  return {
      allGames: state.allGames
  }
}

export default App;
