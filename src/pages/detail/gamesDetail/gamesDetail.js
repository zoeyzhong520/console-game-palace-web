/*
games游戏详情页
*/ 
import './gamesDetail.css'

const GamesDetail = () => {
    // 标题
    const Title = () => {
        return (
            <div className="title">1</div>
        )
    }

    // 下载地址
    const Source = () => {
        return (
            <div className="source">2</div>
        )
    }

    // 游戏介绍
    const Description = () => {
        return (
            <div className="description">3</div>
        )
    }

    // 系统配置
    const Requirements = () => {
        return (
            <div className="requirements">4</div>
        )
    }

    return (
        <div className="gamesDetail w">
            <Title />
            <Source />
            <Description />
            <Requirements />
        </div>
    )
}

export default GamesDetail