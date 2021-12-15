import { useState } from 'react/cjs/react.production.min'
import { tabsList } from './common'
import './home.css'

// 左侧菜单
const Left = () => {
    const showTabs = () => {
        return <div>
            {tabsList.map(item => {
                return <li key={item}><a href='#'>{item.name}</a></li>
            })}
        </div>
    }

    return (
        <div className='home-left'>
            <div className='home-left-logo'></div>
            {showTabs()}
        </div>
    )
}

// 搜索框+广告位+列表
const Content = () => {
    // 搜索框
    const searchBar = () => {
        return <div className='home-content-search-bar'>
            <input type='text' placeholder='请输入...' name='' id='' value=''></input>
            <button>搜索</button>
        </div>
    }

    return (
        <div className='home-content'>
            {searchBar()}
        </div>
    )
}

const Home = () => {
    return (
        <div className='home'>
            <Left />
            <Content />
        </div>
    )
}

export default Home