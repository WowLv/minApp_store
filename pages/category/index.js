import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    leftMenuList: [],
    rightMenuList: [],
    currentIndex: 0,
    scrollTop: 0
  },
  Cates: [],
  onLoad: function (options) {
    //数据缓存
    const Cates = wx.getStorageSync("cates");
    
    if(!Cates) {
      this.getCatesList()
    }else {
      if(Date.now() - Cates.time > 1000*60*5) {
        this.getCatesList()
      }else {
        console.log("old data!")
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(item => item.cat_name)
        let rightMenuList = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightMenuList
        })
      }
    }
  },

  async getCatesList() {
    this.Cates = await request({ url:'/categories' })
    wx.setStorageSync("cates", {time:Date.now(), data: this.Cates});

    let leftMenuList = this.Cates.map(item => item.cat_name)
    let rightMenuList = this.Cates[0].children
    this.setData({
      leftMenuList,
      rightMenuList
    })
  },

  handleItemTap(e) {
    const {index} = e.currentTarget.dataset
    let rightMenuList = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightMenuList,
      scrollTop: 0
    })
  }

})