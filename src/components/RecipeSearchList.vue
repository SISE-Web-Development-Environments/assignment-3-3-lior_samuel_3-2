<template>
    <b-container>
        <b-col>
            <b-row v-for="recipe in recipes" :key="recipe.id">
                <RecipePreview class="recipePreview" :recipe="recipe" />
            </b-row>
        </b-col>
    </b-container>
</template>

<script>
    import RecipePreview from "../components/RecipePreview";

    export default {
        name: "RecipesSearchList",
        components: {
            RecipePreview
        },
        props: {
            recipes:{
                type: Array
            },
            title: {
                type: String,
                required: true
            }

        },
    };
</script>

<style lang="scss" scoped>
    .container {
        min-height: 400px;
    }
</style>