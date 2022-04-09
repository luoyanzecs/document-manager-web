import {createStore} from 'vuex'

let lastNoticeStartTime = 0 // ms
let lastDelay = 0
const noticeAliveTime = 5000 // ms
const animationTime = 300 // ms

const getDelay = ()=> {
  const now = Date.now()
  let delay = 0
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


export const store = createStore({
  state() {
    return {
      notificationQuene: [],
      userInfo: {
        name: '',
        avatar: '',
        id: '',
        bu: '',
        rank: 0,
        role: ''
      }
    }
  },
  mutations: {
    unshiftNotice (state, notice) {
      notice.delay = getDelay()
      state.notificationQuene.unshift(notice)
      state.notificationQuene.splice(6)
    },
    removeNotice (state, id) {
      state.notificationQuene = state.notificationQuene.filter(it => it.id !== id)
    },
    updateUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  }
})