<template>
    <div class="favoritesPageDiv">
        <b-container>
            <div class="jumbotron">
                <h1 class="title">{{ this.$root.store.username }} Favorites Recipes</h1>
                <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
                {{ !$root.store.username }}

                <div v-if="userRecipesArray.length > 0">
                    <b-container>
                        <b-row>
                            <b-col v-for="r in userRecipesArray" :key="r.id">
                                <RecipePreview class="recipePreview" :recipe="r" />
                            </b-col>
                        </b-row>
                    </b-container>
                </div>
                <div v-else>
                    Liked Recipes list is empty - No Liked Recipes
                </div>

<!--                <RecipePreviewList v-if="userRecipesArray.length > 0" :numberInColumn="3" :recipes="userRecipesArray"></RecipePreviewList>-->
<!--                <RecipePreviewList class="title" v-else> Liked Recipes list is empty - No Liked Recipes</RecipePreviewList>-->

            </div>
        </b-container>
    </div>

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
                userRecipesArray: [],
            }
        },
        async created(){
            try {
                const ResponseData = await this.axios.get(
                    "http://localhost:3000/getMyfavourite/"+this.$root.store.username,
                );
                console.log("----------------------------------------------")
                console.log(ResponseData.data);
                console.log("----------------------------------------------")
                this.userRecipesArray = ResponseData.data;
                // if(ResponseData.data.length > 0)
                // {
                //     const response = await this.axios.get(
                //         this.$root.store.baseUrl + "/recipes/preview",
                //         {
                //             params: {ids: JSON.stringify(ResponseData.data)}
                //         });
                //     if(response.status == 401)
                //     {
                //         this.$root.store.logout();
                //         this.$router.push("/login");
                //     }
                //     else
                //     {
                //         console.log(response.data);
                //         this.userRecipesArray = response.data;
                //     }
                // }

            } catch (err) {
                console.log(err);
            }
        }
    }
</script>

<style>
    .favoritesPageDiv{
        text-align: center;
        background-size: cover;
        background-image: url("../pictures/background.jpg");
    }
</style>