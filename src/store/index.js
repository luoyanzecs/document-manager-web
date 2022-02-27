import {createStore} from 'vuex'

let lastNoticeStartTime = 0 // ms
let lastDelay = 0
const noticeAliveTime = 7000 // ms
const animationTime = 700 // ms

const getDelay = () => {
  let now = Date.now(), delay = 0
  if (lastNoticeStartTime === 0 || now - lastNoticeStartTime > animationTime) {
    delay = noticeAliveTime + animationTime
  }
  if (now - lastNoticeStartTime <=  animationTime ) {
    delay = lastDelay + animationTime
  }
  lastDelay = delay
  lastNoticeStartTime = now
  return delay
}

const store = createStore({
  state: {
    notificationQuene: [],
    userInfo: {
      name: '',
      avatar: '',
      id: '',
      bu: '',
      rank: 0
    }
  },
  mutations: {
    unshiftNotice (state, notice) {
      notice.delay = getDelay()
      state.notificationQuene.unshift(notice)
    },
    removeNotice (state, id) {
      state.notificationQuene = state.notificationQuene.filter(it => it.id !== id)
    },
    updateUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  }
})

export {store}