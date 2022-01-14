/*
CGPSearchBar 封装的搜索框
*/
import { useState } from 'react'
import './cgpSearchBar.css'

const CGPSearchBar = (props) => {
    const [inputValue, setInputValue] = useState('')

    // 输入事件
    const change = (e) => {
        // 更新inputValue的值
        setInputValue(e.target.value)
    }

    // 搜索按钮点击
    const searchClick = () => {
        if (props.searchClick) {
            props.searchClick(inputValue)
        }
    }

    return (
        <div className="search">
            <input type="text" name='search' placeholder='请输入游戏名称' autoComplete='off' value={inputValue} onChange={(e) => change(e)} />
            <button style={{ color: inputValue.length > 0 ? '#fff' : '#999', backgroundColor: inputValue.length > 0 ? '#2979ff' : '#ccc' }}
             onClick={() => searchClick()}>搜索</button>
        </div>
    )
}

export default CGPSearchBar