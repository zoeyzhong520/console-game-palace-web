/*
游戏搜索页面
*/
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fuzzyQuery, recommend_search_all_data, leaderboards_query_list } from '../common/common'
import * as actionTypes from '../../store/actionTypes'
import CGPBottomLine from '../components/cgpBottomLine/cgpBottomLine'
import CGPSearchBar from '../components/cgpSearchBar/cgpSearchBar'
import CGPNavLink from '../components/cgpNavLink/cgpNavLink'
import CGPLoading from '../components/CGPLoading/cgpLoading'
import './gamesSearch.css'

const GamesSearch = (props) => {
    const { gamesCount } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    // 使用reducer
    let { addList } = props

    // 是否加载完成
    const [isLoad, setIsLoad] = useState(false)

    // 全部游戏数据
    const [allGames, setAllGames] = useState([])
    useEffect(() => {
        // API
        const apiRequest = () => {
            if (props.allGames.length > 0) {
                setIsLoad(true)
                setAllGames(props.allGames)
                return
            }

            // 根据当前游戏总数目计算出需要分页多少
            let maxCount = Math.ceil(gamesCount / 100)
            var tmpAllGames = []
            for (let i = 0; i < maxCount; i++) {
                recommend_search_all_data(i).then(res => {
                    res.map(item => {
                        tmpAllGames.push(item)
                    })

                    if (Math.ceil(tmpAllGames.length / 100) === maxCount) {
                        setIsLoad(true)
                        // 更新allGames
                        setAllGames(tmpAllGames)
                        // 使用reducer缓存数据
                        addList({
                            type: actionTypes.ADD_ALLGAMES,
                            allGames: tmpAllGames
                        })
                    }
                })
            }
        }

        apiRequest()
    }, [])

    // 筛选后的游戏数据
    const [filterGames, setFilterGames] = useState([])
    useEffect(() => {
        fuzzy(location.state.keywords)
    }, [allGames])

    // 模糊匹配
    const fuzzy = (keywords) => {
        if (allGames.length > 0) {
            let fuzzyArr = fuzzyQuery(allGames, keywords)
            setFilterGames(fuzzyArr)
        }
    }

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
                addList({
                    type: actionTypes.ADD_GAMESLIST,
                    gamesList: res
                })
            })
        }
        apiRequest()
    }, [])

    // 导航区域
    const Nav = () => {
        const TopSearch = () => {
            // 点击热门搜索
            const searchRankListClick = (e) => {
                navigate('/gamesDetail/' + e.objectId)
            }

            return (
                <div className='rank'>
                    {/* <span>热门搜索：</span> */}
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

            // 模糊匹配
            fuzzy(e)
        }

        const backRoot = () => {
            navigate('/')
        }

        return (
            <div className='nav'>
                <img src={require('../home/static/logo.png').default} alt='' onClick={() => backRoot()} />
                <TopSearch />
                <CGPSearchBar searchClick={(e) => startSearch(e)} />
            </div>
        )
    }

    // 列表区域
    const Main = () => {
        return (
            <div className='main'>
                {filterGames.map(item => {
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

    return (
        <div className='gamesSearch w'>
            <div style={{ display: isLoad ? '' : 'none' }}>
                <Nav />
                <Main />
                <CGPBottomLine />
            </div>
            <CGPLoading status={!isLoad} />
        </div>
    )
}

const stateToProps = (state) => {
    return {
        allGames: state.allGames,
        gamesList: state.gamesList
    }
}

const dispatchToProps = (dispatch) => {
    return {
        addList(action) {
            dispatch(action)
        }
    }
}

export default connect(stateToProps, dispatchToProps)(GamesSearch)