import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { tabsList, cgp_recommend_all_list, cgp_recommend_query_list, leaderboards_query_list } from '../common/common'
import * as actionTypes from '../../store/actionTypes'
import CGPSearchBar from '../components/cgpSearchBar/cgpSearchBar'
import CGPBottomLine from '../components/cgpBottomLine/cgpBottomLine'
import CGPNavLink from '../components/cgpNavLink/cgpNavLink'
import CGPLoadMore from '../components/cgpLoadMore/cgpLoadMore'
import CGPLoading from '../components/CGPLoading/cgpLoading'
import './games.css'

const Games = (props) => {
    // 使用reducer
    let { addGamesType } = props

    // useParams接收路由参数, NavLink跳转页面
    const { type } = useParams()

    const navigate = useNavigate()

    // 加载状态
    const [loadstatus, setloadstatus] = useState(null)

    // 页数page
    const [page, setPage] = useState(0)

    // 是否正在加载数据
    let isFetch = false

    // 是否加载完成
    const [isLoad, setIsLoad] = useState(false)

    // 游戏类型type
    const [gamesType, setGamesType] = useState(props.gamesType.length > 0 && props.gamesType === type ? props.gamesType : type)
    useEffect(() => {
        // 初始值
        if (props.gamesType.length > 0 && props.gamesType === type) {
            setGamesType(props.gamesType)
            return
        }

        setGamesType(type)
        addGamesType({
            type: actionTypes.ADD_GAMESTYPE,
            gamesType: type
        })
    }, [])

    // 游戏查看榜
    const [rankList, setRankList] = useState([])
    useEffect(() => {
        if (props.gamesList.length > 0) {
            setRankList(props.gamesList)
        }

        // API
        const apiRequest = () => {
            leaderboards_query_list().then(res => {
                setRankList(res)
                addGamesType({
                    type: actionTypes.ADD_GAMESLIST,
                    gamesList: res
                })
            })
        }
        apiRequest()
    }, [])

    // 标签数组
    const [tabsArray, setTabsArray] = useState([])
    useEffect(() => {
        let tabs = tabsList
        tabs.map(item => {
            // 设置默认选中的标签
            item.isSelect = gamesType === item.type
        })
        setTabsArray(tabs)
    }, [])

    // 获取全部推荐数据
    const [gamesList, setGamesList] = useState([])
    useEffect(() => {
        apiRequest(gamesType)
    }, [])

    // API
    const apiRequest = (type, page) => {
        if (isFetch) {
            return
        }

        if (type === 'All') {
            cgp_recommend_all_list(page).then(res => {
                // 更新是否加载完毕的标识
                setIsLoad(true)
                isFetch = false

                if (page === 0) {
                    setGamesList(res)
                } else {
                    let list = gamesList.concat(res)
                    setGamesList(list)
                    setloadstatus(res.length === 0 ? 'noMore' : null)
                }
            })
        } else {
            cgp_recommend_query_list(type, page).then(res => {
                // 更新是否加载完毕的标识
                setIsLoad(true)
                isFetch = false

                if (page === 0) {
                    setGamesList(res)
                } else {
                    let list = gamesList.concat(res)
                    setGamesList(list)
                    setloadstatus(res.length === 0 ? 'noMore' : null)
                }
            })
        }
    }

    // 导航菜单
    const Nav = () => {
        // tabs标签列表
        const getTabsList = () => {
            // tabs点击刷新数据
            const tabsListClick = (type) => {
                // 点击某个标签时，设置选中样式
                tabsArray.map((item, index) => {
                    item.isSelect = type === item.type
                })

                // 把page清零
                setPage(0)
                // 更新gameType
                setGamesType(type)
                // 更新loadstatus
                setloadstatus('default')
                // 更新reducer
                addGamesType({
                    type: actionTypes.ADD_GAMESTYPE,
                    gamesType: type
                })
                // API
                apiRequest(type, 0)
            }

            return (
                <div className='tabs'>
                    {tabsArray.map(item => {
                        return <ul>
                            <li onClick={() => tabsListClick(item.type)} key={item.name}>
                                <span
                                    style={{
                                        color: item.isSelect ? '#2979ff' : '#333',
                                        borderBottom: item.isSelect ? '2px solid #2979ff' : '0'
                                    }}>{item.name}
                                </span>
                            </li>
                        </ul>
                    })}
                </div>
            )
        }

        // 游戏readCount排行（取前20位）
        /*
        注意：文本取前10位，超过10位则显示...
        */
        const getSearchRankList = () => {
            // 点击热门搜索
            const searchRankListClick = (e) => {
                navigate('/gamesDetail/' + e.objectId)
            }

            return (
                <div className='rank'>
                    <span>热门搜索：</span>
                    {rankList.slice(0, 4).map(item => {
                        return <ul>
                            <li onClick={() => searchRankListClick(item)} key={item.title}>
                                <p>{item.title}</p>
                            </li>
                        </ul>
                    })}
                </div>
            )
        }

        // 搜索API
        const startSearch = (e) => {
            if (e.length === 0) {
                return
            }

            // 跳转到游戏搜索页
            navigate('/gamesSearch/' + props.configs.gamesCount, { state: { keywords: e } })
        }

        const backRoot = () => {
            navigate('/')
        }

        return (
            <div className='nav'>
                <div className='nav-top'>
                    <img src={require('../home/static/logo.png').default} alt='' onClick={() => backRoot()} />
                    {getTabsList()}
                </div>
                <div className='nav-bottom'>
                    {getSearchRankList()}
                    <CGPSearchBar className='search' searchClick={(e) => startSearch(e)} />
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
                        <li key={item.title}>
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

    // 加载更多内容
    const loadMore = () => {
        // 页码自增
        let p = page+1
        setPage(p)
        // API
        setloadstatus('loading')
        apiRequest(gamesType, p)
    }

    return <div className='games w'>
        <div style={{ display: isLoad ? '' : 'none' }}>
            <Nav />
            <Main />
            <CGPLoadMore onClick={loadMore} loadstatus={loadstatus} />
            <CGPBottomLine />
        </div>
        <CGPLoading status={!isLoad} />
    </div>
}

const stateToProps = (state) => {
    return {
        gamesList: state.gamesList,
        gamesType: state.gamesType,
        configs: state.configs
    }
}

const dispatchToProps = (dispatch) => {
    return {
        addGamesType(action) {
            dispatch(action)
        }
    }
}

export default connect(stateToProps, dispatchToProps)(Games)