import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { randomNumber, cgp_popular_articles_list } from '../common/common'
import CGPBottomLine from '../components/cgpBottomLine/cgpBottomLine'
import CGPNavLink from '../components/cgpNavLink/cgpNavLink'
import CGPLoadMore from '../components/cgpLoadMore/cgpLoadMore'
import './articles.css'

const Articles = () => {
    const navigate = useNavigate()

    const [articlesList, setArticlesList] = useState([])
    useEffect(() => {
        // API
        apiRequest()
    }, [])

    // 页数page
    const [page, setPage] = useState(0)
    useEffect(() => {
        
    }, [])

    // 加载状态
    const [loadStatus, setLoadStatus] = useState(null)

    // API
    const apiRequest = (page) => {
        cgp_popular_articles_list(page, 9).then(res => {
            if (page === 0) {
                setArticlesList(res)
            } else {
                let list = articlesList.concat(res)
                setArticlesList(list)
                setLoadStatus(res.length === 0 ? 'noMore' : null)
            }
        })
    }

    // Nav
    const Nav = () => {
        // 随机看文章
        const readArticleRandom = () => {
            // 先从articlesList的长度范围内取一个随机数
            let randomNum = randomNumber(0, articlesList.length)
            console.log(JSON.stringify(articlesList[randomNum]))
            navigate('/articlesDetail/' + articlesList[randomNum].objectId)
        }

        return (
            <div className='nav'>
                <img className='logo' src={require('../home/static/logo.png').default} alt='' />
                <div className='random'>
                    <p><a href='#' onClick={() => readArticleRandom()}>想要随机看篇文章？{<br />}试着点击一下这里。</a></p>
                </div>
            </div>
        )
    }

    // Main
    const Main = () => {
        // 文章列表
        const getArticlesList = () => {
            return (
                <div className='articles-list'>
                    {articlesList.map(item => {
                        return <ul>
                            <li>
                                <CGPNavLink to={{ pathname: '/articlesDetail/' + item.objectId }}>
                                    <img src={item.image} alt='' />
                                    <p>{item.title}</p>
                                </CGPNavLink>
                            </li>
                        </ul>
                    })}
                </div>
            )
        }

        return (
            <div className='main'>
                {getArticlesList()}
            </div>
        )
    }

    // 加载更多内容
    const loadMore = () => {
        // 页码自增
        let p = page + 1
        setPage(p)
        // API
        setTimeout(() => {
            setLoadStatus('loading')
            apiRequest(p)
        }, 50);
    }

    return (
        <div className='articles w'>
            <Nav />
            <Main />
            <CGPLoadMore onClick={loadMore} loadStatus={loadStatus} />
            <CGPBottomLine />
        </div>
    )
}

export default Articles