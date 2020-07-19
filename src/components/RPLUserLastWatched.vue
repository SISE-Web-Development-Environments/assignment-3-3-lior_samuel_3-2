<template>
    <b-container class="container">
        <h3>User Last Watched Recipes</h3>

        <b-col>
            <b-col v-for="r in recipesLastList" :key="r.id">
                <RecipePreview class="recipePreview" :recipe="r" />
                <br>
            </b-col>
        </b-col>
    </b-container>

</template>

<script>
    import RecipePreviewList from "../components/RecipePreviewList";
    import RecipePreview from "../components/RecipePreview";
    export default {
        components: {
            //RecipePreviewList
            RecipePreview
        },
        data() {
            return {
                recipesLastList: []
            };
        },
        mounted() {
            this.updateRecipes();
        },
        methods: {
            async updateRecipes() {
                try {
                    // ------------------- Because of API limits - we will activate it after testing -------------------
                    const responseData = await this.axios.get(
                        "http://localhost:3000/lastWatchedRecipes/"+this.$root.store.username,
                        {params: {numberOfResults: 3}}
                    );
                    // const WId = responseData.data;
                    // const responsePreview = await this.axios.get(
                    //     this.$root.store.baseUrl + "/recipes/preview",
                    //     {
                    //         params: {ids: JSON.stringify(WId)}
                    //     });
                    // let recipes = responsePreview.data;
                    this.recipesLastList = responseData.data;
                    console.log("=============================");
                    console.log(responseData.data);
                    console.log("=============================");
                    //------------------- Because of API limits -------------------
                    // const recipes = [
                    //   {
                    //     recipeId: 633067,
                    //     name: "Authentic Biscochitos",
                    //     image: "https://spoonacular.com/recipeImages/633067-556x370.jpg",
                    //     readyInMinutes: 45,
                    //     likes: 11,
                    //     vegetarian: true,
                    //     vegan: false,
                    //     glutenFree: false
                    //   },
                    //   {
                    //     recipeId: 661340,
                    //     name: "Spinach Salad with Strawberry Vinaigrette",
                    //     image: "https://spoonacular.com/recipeImages/661340-556x370.jpg",
                    //     readyInMinutes: 45,
                    //     likes: 15,
                    //     vegetarian: false,
                    //     vegan: false,
                    //     glutenFree: true
                    //   },
                    //   {
                    //     recipeId: 641223,
                    //     name: "Damn Good Corn Pudding ~from 12 Bones Smokehouse",
                    //     image: "https://spoonacular.com/recipeImages/641223-556x370.jpg",
                    //     readyInMinutes: 45,
                    //     likes: 19,
                    //     vegetarian: false,
                    //     vegan: false,
                    //     glutenFree: false
                    //   }
                    // ];
                    // this.recipes = recipes;
                    // ----------------------------------------------------------
                    // console.log(recipes);
                    // this.recipes = [];
                    // this.recipes.push(...recipes);
                    // console.log(this.recipes);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };
</script>

<style>
</style>