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
            listImg: [
                require('../static/1.jpeg').default,
                require('../static/2.jpeg').default,
                require('../static/3.jpeg').default,
                require('../static/4.jpeg').default,
                require('../static/5.jpeg').default
            ],
            index: 0,
            timer: null
        }
    }

    // 生命周期
    componentDidMount() {
        // 开启定时器
        this.start()
    }

    componentWillUnmount() {
        // 清除定时器
        this.stop()
    }

    // 暂停
    stop = () => {
        let { timer } = this.start
        clearInterval(timer)
    }

    // 开始
    start = () => {
        let { timer } = this.state
        timer = setInterval(() => {
            this.next()
        }, 2500)
        this.setState({
            timer
        })
    }

    // 下一张
    next = (e) => {
        let ev = e
        let { listImg, index } = this.state
        if (index >= listImg.length-1) {
            index = 0
        } else {
            index ++
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
            index = listImg.length-1
        } else {
            index --
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

    render() {
        return (
            <div className='carousel'>
                <ul className='ul'>
                {this.state.listImg.map((item, imgIndex) => {
                    return (
                        <li className={imgIndex === this.state.index ? 'show' : ''} key={imgIndex}>
                            <img src={item} alt='' />
                        </li>
                    )
                })}
                </ul>
                <ul className='carousel-dots'>
                    {this.state.listImg.map((item, imgIndex) => {
                        return (
                            <li className={imgIndex === this.state.index ? 'active' : ''} key={imgIndex} onClick={() => this.indexChange(imgIndex)}></li>
                        )
                    })}
                </ul>
                <div className='carousel-control'>
                    <span className='left' onClick={(e) => this.previous(e)}>上一个</span>
                    <span className='right' onClick={(e) => this.next(e)}>下一个</span>
                </div>
            </div>
        )
    }
}

export default Carousel

