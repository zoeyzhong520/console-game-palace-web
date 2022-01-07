/*
网络请求类
*/
import React from "react";

// 标签数组
export const tabsList = [
    {
        name: "动作游戏",
        type: 'A'
    },
    {
        name: "射击游戏",
        type: 'B'
    },
    {
        name: "角色扮演",
        type: 'C'
    },
    {
        name: "动作冒险",
        type: 'D'
    },
    {
        name: "冒险解谜",
        type: 'E'
    },
    {
        name: "格斗游戏",
        type: 'F'
    },
    {
        name: "赛车竞技",
        type: 'G'
    },
    {
        name: "模拟经营",
        type: 'H'
    },
    {
        name: "即时战略",
        type: 'I'
    },
    {
        name: "文字游戏",
        type: 'J'
    },
    {
        name: "恐怖冒险",
        type: 'K'
    },
    {
        name: "休闲益智",
        type: 'L'
    },
    {
        name: "音乐游戏",
        type: 'M'
    },
    {
        name: "策略游戏",
        type: 'N'
    },
    {
        name: "生存冒险",
        type: 'O'
    },
    {
        name: "卡通可爱",
        type: 'P'
    },
    {
        name: "体育竞技",
        type: 'Q'
    },
    {
        name: "街机游戏",
        type: 'R'
    }]

/* dangerouslySetInnerHTML
    1.dangerouslySetInnerHTMl 是React标签的一个属性，类似于angular的ng-bind；
    2.有2个{{}}，第一{}代表jsx语法开始，第二个是代表dangerouslySetInnerHTML接收的是一个对象键值对;
    3.既可以插入DOM，又可以插入字符串；
*/
export const useDangerouslySetInnerHTML = (htmlText) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlText }}></div>
}

/*
取随机数
min 最小值
max 最大值
*/
export const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}

/*
取随机颜色
*/
export const randomColor = () => {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ',' + g + ',' + b + ")";
}

// 处理页面滚动
export const handleOnScroll = () => {
    return new Promise((resolve, reject) => {
        // 滚动条距离顶部
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 可视区域
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        // 滚动条内容的总高度
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollTop + clientHeight === scrollHeight) {
            resolve(true)
        }
    })
}

/**
 * 使用test方法实现模糊查询
 * @param  {Array}  list     原数组
 * @param  {String} keyWord  查询的关键词
 * @return {Array}           查询的结果
 */
 export const fuzzyQuery = function(list, keyWord) {
	var reg = new RegExp(keyWord);
	var arr = [];
	for (var i = 0; i < list.length; i++) {
		if (reg.test(list[i].title)) {
			arr.push(list[i]);
		}
	}
	return arr;
}

/*以下为API*/

// 获取配置信息
export const cgp_configs = function () {
    return new Promise((resolve, reject) => {

        const query = React.$bmob.Query('CGP_Configs')
        query.find().then(res => {
            // console.log(JSON.stringify(res))
            resolve(res)
        });

    })
}

// 获取广告位数据
export const cgp_recommend_banner_list = function () {
    return new Promise((resolve, reject) => {

        const query = React.$bmob.Query('CGP_Banner')
        query.find().then(res => {
            // console.log(res)
            resolve(res)
        });

    })
}

// 获取全部推荐数据
export const cgp_recommend_all_list = function (page) {
    return new Promise((resolve, reject) => {

        const query = React.$bmob.Query('CGP_HotRecommend')
        // 对createdAt字段降序排列
        query.order("-createdAt")
        query.limit(10)
        query.skip(page * 10)
        query.find().then(res => {
            // console.log(res)
            resolve(res)
        });

    })
}

/*
热门文章列表数据
page 页码
limit 每页的内容个数
*/ 
export const cgp_popular_articles_list = function (page, limit) {
    return new Promise((resolve, reject) => {

        const query = React.$bmob.Query('CGP_PopularArticles')
        // 对createdAt字段降序排列
        query.order("-createdAt")
        query.limit(limit ? limit : 20)
        query.skip(limit ? page * limit : page * 10)
        query.find().then(res => {
            // console.log(res)
            resolve(res)
        });

    })
}

/**
 * 根据 tabs 标签查询数据
 * @param  {String} type     类型
 * @return {Array}           查询的结果
 */
export const leaderboards_query_list = function (type, page) {
    return new Promise((resolve, reject) => {

        const query = React.$bmob.Query('CGP_HotRecommend')
        if (type !== 'ALL') {
            query.equalTo("type", "==", type)
        }
        // 对readCount字段降序排列
        query.order("-readCount")
        query.limit(20)
        // query.skip(page * 10)
        query.find().then(res => {
            // console.log(res)
            resolve(res)
        });

    })
}

/**
 * 根据 tabs 标签查询数据
 * @param  {String} type    tabs类型
 * @return {Array}           查询的结果
 */
export const cgp_recommend_query_list = function (type, page) {
    return new Promise((resolve, reject) => {

        if (type === 'ALL') {
            return
        }

        const query = React.$bmob.Query('CGP_HotRecommend')
        query.equalTo("type", "==", type)
        // 对createdAt字段降序排列
        query.order("-createdAt")
        // 对readCount字段降序排列
        query.order("-readCount")
        query.limit(10)
        query.skip(page * 10)
        query.find().then(res => {
            // console.log(res)
            resolve(res)
        });

    })
}

/*
获取一行记录
objectId 主键ID
tableName 数据表名，默认为 CGP_HotRecommend
*/
export const cgp_recommend_getDetail_with_objectId = function (objectId, tableName) {
    return new Promise((resolve, reject) => {
        const query = React.$bmob.Query(!!tableName ? tableName : 'CGP_HotRecommend')
        query.get(objectId).then(res => {
            // console.log(res)
            resolve(res)
        }).catch(err => {
            // console.log(err)
            reject(err)
        })
    })
}

// 新增一行记录 设备ID
export const cgp_recommend_insert_deviceId = function () {
    return new Promise((resolve, reject) => {

        // 获取设备ID
        // var deviceId = uni.getSystemInfoSync().deviceId
        var deviceId = 'asdfghjkl'

        const query = React.$bmob.Query('CGP_DeviceIds')

        // 查询是否已有此设备ID
        query.equalTo("deviceId", "==", deviceId);
        query.find().then(res => {
            if (JSON.stringify(res) === '[]') {
                // 新增一条数据
                query.set("deviceId", deviceId)
                query.set('hasPermission', false)
                query.save().then(res => {
                    // objectId 主键唯一值
                    // hasPermission 是否有查看下载地址权限
                    // isNewDevice 是否新注册设备
                    resolve({
                        objectId: res.objectId,
                        hasPermission: false,
                        isNewDevice: true
                    })
                }).catch(err => {
                    reject(err)
                })
            } else {
                resolve({
                    objectId: res[0].objectId,
                    hasPermission: res[0].hasPermission,
                    isNewDevice: false
                })
            }
        });
    })
}

// 通过主键修改一行记录
// objectId 主键
export const recommend_detail_editRecord_with_objectId = function (objectId) {
    return new Promise((resolve, reject) => {

        // uni.showLoading({
        // 	mask: false
        // })

        const query = React.$bmob.Query('CGP_DeviceIds');
        query.get(objectId).then(res => {
            // uni.hideLoading()
            res.set('hasPermission', true)
            res.save().then(res => {
                resolve(res)
            })
        }).catch(err => {
            reject(err)
        })

    })
}

// 获取全部数据
// page 请求的分页页码
export const recommend_search_all_data = function(page) {
	return new Promise((resolve, reject) => {
		
		const query = React.$bmob.Query('CGP_HotRecommend')
		query.limit(100)
		query.skip(page * 100)
		query.find().then(res => {
			resolve(res)
		});
		
	})
}