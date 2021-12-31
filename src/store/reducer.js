import * as actionTypes from './actionTypes'

const defaultState = {
    bannerList: [1, 1, 1],     // 广告位数据
    gamesList: [1, 1, 1, 1],      // 全部推荐数据
    articlesList: [1, 1, 1, 1, 1]    // 热门文章数据
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
        default:
            console.log(JSON.stringify(action))
    }
    return state
}

export default reducer