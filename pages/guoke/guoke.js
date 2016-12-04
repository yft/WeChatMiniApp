//guoke.js
var util = require('../../utils/util.js')
Page({
  baseUrl: "http://apis.guokr.com/handpick/article.json?retrieve_type=by_since&category=all&limit=20&ad=2",
  data: {
    list: []
  },
  onShow: function () {
    wx.removeStorage({
      key: 'newsFrom',
      success: function(res){
        wx.setStorage({
          key: 'newsFrom',
          data: "guoke"
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
    wx.request({
      url: that.baseUrl,
      data: {},
      method: 'GET',
      success: function(res){
        that.setData({
          list: res.data.result
        });
        // console.log("果壳: ", that.data.list);
      }
    })
  }
});