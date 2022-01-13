/*
CGPLoading 加载中组件
*/
import { useEffect, useState } from 'react'
import './cgpLoading.css'

const CGPLoading = (props) => {
    // 可视窗口
    const [screenSize, setScreenSize] = useState({})
    useEffect(() => {
        setScreenSize({
            height: window.innerHeight + 'px'
        })
    }, [])

    // 显示状态
    const [status, setStatus] = useState(true)
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    return (
        <div className="cgpLoading w" style={{ height: screenSize.height, display: status ? '' : 'none' }}>
            <img src={require('./loading.gif').default} alt='' />
        </div>
    )
}

export default CGPLoading