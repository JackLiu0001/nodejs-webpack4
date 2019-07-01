<template>
    <div class="clearfix user-info__box">
        <div class="user-info">
            <span v-if="isLogin">用户名</span>
            <span class="user-info__operation" v-if="isLogin" @click="loginOutHandler">退出</span>
            <span class="user-info__operation" v-if="!isLogin" @click="loginInHandler">登录</span>
            <span class="user-info__operation" v-if="!isLogin" @click="registerHandler">注册</span>
        </div>
        <el-dialog 
            :title= "loginOrRegister ? '登录' : '注册'"
            :visible.sync="isShowModal"
        >
            <p class="user__modal-item">
                <span>用户名：</span>
                <input v-model="username" type="text" />
            </p>
            <p class="user__modal-item">
                <span>密码：</span>
                <input v-model="password" type="password" />
            </p>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShowModal = false">取 消</el-button>
                <el-button type="primary" @click="ok">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style scoped>
    .user-info {
        line-height: 60px;
    }
    .user-info__box .user-info__operation {
        cursor: pointer;
    }
    .user__modal-item {
        margin-bottom: 10px;
        padding-left: 60px;
    }
    .user__modal-item span {
        display: inline-block;
        width: 65px;
        text-align: right;
    }
    .user__modal-item input {
        width: 260px;
    }
</style>

<script>
    import axios from 'axios';
    import qs from 'qs';
    import { mapState, mapMutations } from 'vuex';
    import Urls from 'jspath/common/urls';
    export default {
        data () {
            return {
                isShowModal: false,
                username: '',
                password: '',
                loginOrRegister: 1,
                dialogFormVisible: false,
            }
        },
        computed: mapState({
            isLogin: state => state.isLogin
        }),
        methods: {
            ...mapMutations([
                'authenticatedHandler'
            ]),
            loginInHandler() {
                this.loginOrRegister = 1;
                this.isShowModal = true;
            },
            registerHandler() {
                this.loginOrRegister = 0;
                this.isShowModal = true;
            },
            loginOutHandler() {
                axios({
                    method: 'post',
                    url: Urls.loginOutApi,
                    headers: { 'content-type': 'application/x-www-form-urlencoded' }
                }).then(res => {
                    if (res.status !=200) {
                        this.$message('网络错误，请检查网络！');
                    }
                    let data = res.data;
                    console.log('loginoutData', data);
                    if (data.statusCode == 1000) {
                        this.authenticatedHandler(false);
                    }
                });
            },
            ok() {

                /**
                 *  登录
                 *  params: statusCode
                 *  1000:登录成功、1001：未注册、1002：已注册，未登录成功
                 */
                if (this.loginOrRegister) {
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

                /**
                 *  注册
                 *  params: statusCode
                 *  1000:注册成功、1001：注册失败
                 */
                } else {
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
                }
            },
            cancel () {
                // this.$message('Clicked cancel');
            }
        },
        mounted() {
        },
        updated() {
        }
    }
</script>