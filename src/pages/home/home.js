import { useState } from 'react'
import { tabsList } from './common'
import CGPNavLink from '../components/cgpNavLink/cgpNavLink'
import Carousel from './carousel/carousel'
import './home.css'

const Home = () => {
    const [dataSource, setDataSource] = useState({
        gamesList: [1, 1, 1, 1, 1, 1, 1, 1], // 游戏推荐
        articlesList: [1, 1, 1, 1, 1, 1, 1, 1] // 热门文章
    })

    const Nav = () => {
        return (
            <div className='nav w'>
                <img src={require('./static/logo.png').default} alt=''></img>
                <div className="tab">
                    <ul>
                        <li><a href='#games'>游戏推荐</a></li>
                        <li><a href='#articles'>热门文章</a></li>
                        <li><a href='#about'>关于小助手</a></li>
                        <li><a href='#join'>加入俱乐部</a></li>
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

        // 列表标题，需传入一个标题, ,props: {title: '', showMore: false}, title标题, showMore是否显示更多
        const getSectionWithTitle = (props) => {
            return (
                <div className="section">
                    <span className='text'><a name={props.name}>{props.title}</a></span>
                    <span className='more' style={{display: props.showMore ? '' : 'none'}}>
                        {getSectionLink(props)}
                    </span>
                </div>
            )
        }

        // Link跳转地址
        const getSectionLink = (props) => {
            // 通过 props.name 判断要跳转到的页面路径, name为 games 则跳转到游戏列表, name为 articles 则跳转到文章列表
            let path = props.name === 'games' ? '/games' : (props.name === 'articles' ? '/articles' : '')
            return (
                <CGPNavLink to={path}>更多{'>'}</CGPNavLink>
            )
        }

        // 游戏推荐列表
        const getGamesList = () => {
            return (
                <div>
                    {getSectionWithTitle({title: '游戏推荐', showMore: true, name: 'games'})}
                    <div className='list'>
                        <ul>
                            {dataSource.gamesList.map(item => {
                                return <li className='game'>
                                    <img src={require('./static/7.jpeg').default} alt="" />
                                    <span className='title'>标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</span>
                                    <span className='description'>介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介</span>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            )
        }

        // 热门文章列表
        const getArticlesList = () => {
            return (
                <div style={{ clear: 'both' }}>
                    {getSectionWithTitle({title: '热门文章', showMore: true, name: 'articles'})}
                    <div className='list'>
                        <ul>
                            {dataSource.articlesList.map(item => {
                                return <li className='article'>
                                    <img src={require('./static/7.jpeg').default} alt="" />
                                    <span className='title'>标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</span>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            )
        }

        // 其他列表（关于、加入。。。）
        // props: {title: '', type: 1, description: ''}, title是标题，type是类型（1是关于小助手，2是加入俱乐部）, description是详细描述
        const getOtherList = (props) => {
            return (
                <div className='aj'>
                    {getSectionWithTitle({title: props.title, name: props.type === 1 ? 'about' : 'join'})}
                    <div className='about'>
                        <img src={require(props.type === 1 ? './static/mpCode.jpeg' : './static/wechat.jpeg').default} alt="" />
                        <span>{props.description}</span>
                    </div>
                    <div className='pic'>
                        <img src={require('./static/7.jpeg').default} alt="" />
                    </div>
                </div>
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
                <div className="bd">
                    {getGamesList()}
                    {getArticlesList()}
                    {getOtherList({title: '关于小助手', type: 1, description: '如果你热爱单机，那么这里就是天堂；如果你刚接触单机，那么这里就是宝库。「单机小助」持续更新优质资源、热门文章，感谢关注和使用！'})}
                    {getOtherList({title: '加入俱乐部', type: 2, description: '申请加入俱乐部，与游友们一起开心畅谈！'})}
                </div>
            </div>
        )
    }

    const Footer = () => {
        return (
            <div className='footer w'>
                <p className=''>温馨提示：适度游戏益脑，沉迷游戏伤身</p>
                <p className='bl'>—— 我是有底线的 ——</p>
            </div>
        )
    }

    return (
        <div className='home w'>
            <Nav />
            <Main />
            <Footer />
        </div>
    )
}

export default Home