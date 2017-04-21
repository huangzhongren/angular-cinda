import Vue from 'vue'
import Vuex from 'vuex'
import ajax from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
	//状态集合
	state:{
		illogin: true,//没有进行登录操作
		validateTips :'',//验证页面信息
		logined:false,//登录状态
		cartNum:0,//购物车数量
		loginInfo:{}//登录信息
	},
	mutations:{
		SET_Illogin:(state,illogin)=>{
			state.illogin = illogin;
		},
		SET_TIPS:(state,validateTips)=>{
			state.validateTips = validateTips;
		},
		SET_LOGINED:(state,logined)=>{
			state.logined = logined;
		},
		GET_LOGIN:(state)=>{//获得登录状态
			ajax.post('/xinda-api/sso/login-info',{}).then(res=>{
				if(res.data.status==1){
					state.loginInfo = res.data.data;
					state.logined = true
					console.log(res.data.data)
				}else{
					state.logined = false
				}
			},err=>{
				console.log(err)
			})
		},
		GET_CART:(state)=>{//获得购物车数量
			ajax.post('/xinda-api/cart/cart-num',{}).then(res=>{
				if(res.data.status==1){
					state.cartNum = res.data.data.cartNum
				}else{
					console.log(res.data.msg)
				}
			},err=>{
				console.log(err)
			})
		}
		
	}, 
	//方法集合
	actions:{
		setIllogin:({commit},illogin)=>{
			commit('SET_Illogin',illogin)
		},
		setTips:({commit},validateTips)=>{
			commit('SET_TIPS',validateTips)
		},
		setLogined:({commit},logined)=>{
			commit('SET_LOGINED',logined)
		},
		getLogin:({commit})=>{
			commit('GET_LOGIN')
		},
		getCart:({commit})=>{
			commit('GET_CART')
		}
		
	},
	//获取状态
	getters:{
		illogin:state=>state.illogin,
		validateTips:state=>state.validateTips,
		validatePic:state=>state.validatePic,
		logined:state=>state.logined,
		cartNum:state=>state.cartNum,
		loginInfo:state=>state.loginInfo
	}
})