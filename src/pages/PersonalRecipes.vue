<template>
    <div>
        <h1 class="title">{{ this.$root.store.username }}  Recipes</h1>

        <RecipePreviewList v-if="myrecipes.length > 0" :numberInColumn="3" :recipes="myrecipes"></RecipePreviewList>
        <RecipePreviewList class="title" v-else> {{ this.$root.store.username }} Recipes list is empty!!!</RecipePreviewList>
    </div>
</template>

<script>
    import RecipePreviewList from "../components/RecipePreviewList";
    export default {
        components: {
            RecipePreviewList
        },
        data() {
            return {
                myrecipes: [],
            }
        }
    }
</script>

<style scoped>

</style>