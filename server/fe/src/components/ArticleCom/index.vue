<template>
    <div class="index">
        <div class="index-left">
            <ArticleCard></ArticleCard>
        </div>
        <div class="index-right">
            <Right></Right>
        </div>
    </div>
</template>

<script>
import ArticleCard from '../ArticleCard';
import Right from './right';
export default {
    data() {
        return {

        }
    },
    components: {
        ArticleCard,
        Right
    }
}
</script>

<style scoped>
.index {
    display: flex;
    flex-direction: row;
}
.index-left {
    flex: 1;
}
</style>
