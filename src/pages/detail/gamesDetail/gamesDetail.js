/*
games游戏详情页
*/
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react/cjs/react.development'
import { useDangerouslySetInnerHTML } from '../../common/common'
import CGPBottomLine from '../../components/cgpBottomLine/cgpBottomLine'
import './gamesDetail.css'

const GamesDetail = () => {
    const location = useLocation()

    const [dataSource, setDataSource] = useState({})

    useEffect(() => {
        setDataSource(location.state)
    }, [])

    const Nav = () => {
        return (
            <div className='nav'>
                <img src={require('../../home/static/logo.png').default} alt='' />
                <p>根据小助的精心统计分析，这款游戏已经一共被查看了888次了。</p>
                <p>当然数据只能从一定程度体现热门程度，实际表现期待你的体验。</p>
            </div>
        )
    }

    const Main = () => {
        // 游戏标题
        const Title = () => {
            return (
                <div className="title">
                    <p>{dataSource.title}</p>
                    <p className='updateTime'>{dataSource.createdAt}</p>
                </div>
            )
        }

        // 游戏简介
        const Description = () => {
            return (
                <div className="description">
                    <p>{dataSource.description}</p>
                </div>
            )
        }

        // 游戏截图
        const Screenshots = () => {
            return (
                <div className="screenshots">
                    {/* 调用map的对象是 undefined，初始化第一次渲染的时候异步数据返回之前checkarr是undefined */}
                    {dataSource.imageList && dataSource.imageList.map(item => {
                        return <img src={item} alt='' />
                    })}
                </div>
            )
        }

        // 系统需求
        const Requirements = () => {
            return (
                <div className="requirements">
                    <p>{dataSource.requirements}</p>
                </div>
            )
        }

        // 资源地址
        const Source = () => {
            return (
                <div className="source">
                    <p>百度云：<a href={dataSource.baiduUrl}>{dataSource.baiduUrl}</a></p>
                    <p style={{ margin: '0 0 20px 0' }}>天翼云：<a href={dataSource.tyUrl}>{dataSource.tyUrl}</a></p>
                    {useDangerouslySetInnerHTML(dataSource.resources)}
                </div>
            )
        }

        return (
            <div className='main'>
                <Title />
                <Description />
                <Screenshots />
                <Requirements />
                <Source />
            </div>
        )
    }

    return (
        <div className="gamesDetail w">
            <Nav />
            <Main />
            <CGPBottomLine />
        </div>
    )
}

export default GamesDetail