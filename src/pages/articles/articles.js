import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { randomNumber, cgp_popular_articles_list } from '../common/common'
import CGPBottomLine from '../components/cgpBottomLine/cgpBottomLine'
import CGPNavLink from '../components/cgpNavLink/cgpNavLink'
import './articles.css'

const Articles = () => {
    const navigate = useNavigate()

    const [articlesList, setArticlesList] = useState([])
    useEffect(() => {
        // API
        const apiRequest = () => {
            cgp_popular_articles_list().then(res => {
                setArticlesList(res)
            })
        }
        apiRequest()
    }, [])

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

    return (
        <div className='articles w'>
            <Nav />
            <Main />
            <CGPBottomLine />
        </div>
    )
}

export default Articles