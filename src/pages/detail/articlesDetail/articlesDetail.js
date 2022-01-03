/*
articles文章详情页
*/
import { useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react/cjs/react.development'
import { useDangerouslySetInnerHTML, cgp_recommend_getDetail_with_objectId } from '../../common/common'
import CGPBottomLine from '../../components/cgpBottomLine/cgpBottomLine'
import './articlesDetail.css'

const ArticlesDetail = () => {
    const { objectId } = useParams()
    const location = useLocation()

    const [dataSource, setDataSource] = useState({})

    useEffect(() => { 
        // API
        const apiRequest = () => {
            cgp_recommend_getDetail_with_objectId(location.state ? location.state.objectId : objectId, 'CGP_PopularArticles').then(res => {
                setDataSource(res)
            })
        }
        apiRequest()
    }, [])

    const Nav = () => {
        return (
            <div className="nav">
                <img src={require('../../home/static/logo.png').default} alt='' />
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
            <Nav />
            <Main />
            <CGPBottomLine />
        </div>
    )
}

export default ArticlesDetail