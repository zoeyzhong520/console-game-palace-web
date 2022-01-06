/*
页面底部点击加载更多内容组件
*/ 

import { useEffect, useState } from 'react'
import './cgpLoadMore.css'

// 加载更多数据
const CGPLoadMore = (props) => {
    /*
    loadStatus有三种状态
    1 loading 加载中
    2 noMore 没有更多内容了
    3 default 加载更多内容
    */ 
    const [loadTitle, setLoadTitle] = useState('')
    useEffect(() => {
        setLoadTitle(props.loadStatus ? (props.loadStatus === 'loading' ? '加载中...' : (props.loadStatus === 'noMore' ? '没有更多内容了' : '加载更多内容')) : '加载更多内容')
    }, [props.loadStatus]) 

    // 响应按钮点击
    const clickAction = () => {
        if (props.loadStatus === 'noMore') {
            return
        }
        props.onClick()
    }

    return (
        <div className='cgpLoadMore'>
            <button
             onClick={() => clickAction()}
             loadStatus={props.loadStatus}
             >{loadTitle}</button>
        </div>
    )
}

export default CGPLoadMore