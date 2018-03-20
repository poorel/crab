import * as types from './type'

export default({
  adduser: ({commit, state}, val) => {
    commit(types.ADD_USER, val)
  },
  showLoading: ({commit, state}) => {
    commit(types.SHOW_LOADING)
  },
  hideLoading: ({commit, state}) => {
    commit(types.HIDE_LOADING)
  },
  addcarts: ({commit, state}, val) => {
    commit(types.ADD_CARTS, val)
  },
  deccarts: ({commit, state}, index) => {
    commit(types.DEC_CARTS, index)
  },
  sendMsg: ({commit, state}, obj) => {
    var a = 1
    state.personMsg.forEach(function (val) {
      if (val.name === obj.name) {
        // alert('帐号已存在')
        a = 0
      } else if (val.postbox === obj.postbox) {
        // alert('邮箱已被注册')
        a = 0
      }
    })
    if (a) {
      commit(types.SED_MSG, obj)
    }
  },
  getMsg: ({commit, state}, index) => {
    commit(types.DEC_CARTS, index)
  },
  clear: ({commit, state}) => {
    commit(types.CLEAR_ALL)
  },
  full: ({commit, state}, val) => {
    commit(types.FULL_ALL, val)
  }
})
