import * as types from './type'
export default {
  [types.ADD_USER]: (state, obj) => {
    state.user.name = obj
  },
  [types.SHOW_LOADING]: (state) => {
    state.loding = true
  },
  [types.HIDE_LOADING]: (state) => {
    state.loding = false
  },
  [types.ADD_CARTS]: (state, obj) => {
    var a = 1
    if (!state.user.commodity) {
      state.user.commodity = []
    }
    state.user.commodity.forEach(function (val) {
      if (val.single == obj.single) {
        val.number += obj.number// vuex
        window.localStorage.setItem(state.user.name, JSON.stringify(state.user.commodity))// 本地数据
        a = 0
      }
    })
    if (a) {
      state.user.commodity.push(obj)
      window.localStorage.setItem(state.user.name, JSON.stringify(state.user.commodity))// 本地数据
    };
  },
  [types.DEC_CARTS]: (state, id) => {
    var newindex = 0
    state.user.commodity.forEach(function (val, index) {
      if (parseInt(val.single) == id) {
        newindex = index
      }
    })
    state.user.commodity.splice(newindex, 1)
    window.localStorage.setItem(state.user.name, JSON.stringify(state.user.commodity))// 本地数据
  },
  [types.SED_MSG]: (state, obj) => {
    state.personMsg.push(obj)
  },
  [types.CLEAR_ALL]: (state) => {
    state.user.commodity = []
  },
  [types.FULL_ALL]: (state, val) => {
    state.user.commodity = val
  }
}
