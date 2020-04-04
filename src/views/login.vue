<template>
  <div>
    <el-card class="login-form-layout">
      <el-form
        autocomplete="on"
        :model="loginForm"
        ref="loginForm"
        label-position="left"
      >
        <div style="text-align: center">
          <!-- <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon> -->
        </div>
        <h2 class="login-title color-main">mall-admin-web</h2>
        <el-form-item prop="username">
          <el-input
            name="username"
            type="text"
            v-model="loginForm.username"
            autocomplete="on"
            placeholder="请输入用户名"
          >
            <span slot="prefix">
              <!-- <svg-icon icon-class="user" class="color-main"></svg-icon> -->
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :type="pwdType"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.password"
            autocomplete="on"
            placeholder="请输入密码"
          >
            <span slot="prefix">
              <!-- <svg-icon icon-class="password" class="color-main"></svg-icon> -->
            </span>
            <span slot="suffix" @click="showPwd">
              <!-- <svg-icon icon-class="eye" class="color-main"></svg-icon> -->
            </span>
          </el-input>
        </el-form-item>
        
        <el-form-item style="margin-bottom: 100px">
              <el-row>
                <el-button-group style="margin-bottom:100px">
                  <el-button
                    style="width: 150px"
                    type="primary"
                    :loading="loading1"
                    @click.native.prevent="handleLogin">
                    登录
                  </el-button>
                  
                  <el-button
                    style="width: 150px"
                    type="primary"
                    :loading="loading2"
                    @click.native.prevent="handleRegister">
                    注册
                  </el-button>
              </el-button-group>
            </el-row>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loading1: false,
      loading2: false,
      pwdType: "password",
    };
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading1 = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(response => {
              this.loading1 = false;
              let code = response.data.code;
              if (code == 200) {
                this.$router.push({
                  path: "/success",
                  query: { data: response.data.data }
                });
              } else {
                this.$router.push({
                  path: "/error",
                  query: { message: response.data.message }
                });
              }
            })
            .catch(() => {
              this.loading1 = false;
            });
        } else {
          // eslint-disable-next-line no-console
          console.log("参数验证不合法！");
          return false;
        }
      });
    },


     handleRegister() {
       let _this =this;
      _this.$refs.loginForm.validate(valid => {
        if (valid) {
          _this.loading2 = true;
          _this.$store
            .dispatch("Register", _this.loginForm)
            .then(response => {
              _this.loading2 = false;
              let code = response.data.code;
              if (code == 200) {
                _this.$router.push({
                  path: "/success",
                  query: { data: response.data.data }
                });
              } else {
                _this.$router.push({
                  path: "/error",
                  query: { message: response.data.message }
                });
              }
            })
            .catch(() => {
              _this.loading2 = false;
            });
        } else {
          // eslint-disable-next-line no-console
          console.log("参数验证不合法！");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #409eff;
}

.login-title {
  text-align: center;
}

.login-center-layout {
  background: #409eff;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}
</style>
