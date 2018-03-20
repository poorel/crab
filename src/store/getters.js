export default ({
  getCarts (state) {
    return state.carts
  },
  getLoding (state) {
    return state.loding
  },
  getPersonMsg (state, obj) {
    return state.personMsg
  },
  getUser (state, obj) {
    if (state.user.name) {
      return state.user
    } else {
      return false
    }
  }
})
