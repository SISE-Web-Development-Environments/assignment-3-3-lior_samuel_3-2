
<template>
    <div class="familyPageDiv">
        <b-container>
            <div class="jumbotron">
                <h1 class="title">{{ this.$root.store.username }} My Family Recipes</h1>
                <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
                {{ !$root.store.username }}

                <RecipePreviewList v-if="personalRecipes.length > 0" :numberInColumn="3" :recipes="personalRecipes" type="myRecipe"></RecipePreviewList>
                <RecipePreviewList class="title" v-else> Family Recipes list is empty</RecipePreviewList>
            </div>
        </b-container>
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
                personalRecipes: [],
            }
        },
        async created(){
            try {
                const responseData = await this.axios.get(
                    this.$root.store.baseUrl + "/users/familyrecipes",

                );
                if(responseData.status == 401)
                {
                    this.$root.store.logout();
                    this.$router.push("/login");
                }
                else
                {
                    this.personalRecipes = responseData.data;
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
</script>

<style>
    .familyPageDiv{
        text-align: center;
        background-size: cover;
        background-image: url("../pictures/background.jpg");
    }
</style>