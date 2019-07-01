<template>
    <div class="login-page">
        <div class="login-con">
            <div class="user__modal-item">
                <p class="item-text">用户名：</p>
                <el-input v-model="username" placeholder="请输入用户名"></el-input>
            </div>
            <div class="user__modal-item">
                <p class="item-text">密码：</p>
                <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
            </div>
            <div class="user__model-btn">
                <el-button @click="loginHandler" type="primary">登录</el-button>
                <el-button @click="registerHandler" type="primary">注册</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import qs from 'qs';
import { mapState, mapMutations } from 'vuex';
import Urls from 'jspath/common/urls';
export default {
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        ...mapMutations([
            'authenticatedHandler'
        ]),
        registerHandler() {
            axios({
                method: 'post',
                url: Urls.registerApi,
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify({
                    userName: this.username,
                    password: this.password
                })
            }).then(res => {
                this.isShowModal = false;
                if (res.status !=200) {
                    this.$message('网络错误，请检查网络！');
                }
                let data = res.data;
                if (data.statusCode == 1001) {
                    this.$message('注册成功');
                    this.isShowModal = false;
                } else if(data.statusCode == 1000) {
                    this.$message('已用该用户');
                } else {
                    this.$message('注册失败');
                }
            });
        },
        loginHandler() {
            axios({
                method: 'post',
                url: Urls.loginInApi,
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify({
                    userName: this.username,
                    password: this.password
                })
            }).then(res => {
                if (res.status !=200) {
                    this.$message('网络错误，请检查网络！');
                    return;
                }
                let data = res.data;
                if (data.statusCode == 1000) {
                    this.$message('登录成功');
                    this.isShowModal = false;
                    this.authenticatedHandler(true);
                    return;
                } else if(data.statusCode == 1002) {
                    this.$message('密码错误');
                    this.authenticatedHandler(false);
                } else if(data.statusCode == 1001) {
                    this.$message('请先注册');
                    this.authenticatedHandler(false);
                }
            });
        }
    }
}
</script>
<style scoped>
    .login-page {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
    }
    .login-con {
        width: 400px;
        height: 300px;
        background: #fff;
        /* border: 1px solid black; */
        border-radius: 6px;
        box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
        padding: 20px;
    }
    .user__modal-item {
        margin-bottom: 20px;
    }
    .item-text {
        margin-bottom: 8px;
    }
    .user__model-btn {
        display: flex;
    }
    .user__model-btn button {
        flex: 1;
    }
</style>
