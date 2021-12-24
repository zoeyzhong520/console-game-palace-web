import { useState } from 'react'
import { tabsList } from '../common/common'
import CGPSearchBar from '../components/cgpSearchBar/cgpSearchBar'
import CGPBottomLine from '../components/cgpBottomLine/cgpBottomLine'
import './games.css'

const Games = (props) => {
    const [dataSource, setDataSource] = useState({
        rankList: [1, 1, 1, 1], // 游戏搜索排行
        gamesList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] // 游戏列表
    })

    useState(() => {
        console.log(props.location)
    }, [])

    // 导航菜单
    const Nav = () => {
        // tabs标签列表
        const getTabsList = () => {
            return (
                <div className='tabs'>
                    {tabsList.map(item => {
                        return <ul>
                            <li><a href='#'>{item.name}</a></li>
                        </ul>
                    })}
                </div>
            )
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
                            <li><a href='#'>{'∙'}标题标题标题标题标题</a></li>
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
                {dataSource.gamesList.map(item => {
                    return <ul>
                        <li>
                            <div className='gamePic'>
                                <img src={require('../home/static/7.jpeg').default} />
                            </div>
                            <div className='content'>
                                <p className='gameName'>标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</p>
                                <p className='gameDesc'>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                                <a href='#'>查看详情</a>
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