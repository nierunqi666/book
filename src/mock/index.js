var homeJson = require('./data/home.json');
var recommendData1 = require('./data/recommend/recommend1.json');
var recommendData2 = require('./data/recommend/recommend2.json');
var recommendData3 = require('./data/recommend/recommend3.json');
var searchLove = require('./data/love.json');
var searchNight = require('./data/night.json');
var loveDetail = require('./data/1065797.json');
var loveChapter = require('./data/chapter-list.json');
var jsonObj = {
    '/api/index': homeJson,
    '/api/recommend?pageNum=1&count=10': recommendData1,
    '/api/recommend?pageNum=2&count=10': recommendData2,
    '/api/recommend?pageNum=3&count=10': recommendData3,
    '/api/search?key=如果蜗牛有爱情': searchLove,
    '/api/search?key=一夜弃妃': searchNight,
    '/api/detail?fiction_id=1065797': loveDetail,
    '/api/chapter?id=73': loveChapter
};

// /api/recommend?pageNum=1&count=10
module.exports = function(url) {
    if (jsonObj[url]) {
        return jsonObj[url]
    } else {
        return null;
    }

}