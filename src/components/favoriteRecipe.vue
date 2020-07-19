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
                    const response = await this.axios.get(
                        "http://localhost:3000/getMyfavourite/"+this.$root.store.username,
                        { withCredentials: true }
                    );
                    console.log("--------------------------");
                    console.log(response);
                    console.log("--------------------------");

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