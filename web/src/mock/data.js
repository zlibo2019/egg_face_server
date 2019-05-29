import Mock from 'mockjs'

// 获取 mock.Random 对象
const Random = Mock.Random;

// mock数据
export const getDragList = req =>{
    let dragList = [];
    for(let i = 0; i < 10; i++){
        dragList.push(Mock.mock({
            name: Random.csentence(10, 13),
            id: Random.increment(10)
        }))
    }
    return dragList;
}

export const produceNewsData = function() {
    let articles = [];
    for (let i = 0; i < 100; i++) {
        let newArticleObject = {
            title: Random.csentence(5, 30), //  Random.csentence( min, max )
            thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
        }
        articles.push(newArticleObject)
    }
 
    return {
        articles: articles
    }
}

// 星级评价
export const getStartReviewRecord = function() {
    let data = {
        total:21,
        pageNum:1,
        pageSize:20,
        records : [],
    }
    for (let i = 0; i < 20; i++) {
        let newObject = {
            class_serial: i+1,
            class_name: `初${Random.natural(1, 4)} ${Random.natural(1, 30)}班`,
            class_star_num: Random.natural(1, 100),//随机生成1-100的数字,
            stars_user_aveby_class: Random.natural(1, 100),
            class_star_num_rankby_grad: Random.natural(1, 100),
            stars_user_aveby_class: Random.natural(1, 100),
            stars_user_aveby_grade: Random.natural(1, 100),
            user_star_num_rankby_grad: Random.natural(1, 100),
            stars_moral: Random.natural(1, 300),
            stars_chinese: Random.natural(1, 300),
            stars_math: Random.natural(1, 300),
            stars_english: Random.natural(1, 300),
        }
        data.records.push(newObject)
    }
 
    return {
        resultCode: 200,
        data: data,
        msg: '成功'
    }
}

// 班级树结构
export const getClassTree = function() {
    return {
        resultCode: 200,
        data: [{
            "id": 10003,
            "pid": 101,
            "label": "班级",
            "lv": 2,
            "group": 102,
            "isLeaf": 0,
            "children": [{
                "id": 10009,
                "pid": 10003,
                "label": "高中部",
                "lv": 3,
                "group": 103,
                "isLeaf": 0,
                "children": [
                    {
                    "id": 10013,
                    "pid": 10009,
                    "label": "高一",
                    "lv": 4,
                    "group": 104,
                    "isLeaf": 1,
                    "children": []
                }, {
                    "id": 10011,
                    "pid": 10009,
                    "label": "高二",
                    "lv": 4,
                    "group": 104,
                    "isLeaf": 0,
                    "children": [{
                        "id": 10014,
                        "pid": 10011,
                        "label": "一班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }, {
                        "id": 100017,
                        "pid": 10011,
                        "label": "二班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }, {
                        "id": 100018,
                        "pid": 10011,
                        "label": "三班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }, {
                        "id": 100019,
                        "pid": 10011,
                        "label": "四班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }, {
                        "id": 100020,
                        "pid": 10011,
                        "label": "五班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }]
                }, {
                    "id": 10012,
                    "pid": 10009,
                    "label": "高三",
                    "lv": 4,
                    "group": 104,
                    "isLeaf": 1,
                    "children": [{
                        "id": 10000,
                        "pid": 10012,
                        "label": "一班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }, {
                        "id": 10001,
                        "pid": 10012,
                        "label": "二班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }, {
                        "id": 10001,
                        "pid": 10012,
                        "label": "二班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }, {
                        "id": 10001,
                        "pid": 10012,
                        "label": "二班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }, {
                        "id": 10001,
                        "pid": 10012,
                        "label": "二班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }, {
                        "id": 10001,
                        "pid": 10012,
                        "label": "二班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }, {
                        "id": 10001,
                        "pid": 10012,
                        "label": "二班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }, {
                        "id": 10001,
                        "pid": 10012,
                        "label": "二班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }, {
                        "id": 10001,
                        "pid": 10012,
                        "label": "二班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }, {
                        "id": 10001,
                        "pid": 10012,
                        "label": "二班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }, {
                        "id": 10001,
                        "pid": 10012,
                        "label": "二班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }, {
                        "id": 10001,
                        "pid": 10012,
                        "label": "二班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }, {
                        "id": 10001,
                        "pid": 10012,
                        "label": "二班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }, {
                        "id": 10001,
                        "pid": 10012,
                        "label": "二班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }, {
                        "id": 10001,
                        "pid": 10012,
                        "label": "二班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }, {
                        "id": 10001,
                        "pid": 10012,
                        "label": "二班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }, {
                        "id": 10001,
                        "pid": 10012,
                        "label": "二班",
                        "lv": 5,
                        "group": 105,
                        "isLeaf": 1,
                        "children": []
                    }]
                }]
            }, {
                "id": 10010,
                "pid": 10003,
                "label": "初中部",
                "lv": 3,
                "group": 103,
                "isLeaf": 1,
                "children": []
            }]
        }],
        msg: '成功'
    }
}

/* // 星级评价记录-时间范围
export const getClassTree = function() {
    return {
        code: '0',
        data:[],
        msg: '成功'
    }
} */