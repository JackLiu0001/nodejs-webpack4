<template>
    <div class="comments">
        <div>
            <textarea v-model="comment"></textarea>
        </div>
        <p>
            <el-button type="primary" @click="writeCommentHandler">发布</el-button>
        </p>
    </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import { mapState, mapMutations } from 'vuex';
import Urls from 'jspath/common/urls';
import { getCookie, changeNum } from 'jspath/common/utils';
export default {
    data() {
        return {
            comment: '',
            topic_id: ''
        }
    },
    mounted() {
        this.topic_id = this.$route.query._id;
    },
    methods: {
        writeCommentHandler() {

            // 写评论
            axios({
                method: 'post',
                url: Urls.writeCommentsApi,
                data: qs.stringify({
                    topic_id: this.topic_id,
                    content: this.comment
                })
            }).then((res) => {
                if (res.status !=200) {
                    this.$message('网络错误，请检查网络！');
                    return;
                }
                if (res.data && res.data.statusCode == 1000) {
                    this.$parent.getComments().then(res => {
                        this.$message({
                            message: '评论成功！',
                            type: 'success'
                        });
                        this.comment = '';
                    });
                } else {
                    this.$message('发布评论失败，请重新尝试！');
                }
            });
        }
    }
}
</script>

<style scoped>
.comments {
    width: 100%;
    height: 200px;
    background: #ccc;
    text-align: center;
    padding-top: 20px;
}
textarea {
    width: 90%;
    height: 100px;
    border: none;
    margin-bottom: 20px;
}
</style>
