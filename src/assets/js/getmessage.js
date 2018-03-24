function getOrderList (bindthis) {
  let user = bindthis.$router.history.current.query.user
  bindthis.$http.get(`http://47.94.107.160:8888/orders?phonecode=${user}&type=3`).then((res) => {
    bindthis.orderlist = res.data
  }).catch((res) => {
    console.log(res)
  })
}

// 获取地址
function getAddress (bindthis) {
  let user = bindthis.$router.history.current.query.user
  bindthis.$http.get(`http://47.94.107.160:8888/address?phonecode=${user}&type=3`).then((res) => {
    bindthis.address = res.data
  }).catch((res) => {
    console.log(res)
  })
}


export {
  getAddress,
  getOrderList,
}
