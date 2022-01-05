import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { tabsList, cgp_recommend_all_list, cgp_recommend_query_list } from '../common/common'
import CGPSearchBar from '../components/cgpSearchBar/cgpSearchBar'
import CGPBottomLine from '../components/cgpBottomLine/cgpBottomLine'
import CGPNavLink from '../components/cgpNavLink/cgpNavLink'
import './games.css'

const Games = () => {
    // useParams接收路由参数
    const { type } = useParams()

    const [dataSource, setDataSource] = useState({
        rankList: [1, 1, 1, 1] // 游戏搜索排行
    })

    useEffect(() => {

    })

    // 标签数组
    const [tabsArray, setTabsArray] = useState([])
    useEffect(() => {
        let tabs = tabsList
        tabs.map(item => {
            // 设置默认选中的标签
            item.isSelect = type === item.type
        })
        setTabsArray(tabs)
    }, [])

    // 获取全部推荐数据
    const [gamesList, setGamesList] = useState([])
    useEffect(() => {
        apiRequest(type)

        // 处理滚动
        const handleOnScroll = () => {
            // 滚动条距离顶部
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            // 可视区域
            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            // 滚动条内容的总高度
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            if (scrollTop + clientHeight === scrollHeight) {
                console.log("到底部了")
                alert('到底部了')
            }
        }

        window.onscroll = () => {
            handleOnScroll()
        }
    }, [])

    // API
    const apiRequest = (type) => {
        if (type === 'All') {
            cgp_recommend_all_list().then(res => {
                setGamesList(res)
            })
        } else {
            cgp_recommend_query_list(type).then(res => {
                setGamesList(res)
            })
        }
    }

    // 导航菜单
    const Nav = () => {
        // tabs标签列表
        const getTabsList = () => {
            return (
                <div className='tabs'>
                    {tabsArray.map(item => {
                        return <ul>
                            <li onClick={() => tabsListClick(item.type)} key={item}>
                                <a href='#'
                                    style={{
                                        color: item.isSelect ? '#2979ff' : '#333',
                                        borderBottom: item.isSelect ? '2px solid #2979ff' : '0'
                                    }}>{item.name}
                                </a>
                            </li>
                        </ul>
                    })}
                </div>
            )
        }

        // tabs点击刷新数据
        const tabsListClick = (type) => {
            // 点击某个标签时，设置选中样式
            tabsArray.map((item, index) => {
                item.isSelect = type === item.type
            })
            apiRequest(type)
        }

        // 游戏搜索排行（取前20位）
        /*
        注意：文本取前10位，超过10位则显示...
        */
        const getSearchRankList = () => {
            return (
                <div className='rank'>
                    <span>热门搜索：</span>
                    {dataSource.rankList.map(item => {
                        return <ul>
                            <li key={item}><a href='#'>{'∙'}标题标题标题标题标题</a></li>
                        </ul>
                    })}
                </div>
            )
        }

        return (
            <div className='nav'>
                <div className='nav-top'>
                    <img src={require('../home/static/logo.png').default} alt='' />
                    {getTabsList()}
                </div>
                <div className='nav-bottom'>
                    {getSearchRankList()}
                    <CGPSearchBar className='search' />
                </div>
            </div>
        )
    }

    // 游戏列表区域
    const Main = () => {
        return (
            <div className='main'>
                {gamesList.map(item => {
                    return <ul>
                        <li key={item}>
                            <div className='gamePic'>
                                <img src={item.image} alt='' />
                            </div>
                            <div className='content'>
                                <p className='gameName'>{item.title}</p>
                                <p className='gameDesc'>{item.description}</p>
                                <CGPNavLink to={{ pathname: '/gamesDetail/' + item.objectId }}>查看详情</CGPNavLink>
                            </div>
                        </li>
                    </ul>
                })}
            </div>
        )
    }

    return <div className='games w'>
        <Nav />
        <Main />
        <CGPBottomLine />
    </div>
}

export default Games