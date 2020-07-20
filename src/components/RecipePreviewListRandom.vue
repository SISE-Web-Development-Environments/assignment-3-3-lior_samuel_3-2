<template>
    <b-container>
        <h3>
            {{ title }}:
            <slot></slot>
        </h3>
        <b-col>
            <b-col v-for="r in recipes" :key="r.id">
                <RecipePreview class="recipePreview" :recipe="r" />
                <br>
            </b-col>
        </b-col>
        <b-button  style="width:60px;display: block; margin-bottom: 2%; padding-top: 1.5%; padding-bottom: 1.5%; " class="mx-auto w-25" variant="primary" @click="updateRecipes">More Recipes</b-button>
    </b-container>
</template>

<script>
    import RecipePreview from "./RecipePreview.vue";
    export default {
        name: "RecipePreviewList",
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
                    const response = await this.axios.get(
                        //"https://test-for-3-2.herokuapp.com/recipes/random"
                        "http://localhost:3000/randomRecipes"
                    );

                    const recipes = response.data;
                    console.log("+++++++++++++++++++++++++");
                    console.log(recipes);
                    console.log("+++++++++++++++++++++++++");
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
