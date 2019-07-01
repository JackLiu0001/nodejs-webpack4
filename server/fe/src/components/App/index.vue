<template>
    <div style="width: 100%;height: 100%;background: #f6f6f6;">
        <div class="page__parent" v-if="isLogin">
            <Nav></Nav>
            <div class="main__box">
                <router-view>
                </router-view>
            </div>
        </div>
        <div v-if="!isLogin" style="width: 100%;height: 100%;">
            <Login></Login>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import qs from 'qs';
    import Login from '../Login';
    import Nav from '../Nav';
    import store from 'rootPath/store/';
    import { mapState, mapMutations } from 'vuex';
    export default ({
        data() {
            return {
                
            }
        },
        computed: mapState({
            isLogin: state => state.isLogin
        }),
        components: {
            Login,
            Nav
        }
    })
</script>
<style scoped>
    @import '../../css/common/variable.css';
    @import './index.css';
</style>