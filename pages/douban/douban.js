//douban.js
var util = require('../../utils/util.js');
Page({
  baseUrl: "https://moment.douban.com/api/stream/date/",
  beforeDayNum: 1,
  data: {
    list: []
  },
  onShow: function () {
    wx.removeStorage({
      key: 'newsFrom',
      success: function(res){
        wx.setStorage({
          key: 'newsFrom',
          data: "douban"
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
      url: that.baseUrl + util.dateForeword(new Date(), that.beforeDayNum, true),
      data: {},
      method: 'GET',
      success: function(res){
        console.log(res);
        that.setData({
          list: that.data.list.concat(res.data.posts)
        });
        console.log("豆瓣: ", that.data.list);
      }
    })
  }
});