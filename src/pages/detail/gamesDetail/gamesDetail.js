/*
games游戏详情页
*/
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react/cjs/react.development'
import { useDangerouslySetInnerHTML, cgp_recommend_getDetail_with_objectId } from '../../common/common'
import CGPBottomLine from '../../components/cgpBottomLine/cgpBottomLine'
import CGPLoading from '../../components/CGPLoading/cgpLoading'
import './gamesDetail.css'

const GamesDetail = () => {
    const { objectId } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    // 是否加载完成
    const [isLoad, setIsLoad] = useState(false)

    const [dataSource, setDataSource] = useState({})
    useEffect(() => {
        // API
        const apiRequest = () => {
            cgp_recommend_getDetail_with_objectId(objectId, location.state && location.state.isBanner ? 'CGP_Banner' : 'CGP_HotRecommend').then(res => {
                setIsLoad(true)
                setDataSource(res)
            })
        }
        apiRequest()
    }, [])

    const Nav = () => {
        const backRoot = () => {
            navigate('/')
        }

        return (
            <div className='nav'>
                <img src={require('../../home/static/logo.png').default} alt='' onClick={() => backRoot()} />
                <p>Hello！依托小助的{' "大数据" '}分析，这款游戏一共被查看了{dataSource.readCount ? dataSource.readCount : '888888'}次了。</p>
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
            <div style={{ display: isLoad ? '' : 'none' }}>
                <Nav />
                <Main />
                <CGPBottomLine />
            </div>
            <CGPLoading status={!isLoad} />
        </div>
    )
}

export default GamesDetail