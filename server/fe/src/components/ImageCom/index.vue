<template>
    <div class="img__com clearfix">
        <div v-for="item in imgData" class="img__com-item pull-left">
            <!-- <img :src="item.url" /> -->
            <div class="img-item" :style="{'backgroundImage': 'url(' + item.url + ')'}"></div>
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
                imgData: []
            }
        },
        mounted() {
            const self = this;
            axios({
                method: 'post',
                url: Urls.getImagesApi,
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            }).then(res => {
                if (res.status !=200) {
                    this.$message('网络错误，请检查网络！');
                }
                let data = res.data;
                self.imgData = data.data;
                console.log('loginoutData', data);
            });

            // webpack-api-mocker 的api
            // axios({
            //     method: 'get',
            //     url: Urls.testApi,
            //     headers: { 'content-type': 'application/x-www-form-urlencoded' }
            // }).then(res => {
            //     // debugger;
            //     if (res.status !=200) {
            //         this.$message('网络错误，请检查网络！');
            //     }
            //     let data = res.data;
            //     console.log('loginoutData', data);
            //     if (data.statusCode == 1000) {
            //         this.authenticatedHandler(false);
            //     }
            // });
        },
    }
</script>
<style scoped>
    .img__com-item {
        width: 300px;
        height: 300px;
        border: 1px solid #ccc;
        margin-left: 20px;
        margin-bottom: 20px;
        text-align: center;
        line-height: 300px;
    }
    .img-item {
        width: 100%;
        height: 100%;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>