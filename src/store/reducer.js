import * as actionTypes from './actionTypes'

const defaultState = {
    bannerList: [],     // 广告位数据
    gamesList: [],      // 全部推荐数据
    articlesList: [],    // 热门文章数据
    gamesType: ''       // 游戏类型
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ADD_BANNERLIST:
            return {
                ...state,
                bannerList: action.bannerList
            }
        case actionTypes.ADD_GAMESLIST:
            return {
                ...state,
                gamesList: action.gamesList
            }
        case actionTypes.ADD_ARTIClESLIST:
            return {
                ...state,
                articlesList: action.articlesList
            }
        case actionTypes.ADD_GAMESTYPE:
            return {
                ...state,
                gamesType: action.gamesType
            }
        default:
            if (false) {
                console.log(JSON.stringify(defaultState))
            }
    }
    return state
}

export default reducer