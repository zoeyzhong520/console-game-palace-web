import { useState } from 'react'
import Carousel from '../components/carousel/carousel'
import CGPBottomLine from '../components/cgpBottomLine/cgpBottomLine'
import CGPNavLink from '../components/cgpNavLink/cgpNavLink'
import './articles.css'

const Articles = () => {
    const [dataSource, setDataSource] = useState({
        articlesList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    })

    // Nav
    const Nav = () => {
        return (
            <div className='nav'>
                <img className='logo' src={require('../home/static/logo.png').default} alt='' />
                <div className='random'>
                    <p><a href='#'>想要随机看篇文章？{<br />}试着点击一下这里。</a></p>
                </div>
                <Carousel className='carousel' />
            </div>
        )
    }

    // Main
    const Main = () => {
        // 文章列表
        const getArticlesList = () => {
            return (
                <div className='articles-list'>
                    {dataSource.articlesList.map(item => {
                        return <ul>
                            <li>
                                <CGPNavLink to='/articlesDetail'>
                                    <img src={require('../home/static/7.jpeg').default} alt='' />
                                    <p>标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</p>
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