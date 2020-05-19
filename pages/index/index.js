import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
    data: {
        swiperList: [],
        cateList: [],
        floorList: []
    },
    //options(Object)
    onLoad: function(options){
        this.getSwiperList()
        this.getCateList()
        this.getFloorList()
    },
    async getSwiperList() {
        const res = await request({
            url:'/home/swiperdata'
        })
        this.setData({
            swiperList: res
        })
        
    },
    async getCateList() {
        const res = await request({
            url:'/home/catitems'
        })
        this.setData({
            cateList: res
        })
    },
    async getFloorList() {
        const res = await request({
            url:'/home/floordata'
        })
        this.setData({
            floorList: res
        })
    }
    
});