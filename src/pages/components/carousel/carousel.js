/*
思路：
1、使用全局的state进行状态管理
2、设置全局下标，对当前的图片下表进行样式划分
3、定时循环人物便利改变全局下标 
*/

import React from 'react';
import './carousel.css'

class Carousel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listImg: [],        // 图片数组
            index: 0,           // 图片下标
            timer: null,        // 定时器
            showElem: false,    // 布尔变量
            imgWidth: '100%',   // 图片宽
            imgHeight: '100%'   // 图片高
        }
    }

    // 生命周期
    componentDidMount() {
        /*
        1 配置listImg
        2 配置showElem, display属性来控制元素显示和隐藏
        3 配置imgWidth、imgHeight
        */
        let { showElem, listImg, imgWidth, imgHeight } = this.state
        listImg = this.props.listImg
        imgWidth = this.props.imgWidth
        imgHeight = this.props.imgHeight
        showElem = listImg.length > 1

        this.setState({
            listImg,
            imgWidth,
            imgHeight,
            showElem
        }, () => {
            // 开启定时器
            this.start()
        })
    }

    componentWillUnmount() {
        // 清除定时器
        this.stop()
    }

    // 暂停
    stop = () => {
        let { timer } = this.start
        if (timer) {
            clearInterval(timer)
        }
    }

    // 开始
    start = () => {
        let { timer } = this.state

        // 当图片数量<=1时无需启动定时器
        if (this.state.listImg.length <= 1 || timer) {
            return
        }

        timer = setInterval(() => {
            this.next()
        }, 8000)
        this.setState({
            timer
        })
    }

    // 下一张
    next = (e) => {
        let ev = e
        let { listImg, index } = this.state
        if (index >= listImg.length - 1) {
            index = 0
        } else {
            index++
        }
        this.setState({
            index
        })
    }

    // 上一张
    previous = (e) => {
        let ev = e
        let { listImg, index } = this.state
        if (index <= 0) {
            index = listImg.length - 1
        } else {
            index--
        }
        this.setState({
            index
        })
    }

    // 点击小圆点切换图片
    indexChange = (idx) => {
        let { index } = this.state
        index = idx
        this.setState({
            index
        })
    }

    // 图片点击
    onClick = (imgIndex) => {
        /*
        1 通过props发送出去一个方法
        2 把点击的图片下标传递出去
        */
        this.props.onClick(imgIndex)
    }

    render() {
        return (
            <div className='carousel'>
                <ul className='ul'>
                    {this.state.listImg.map((item, imgIndex) => {
                        return (
                            <li className={imgIndex === this.state.index ? 'show' : ''} key={item+'img'}>
                                <img src={item} alt='' onClick={() => this.onClick(imgIndex)}
                                style={{ width: this.state.imgWidth, height: this.state.imgHeight }}
                                 />
                            </li>
                        )
                    })}
                </ul>
                <ul className='carousel-dots' style={{ display: this.state.showElem ? '' : 'none' }}>
                    {this.state.listImg.map((item, imgIndex) => {
                        return (
                            <li className={imgIndex === this.state.index ? 'active' : ''} key={item+'carousel-dots'} onClick={() => this.indexChange(imgIndex)}></li>
                        )
                    })}
                </ul>
                <div className='carousel-control' style={{ display: this.state.showElem ? '' : 'none' }}>
                    <span className='left' onClick={(e) => this.previous(e)}>上一个</span>
                    <span className='right' onClick={(e) => this.next(e)}>下一个</span>
                </div>
            </div>
        )
    }
}

export default Carousel

