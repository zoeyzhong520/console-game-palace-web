/*
封装 NavLink：
_self ：默认。在相同的框架中打开被链接文档。
_blank: 新开一个窗口打开文档
_parent : 在父框架集中打开被链接文档。
_top:在整个窗口中打开被链接文档。
*/ 
import { NavLink } from "react-router-dom"
import { Component } from "react"

class CGPNavLink extends Component {
    render() {
        return (
            // <NavLink target='_blank' {...this.props}></NavLink>
            <NavLink {...this.props}></NavLink>
        )
    }
}

export default CGPNavLink