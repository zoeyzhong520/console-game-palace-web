/*
CGPSearchBar 封装的搜索框
*/
import './cgpSearchBar.css'

const CGPSearchBar = () => {
    return (
        <div className="search">
            <input type="text" name='search' placeholder='请输入游戏名称' />
            <button>搜索</button>
        </div>
    )
}

export default CGPSearchBar