import { tabsList } from '../common/common'
import './games.css'

const Games = () => {
    // 导航菜单
    const Nav = () => {
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
            <div className='nav'>
                {getTabsList()}
            </div>
        )
    }

    // 游戏列表区域
    const Main = () => {
        return (
            <div className='main'>

            </div>
        )
    }
    
    return <div className='games w'>
        <Nav />
        <Main />
    </div>
}

export default Games