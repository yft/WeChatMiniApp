// detail.js
var WxParse = require("../wxParse/wxParse.js");
Page({
  data:{
    plot: ""
  },
  onLoad:function(options){
    var that = this;
    that.setData({
      plot: options.img
    });
    var handler = {
      "zhihu": function () {
        wx.request({
          url: 'http://news-at.zhihu.com/api/4/news/' + options.id,
          data: {},
          method: 'GET',
          success: function(res){
            that.data = res.data;
            WxParse.wxParse("html", that.data.body, that);
          }
        });
      },
      "guoke": function () {
        wx.request({
          url: 'http://jingxuan.guokr.com/pick/v2/' + options.id + "/",
          data: {},
          method: 'GET',
          success: function(res){
            var leftIndex = res.data.indexOf("<body>");
            var rightIndex = res.data.indexOf('</body>');
            that.setData({
              body: res.data.substring(leftIndex + 6, rightIndex)
            });
            
            WxParse.wxParse("html", that.data.body, that);
          }
        });
      },
      "douban": function () {
        wx.request({
          url: 'https://moment.douban.com/api/post/' + options.id,
          data: {},
          method: 'GET',
          success: function(res){
            that.data = res.data;
            WxParse.wxParse("html", that.data.content, that);
          }
        });
      }
    };
    var newsFrom = wx.getStorage({
      key: 'newsFrom',
      success: function(res){
        // success
        handler[res.data]();
      },
      fail: function() {
        // fail
      }
    })
  },
  wxParseImgTap: function (e) {
    var that = this;
    WxParse.wxParseImgTap(e, that);
  },
  wxParseImgLoad: function (e) {
    var that = this;
    WxParse.wxParseImgLoad(e, that);
  }
});