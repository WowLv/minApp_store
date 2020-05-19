import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: []
  },
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 1,

  onLoad: function (options) {
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },
  onReachBottom() {
    if(this.QueryParams.pagenum >= this.totalPages) {
      //没有更多了
      wx.showToast({
        title: "没有更多内容了",
      })
    }else {
      //继续请求
      this.QueryParams.pagenum ++
      this.getGoodsList()
    }
  },
  onPullDownRefresh() {
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1
    this.getGoodsList()
  },

  async getGoodsList() {
    const res = await request({ url: '/goods/search', data: this.QueryParams})
    const total = res.total
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
    //数据懒加载拼接数组
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods]
    })
    wx.stopPullDownRefresh()
  },
  handleTabsItemChange(e) {
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((el, i) => i === index ? el.isActive = true : el.isActive = false)
    this.setData({
      tabs: tabs
    })
  }
  
})