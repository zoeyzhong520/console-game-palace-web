import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { tabsList, cgp_recommend_banner_list, leaderboards_query_list, cgp_popular_articles_list } from '../common/common'
import Carousel from '../components/carousel/carousel'
import CGPNavLink from '../components/cgpNavLink/cgpNavLink'
import CGPSearchBar from '../components/cgpSearchBar/cgpSearchBar'
import CGPBottomLine from '../components/cgpBottomLine/cgpBottomLine'
import './home.css'

const Home = (props) => {
    const navigate = useNavigate()

    // 广告位数据
    const [bannerList, setBannerList] = useState([])
    useEffect(() => {
        // API
        const apiRequest = () => {
            cgp_recommend_banner_list().then(res => {
                setBannerList(res)
            })
        }
        // apiRequest()
    }, [])

    // 获取全部推荐数据
    const [gamesList, setGamesList] = useState([])
    useEffect(() => {
        // API
        const apiRequest = () => {
            leaderboards_query_list().then(res => {
                setGamesList(res)
            })
        }
        // apiRequest()
    }, [])

    // 热门文章列表数据
    const [articlesList, setArticlesList] = useState([])
    useEffect(() => {
        // API
        const apiRequest = () => {
            cgp_popular_articles_list().then(res => {
                setArticlesList(res)
            })
        }
        // apiRequest()
    }, [])

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
                <CGPSearchBar className='search' />
            </div>
        )
    }

    const Main = () => {
        // tabs标签列表
        const getTabsList = () => {
            return (
                tabsList.map(item => {
                    return <ul>
                        <li key={item.type}>
                            <CGPNavLink to={{ pathname: '/games/' + item.type }}>{item.name}</CGPNavLink>
                        </li>
                    </ul>
                })
            )
        }

        // 列表标题，需传入一个标题, props: {title: '', showMore: false}, title标题, showMore是否显示更多
        const getSectionWithTitle = (props) => {
            // 通过 props.name 判断要跳转到的页面路径, name为 games 则跳转到游戏列表, name为 articles 则跳转到文章列表
            let path = props.name === 'games' ? '/games/All' : (props.name === 'articles' ? '/articles' : '')
            return (
                <div className="section">
                    <span className='text'><a name={props.name}>{props.title}</a></span>
                    <CGPNavLink to={path}>
                        <span className='more' style={{ display: props.showMore ? '' : 'none' }}>更多{'>'}</span>
                    </CGPNavLink>
                </div>
            )
        }

        // 游戏推荐列表，点击打开对应的游戏详情
        const getGamesList = () => {
            return (
                <div>
                    {getSectionWithTitle({ title: '游戏推荐', showMore: true, name: 'games' })}
                    <div className='list'>
                        <ul>
                            {gamesList.map(item => {
                                return <li key={item.title} className='game'>
                                    <CGPNavLink to={{ pathname: '/gamesDetail/' + item.objectId }}>
                                        <img src={item.image} alt="" />
                                        <span className='title'>{item.title}</span>
                                        <span className='description'>{item.description}</span>
                                    </CGPNavLink>
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
                    {getSectionWithTitle({ title: '热门文章', showMore: true, name: 'articles' })}
                    <div className='list'>
                        <ul>
                            {articlesList.map(item => {
                                return <li key={item.title} className='article'>
                                    <CGPNavLink to='/articlesDetail'>
                                        <img src={item.image} alt="" />
                                        <span className='title'>{item.title}</span>
                                    </CGPNavLink>
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
                    {getSectionWithTitle({ title: props.title, name: props.type === 1 ? 'about' : 'join' })}
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

        // 广告位点击
        const clickCarousel = (imgIndex) => {
            // 点击广告位打开游戏详情
            navigate('/gamesDetail/' + bannerList[imgIndex].objectId, { state: { isBanner: true } })
        }

        const getCarouselImgs = () => {
            let imgs = []
            bannerList.map(item => {
                imgs.push(item.image)
            })
            return imgs
        }

        return (
            <div className='main w'>
                <div className="hd">
                    <div className="screening">
                        {getTabsList()}
                    </div>
                    <div className="carousel">
                        <Carousel listImg={getCarouselImgs()} imgWidth='895px' imgHeight='450px' onClick={(imgIndex) => clickCarousel(imgIndex)} />
                    </div>
                </div>
                <div className="bd">
                    {getGamesList()}
                    {getArticlesList()}
                    {getOtherList({ title: '关于小助手', type: 1, description: '如果你热爱单机，那么这里就是天堂；如果你刚接触单机，那么这里就是宝库。「单机小助」持续更新优质资源、热门文章，感谢关注和使用！' })}
                    {getOtherList({ title: '加入俱乐部', type: 2, description: '申请加入俱乐部，与游友们一起开心畅谈！' })}
                </div>
            </div>
        )
    }

    return (
        <div className='home w'>
            <Nav />
            <Main />
            <CGPBottomLine />
        </div>
    )
}

const stateToProps = (state) => {
    return {
        bannerList: state.bannerList,
        gamesList: state.gamesList,
        articlesList: state.articlesList
    }
}

const dispatchToProps = (dispatch) => {
    
}

export default connect(stateToProps)(Home)