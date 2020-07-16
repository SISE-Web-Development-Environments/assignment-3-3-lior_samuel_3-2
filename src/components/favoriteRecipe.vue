<template>
    <b-container>
        <h3>
            {{ title }}:
            <slot></slot>
        </h3>
        <b-row>
            <b-col v-for="r in recipes" :key="r.id">
                <RecipePreview class="recipePreview" :recipe="r" />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import RecipePreview from "../components/RecipePreview";
    export default {
        name: "favoriteRecipe",
        components: {
            RecipePreview
        },
        props: {
            title: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                recipes: []
            };
        },
        mounted() {
            this.updateRecipes();
        },
        methods: {
            async updateRecipes() {
                try {
                    // "https://test-for-3-2.herokuapp.com/recipes/random" "https://test-for-3-2.herokuapp.com/profile/favorites"
                    const response = await this.axios.get(
                        "https://test-for-3-2.herokuapp.com/recipes/random",
                        { withCredentials: true }
                    );
                    const recipes = response.data.recipes;
                    this.recipes = [];
                    this.recipes.push(...recipes);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .container {
        min-height: 400px;
    }
</style>