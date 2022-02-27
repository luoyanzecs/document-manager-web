import {createStore} from 'vuex'

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