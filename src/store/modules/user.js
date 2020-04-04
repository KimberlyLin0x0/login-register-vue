import { login,register } from '@/api/login'//引入登录 api 接口
//方案二：在这里面定义全局loading，只要请求就使用loading函数，方法调用结束就结束Loading，也行
const sha256 = require("js-sha256").sha256;
const user = {
  actions: {
    // 登录
    Login({ commit }, userInfo) { //定义 Login 方法，在组件中使用 this.$store.dispatch("Login") 调用
      const username = userInfo.username.trim()
      console.log(userInfo);
      return new Promise((resolve, reject) => { //封装一个 Promise
        login(username, userInfo.sha256(userInfo.password)).then(response => { //使用 login 接口进行网络请求
          commit('') //提交一个 mutation，通知状态改变
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          reject(error)
        })
      })
    },
    Register({ commit }, userInfo) { //定义 Register 方法，在组件中使用 this.$store.dispatch("Register") 调用
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => { //封装一个 Promise
        register(username, sha256(userInfo.password)).then(response => { //使用 register 接口进行网络请求
          commit('') //提交一个 mutation，通知状态改变
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          reject(error)
        })
      });
    },
  }
}
export default user