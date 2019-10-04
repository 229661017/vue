<template>
  <el-container>
    <el-main>
      <el-form :model="loginForm" ref="loginForm" :rules="rules"
               @submit.native.prevent
               label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">{{ label.title }}</h3>
        <!--用户名-->
        <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username" :placeholder="label.placeholder.username" auto-complete="off"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" :placeholder="label.placeholder.password" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">{{ label.btn.remember }}</el-checkbox>
        <!--登录按钮-->
        <el-form-item >
          <el-button type="primary" class="btn" :loading="loading" native-type="submit" @click.native.prevent="login">
            {{ label.btn.loginBtn }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<!--
https://github.com/xiahuahua/vue-admin-demo/blob/master/src/views/Login.vue
https://xiahuahua.github.io/vue-admin-demo/#/login
-->
<script>
import $requestAPI from '../api/index';
import {getToken, setToken, resetTokenAndClearUser} from '../utils/token'
export default {
  name: 'Login',
  data: function () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      checked: true,
      loading: false,
      label: {
        title: '后台管理系统',
        placeholder: {
          username: '用户名',
          password: '密码'
        },
        btn: {
          loginBtn: '登录',
          remember: '记住密码'
        }
      },
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: '请输入登录用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      const token = getToken();
      if (token != null && token.trim().length !== 0) {
        $requestAPI.currentUserByToken(token).then(data => {
          this.$router.push('/index');
        }).catch(function (error) {
          if (error.response && error.response.data && error.response.data.code === 401) {
            resetTokenAndClearUser();
          }
        });
      }
    })
  },
  methods: {
    /**
     * 登录，登录成功后跳转首页
     */
    login (ev) {
      let _formName = 'loginForm';
      this.loading = true;
      this.label.btn.loginBtn = '登录中...';
      this.$refs[_formName].validate((valid) => {
        if (valid) {
          let _params = this.$qs.stringify(this.loginForm);
          $requestAPI.requestLogin(_params).then(data => {
            setToken(data.token);
            this.$router.push('/');
          }).catch(error => {
            console.log(error.response);
          }).finally(() => {
            this.loading = false;
            this.label.btn.loginBtn = '登录';
          });
        } else {
          this.loading = false;
          console.info('表单验证未通过！...');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped src="../assets/common/css/Login.css" />
<style scoped>

</style>
