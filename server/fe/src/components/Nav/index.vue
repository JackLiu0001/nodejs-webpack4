<template>
    <div class="page__nav-box">
        <div class="page__nav clearfix">
            <router-link class="page__nav-item" to="/pageIndex">首页</router-link>
            <!-- <router-link class="page__nav-item" to="/imageNav">图片</router-link> -->
            <router-link class="page__nav-item" to="/articleNav">文章</router-link>
            <!-- <router-link class="page__nav-item" to="/admin">后台</router-link> -->
            <UserInfo class="pull-right"></UserInfo>
        </div>
    </div>
</template>

<script>
import UserInfo from '../UserInfo';
export default {
    data() {
        return {

        }
    },
    components: {
        UserInfo
    }
}
</script>

<style scoped>
@import '../../css/common/variable.css';
.page__nav-box {
    width: 100%;
    background: #fafafa;
    box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
}
.page__nav {
    width: $pageWidth;
    height: 60px;
    margin: 0 auto;
}
.page__nav-item {
    position: relative;
    top: 10px;
    display: inline-block;
    color: #757575;
    font-size: 18px;
    padding: 0 8px;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    /* border: 1px solid black; */
}
.page__nav-item:hover {
    background: #F3F3F3;
}
.main__box {
    width: $pageWidth;
    margin: 0 auto;
}
</style>
