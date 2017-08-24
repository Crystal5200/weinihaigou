import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import common from '../js/common'
import API from '../js/api.js'

Vue.use(Vuex)

const store = new Vuex.Store( {
    state : {
        isLogin : false,//是否登录
        weixn : false,//是否使用微信支付
        goodsNo : null,//传递的商品id
        carCount : '',//购物车数量
    },
    mutations : {
        checkUser( state ) {
            $.ajax({
                url : API.checkUser,
                type : 'post',
                dataType : 'json',
                async: false,
                success : function(data) {
                    console.log(data);
                    state.isLogin = data.success;
                }
            });
        },

        isWeixn( state ) {
          var ua = navigator.userAgent.toLowerCase();
          if( ua.match(/MicroMessenger/i)=="micromessenger" ) {
              state.weixn = true;
          }
        },

        changeGoodsNo( state, goodsNo ) {
          state.goodsNo = goodsNo;
        },

        carCount(state) {
            var oThis = this;
            $.ajax({
                type : "POST",
                url : API.carCount,
                dataType : 'json',
                success : function(data) {
                    if (data.success == true) {
                        if( data.count>99 ) {
                            state.carCount = '99+';
                        } else {
                            state.carCount = data.count;
                        }
                    }
                }
            });
        },
    }
});


export default store;