/*
页面底部点击加载更多内容组件
*/ 

import { useEffect, useState } from 'react'
import './cgpLoadMore.css'

// 加载更多数据
const CGPLoadMore = (props) => {
    /*
    loadstatus有三种状态
    1 loading 加载中
    2 noMore 没有更多内容了
    3 default 加载更多内容
    */ 
    const [loadTitle, setLoadTitle] = useState('')
    useEffect(() => {
        setLoadTitle(props.loadstatus ? (props.loadstatus === 'loading' ? '加载中...' : (props.loadstatus === 'noMore' ? '没有更多内容了' : '点击加载更多内容')) : '点击加载更多内容')
    }, [props.loadstatus]) 

    // 响应按钮点击
    const clickAction = () => {
        if (props.loadstatus === 'noMore') {
            return
        }
        props.onClick()
    }

    return (
        <div className='cgpLoadMore'>
            <button
             onClick={() => clickAction()}
             loadstatus={props.loadstatus}
             >{loadTitle}</button>
        </div>
    )
}

export default CGPLoadMore