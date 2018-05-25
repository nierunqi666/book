var homeJson = require('./data/home.json');
var recommendData1 = require('./data/recommend/recommend1.json');
var recommendData2 = require('./data/recommend/recommend2.json');
var recommendData3 = require('./data/recommend/recommend3.json');
var searchLove = require('./data/love.json'); //如果蜗牛有爱情
var searchNight = require('./data/night.json'); //一夜弃妃
var loveDetail = require('./data/1065797.json'); //如果蜗牛有爱情详情
var loveChapter = require('./data/chapter-list.json'); //如果蜗牛有爱情详情章节
var chapter_1 = require('./article/data1.json');
var chapter_2 = require('./article/data2.json');
var chapter_3 = require('./article/data3.json');
var chapter_4 = require('./article/data4.json');
var chapter_5 = require('./article/data5.json');
var jsonObj = {
    '/api/index': homeJson,
    '/api/recommend?pageNum=1&count=10': recommendData1,
    '/api/recommend?pageNum=2&count=10': recommendData2,
    '/api/recommend?pageNum=3&count=10': recommendData3,
    '/api/search?key=如果蜗牛有爱情': searchLove,
    '/api/search?key=一夜弃妃': searchNight,
    '/api/detail?id=1065797': loveDetail, //书的id
    '/api/chapter?id=1065797': loveChapter, //更新至 章节的id
    '/api/article?id=1065797&chapter_id=1': chapter_1,
    '/api/article?id=1065797&chapter_id=2': chapter_2,
    '/api/article?id=1065797&chapter_id=3': chapter_3,
    '/api/article?id=1065797&chapter_id=4': chapter_4,
    '/api/article?id=1065797&chapter_id=5': chapter_5
};

// /api/recommend?pageNum=1&count=10
module.exports = function(url) {
    if (jsonObj[url]) {
        return jsonObj[url]
    } else {
        return null;
    }

}