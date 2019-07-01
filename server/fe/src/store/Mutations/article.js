export default {
    articleDataHandler(state, data) {
        state.articleData = data.data || [];
        state.articleTotal = data.total || 0;
        state.currentPage = parseInt(data.currentPage || 1);
    },
    changeArticleTypeHandler(state, data) {
        state.articleType = data;
    },
    changeArticleThankHandler(state, data) {
        let { index = '', boolean } = data;
        state.articleData[index].isThank = boolean;
    },
    changeArticlePraiseHandler(state, data) {
        let { index = '', boolean } = data;
        state.articleData[index].isPraise = boolean;

        if (boolean) {
            state.articleData[index].praiseTotal++;
        } else {
            state.articleData[index].praiseTotal--;
        }
    },
    changeArticleNotPraiseHandler(state, data) {
        let { index = '', boolean } = data;
        state.articleData[index].isNotPraise = boolean;

        if (boolean) {
            state.articleData[index].notPraiseTotal++;
        } else {
            state.articleData[index].notPraiseTotal--;
        }
    },
}