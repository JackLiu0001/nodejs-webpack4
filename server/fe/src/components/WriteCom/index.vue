<template>
    <div>
        <div class="title-box">
            <textarea class="the-title" v-model="title" placeholder="标题" />
            <el-button class="title-publish" @click="publishArticleHandler">发布</el-button>
            <el-select class="title-lable" v-model="label" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="con-item">
            <p class="article-tips">摘要(最多140个字)</p>
            <el-input type="textarea" class="abstract" maxlength="140" v-model="abstract"></el-input>
        </div>
        <div class="con-item">
            <p class="article-tips">正文</p>
            <div ref="editor" style="text-align:left"></div>
        </div>
    </div>
</template>

<script>
import E from "wangeditor";
import axios from 'axios';
import qs from 'qs';
import { mapState, mapMutations } from 'vuex';
import Urls from 'jspath/common/urls';
import { getCookie } from 'jspath/common/utils';
export default {
    name: "editor",
    data() {
        return {
            editorContent: "",
            title: '',
            abstract: '',
            editor: null,
            options: [
                {
                    value: '技术',
                    label: '技术'
                }, 
                {
                    value: '生活',
                    label: '生活'
                }, 
                {
                    value: '爱好',
                    label: '爱好'
                }
            ],
            label: '技术'
        };
    },
    methods: {
        getContent: function() {
            alert(this.editorContent);
        }
    },
    mounted() {
        this.editor = new E(this.$refs.editor);
        this.editor.customConfig.onchange = html => {
            this.editorContent = html;
        };
        this.editor.create();
    },
    methods: {
        publishArticleHandler() {
            const self = this;
            if (!self.title) {
                this.$message('请输入标题！');
                return;
            }
            if (!self.abstract) {
                this.$message('请输入摘要！');
                return;
            }
            if (!self.editorContent) {
                this.$message('请输入正文！');
                return;
            }
            if (!self.label) {
                this.$message('请选择标签！');
                return;
            }
            axios({
                method: 'post',
                url: Urls.articleApi,
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify({
                    title: self.title,
                    abstract: self.abstract,
                    author: getCookie('userName'),
                    label: self.label,
                    articleBody: self.editorContent,
                    // createDate: '',
                    // lastUpdateDate: '',
                    // praise: '',
                    // notPraise: ''
                })
            }).then(res => {
                if (res.status !=200) {
                    this.$message('网络错误，请检查网络！');
                }
                let data = res.data;
                if (res.data.statusCode == 1000) {
                    this.$message({
                        message: '文章发布成功！',
                        type: 'success'
                    });

                    // 清空内容
                    this.editor.txt.clear();
                    this.title = '';
                    this.abstract = '';
                } else {
                    this.$message('文章发布失败！');
                }
            });
        }
    }
};
</script>

<style>
.title-box {
    position: relative;
    text-align: center;
    margin-bottom: 20px;
}
.the-title {
    height: 50px;
    font-size: 24px;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    background: rgb(246, 246, 246);
    width: 600px;
}
.title-publish {
    position: absolute;
    right: 0;
}
.title-lable {
    width: 100px;
    position: absolute;
    right: 80px;
}
.abstract {
    width: 100%;
    height: 60px;
    /* border: 1px solid rgba(0, 0, 0, 0.08); */
}
.article-tips {
    margin-bottom: 8px;
    padding: 0 10px;
}
.con-item {
    margin-bottom: 10px;
}
</style>
