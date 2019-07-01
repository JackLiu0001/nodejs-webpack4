<template>
    <div>
        <input type="file" ref="imgInp" name="imageupload" accept=".jpg, .jpeg, .png" />
        <button @click="uploadHandler">上传</button>
    </div>
</template>
<style>
</style>
<script>
    import axios from 'axios';
    import qs from 'qs';
    import Urls from 'jspath/common/urls';
    export default {
        data() {
            return {

            }
        },
        methods: {
            uploadHandler() {
                var newFormData = new FormData();
                console.log(this.$refs.imgInp.value);
                console.log('0', this.$refs.imgInp.files[0]);
                newFormData.append('file', this.$refs.imgInp.files[0]);
                newFormData.append('name', 'liushaofei');
                console.log('newFormData', newFormData);



                var formData2 = new FormData();
                formData2.append('name', 'liushaofei');
                console.log('formData2', formData2.values());


                axios({
                    method: 'post',
                    url: Urls.singleUploadImageApi,
                    // headers: { 'content-type': false },
                    data: newFormData
                }).then(res => {
                    if (res.status !=200) {
                        this.$message('网络错误，请检查网络！');
                    }
                    let data = res.data;
                    console.log('datadata', data);
                });
            }
        }
    }
</script>