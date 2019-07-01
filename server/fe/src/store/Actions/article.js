import axios from 'axios';
import qs from 'qs';
import Urls from 'jspath/common/urls';
import { getCookie } from 'jspath/common/utils';
export default {
    getArticleAsync({ commit }, params) {
        let {context, page, count, label} = params;
        axios({
            method: 'post',
            url: Urls.getArticleApi,
            data: qs.stringify({
                page: page || 1,
                count: count || 10,
                label: label || ''
            })
        }).then(res => {
            if (res.status !=200) {
                context.$message('网络错误，请检查网络！');
                return;
            }
            commit('articleDataHandler', res.data || {});
        });
    }
}