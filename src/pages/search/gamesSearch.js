/*
游戏搜索页面
*/
import { useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fuzzyQuery, recommend_search_all_data } from '../common/common'
import * as actionTypes from '../../store/actionTypes'
import CGPBottomLine from '../components/cgpBottomLine/cgpBottomLine'
import './gamesSearch.css'

const GamesSearch = (props) => {
    const { gamesCount } = useParams()
    const location = useLocation()

    // 使用reducer
    let { addList } = props

    // 全部游戏数据
    const [allGames, setAllGames] = useState([])
    useEffect(() => {
        // API
        const apiRequest = () => {
            if (props.allGames.length > 0) {
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
        // 模糊匹配
        const fuzzy = () => {
            if (allGames.length > 0) {
                let fuzzyArr = fuzzyQuery(allGames, location.state.keywords)
                setFilterGames(fuzzyArr)
            }
        }

        fuzzy()
    }, [allGames])

    // 导航区域
    const Nav = () => {
        return (
            <div className='nav'></div>
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
                                <a href='#'>查看详情</a>
                            </div>
                        </li>
                    </ul>
                })}
            </div>
        )
    }

    return (
        <div className='gamesSearch w'>
            <Nav />
            <Main />
            <CGPBottomLine />
        </div>
    )
}

const stateToProps = (state) => {
    return {
        allGames: state.allGames
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