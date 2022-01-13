/*
articles文章详情页
*/
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react/cjs/react.development'
import { useDangerouslySetInnerHTML, cgp_recommend_getDetail_with_objectId } from '../../common/common'
import CGPBottomLine from '../../components/cgpBottomLine/cgpBottomLine'
import CGPLoading from '../../components/CGPLoading/cgpLoading'
import './articlesDetail.css'

const ArticlesDetail = () => {
    const { objectId } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    // 是否加载完成
    const [isLoad, setIsLoad] = useState(false)

    const [dataSource, setDataSource] = useState({})
    useEffect(() => {
        // API
        const apiRequest = () => {
            cgp_recommend_getDetail_with_objectId(location.state ? location.state.objectId : objectId, 'CGP_PopularArticles').then(res => {
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
            <div className="nav">
                <img src={require('../../home/static/logo.png').default} alt='' onClick={() => backRoot()} />
                <p className='title'>{dataSource.title}</p>
                <p>{dataSource.createdAt}</p>
            </div>
        )
    }

    const Main = () => {
        return (
            <div className="main w">
                {useDangerouslySetInnerHTML(dataSource.content)}
            </div>
        )
    }

    return (
        <div className="articlesDetail w">
            <div style={{ display: isLoad ? '' : 'none' }}>
                <Nav />
                <Main />
                <CGPBottomLine />
            </div>
            <CGPLoading status={!isLoad} />
        </div>
    )
}

export default ArticlesDetail