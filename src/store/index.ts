import {createStore} from 'vuex'

let lastNoticeStartTime = 0 // ms
let lastDelay = 0
const noticeAliveTime = 5000 // ms
const animationTime = 300 // ms

const getDelay = (): number => {
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

export interface Notice {
  message: string,
  type: string,
  id: string,
  delay: number
}

export interface UserInfo {
  name: string,
  avatar: string,
  id: string,
  bu: string,
  rank?: number
}

export interface State {
  notificationQuene: Notice[],
  userInfo: UserInfo
}

export const store = createStore<State>({
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
    unshiftNotice (state, notice:Notice) {
      notice.delay = getDelay()
      state.notificationQuene.unshift(notice)
      state.notificationQuene.splice(6)
    },
    removeNotice (state, id: string) {
      state.notificationQuene = state.notificationQuene.filter(it => it.id !== id)
    },
    updateUserInfo (state, userInfo:UserInfo) {
      state.userInfo = userInfo
    }
  }
})