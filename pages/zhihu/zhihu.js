//zhihu.js
var util = require('../../utils/util.js')
Page({
  baseUrl: "http://news-at.zhihu.com/api/4/news/before/",
  beforeDayNum: 2,
  data: {
    list: []
  },
  onShow: function () {
    wx.removeStorage({
      key: 'newsFrom',
      success: function(res){
        wx.setStorage({
          key: 'newsFrom',
          data: "zhihu"
        });
      }
    });
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        });
      }
    });
    that.getList();
  },
  getList: function () {
    var that = this;
    that.beforeDayNum -= 1;
    wx.request({
      url: that.baseUrl + util.dateForeword(new Date(), that.beforeDayNum),
      data: {},
      method: 'GET',
      success: function(res){
        that.setData({
          list: that.data.list.concat(res.data.stories)
        });
        console.log("知乎: ", that.data.list);
      }
    })
  }
});