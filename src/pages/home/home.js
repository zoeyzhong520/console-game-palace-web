import Carousel from './carousel/carousel'
import { tabsList } from './common'
import './home.css'

const Home = () => {
    const Nav = () => {
        return (
            <div className='nav w'>
                <img src={require('./static/logo.png').default} alt=''></img>
                <div className="tab">
                    <ul>
                        <li><a href='#'>游戏推荐</a></li>
                        <li><a href='#'>热门文章</a></li>
                        <li><a href='#'>关于小助手</a></li>
                        <li><a href='#'>加入俱乐部</a></li>
                    </ul>
                </div>
                <div className="search">
                    <input type="text" name='search' placeholder='请输入游戏名称' />
                    <button>搜索</button>
                </div>
            </div>
        )
    }

    const Main = () => {
        // tabs标签列表
        const getTabsList = () => {
            return (
                tabsList.map(item => {
                    return <ul>
                        <li><a href='#'>{item.name}</a></li>
                    </ul>        
                })
            )
        }

        return (
            <div className='main w'>
                <div className="hd">
                    <div className="screening">
                        {getTabsList()}
                    </div>
                    <div className="carousel">
                        <Carousel />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='home w'>
            <Nav />
            <Main />
        </div>
    )
}

export default Home