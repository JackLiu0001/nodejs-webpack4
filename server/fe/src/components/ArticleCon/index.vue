<template>
    <div>
        <div class="article-info article-title">
            {{ conData.title }}
        </div>
        <div class="article-info">
            <span style="margin-right: 15px;">{{ `作者: ${conData.author}` }}</span>
            <span style="margin-right: 15px;">{{ `时间: ${articleDate}` }}</span>
            <span style="margin-right: 15px;" v-if="conData.label">{{ `类型: ${conData.label}` }}</span>
        </div>
        <div class="article-info article-main" v-html="conData.articleBody">
        </div>
        <div class="comments-list">
            <div class="comments-title">
                {{ commentData.length }}条评论
            </div>
            <div class="comments-con" v-for="item in commentData">
                {{ item && item.content || '' }}
            </div>
        </div>
        <WriteComments></WriteComments>
    </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import { mapState, mapMutations } from 'vuex';
import Urls from 'jspath/common/urls';
import { getCookie, changeNum } from 'jspath/common/utils';
import WriteComments from './writeComments.vue';
export default {
    data() {
        return {
            conData: {},
            topic_id: '',
            commentData: []
        }
    },
    components: {
        WriteComments
    },
    computed: {
        articleDate() {
            if (!this.conData.lastUpdateDate) return null;
            let date =  new Date(this.conData.lastUpdateDate);
            let year = changeNum(date.getFullYear());
            let month = changeNum(date.getMonth());
            let day = changeNum(date.getDate());
            return `${year}-${month}-${day}`;
        }
    },
    mounted() {
        this.topic_id = this.$route.query._id;

        // 获取文章
        axios({
            method: 'post',
            url: Urls.getOneArticleApi,
            data: qs.stringify({
                _id: this.topic_id
            })
        }).then((res) => {
            if (res.status !=200) {
                this.$message('网络错误，请检查网络！');
                return;
            }
            this.conData = res.data && res.data.data || {};
        });

        this.getComments();
    },
    methods: {
        getComments() {

            // 获取评论
            return axios({
                method: 'post',
                url: Urls.getCommentsApi,
                data: qs.stringify({
                    topic_id: this.topic_id
                })
            }).then((res) => {
                if (res.status !=200) {
                    this.$message('网络错误，请检查网络！');
                    return;
                }
                this.commentData = res.data && res.data.data || [];
            });
        }
    }
}
</script>

<style>
.article-title {
    text-align: center;
    margin-bottom: 10px;
}
.article-info {
    text-align: center;
    margin-bottom: 10px;
}
.article-main {
    text-align:left;
    box-shadow: 0px 2px 10px 5px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
    margin-bottom: 20px;
    padding: 15px;
    word-break: break-all;
    word-wrap: break-word;
}
.comments-title {
    border-bottom: 2px solid rgba(0,0,0,0.09);
    line-height: 30px;
}
.comments-con {
    padding: 10px;
    border-bottom: 1px solid rgba(0,0,0,0.09);
}
.comments-list {
    margin-bottom: 20px;
}
</style>
