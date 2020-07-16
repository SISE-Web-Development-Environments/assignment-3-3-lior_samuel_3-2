<template>
    <div>
        <h1 class="title">{{ this.$root.store.username }} Favorites Recipes</h1>
        <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
        {{ !$root.store.username }}

        <RecipePreviewList v-if="userRecipesArray.length > 0" :numberInColumn="3" :recipes="userRecipesArray"></RecipePreviewList>
        <RecipePreviewList class="title" v-else> Liked Recipes list is empty - No Liked Recipes</RecipePreviewList>
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
                userRecipesArray: [],
            }
        },
        async created(){
            try {
                const ResponseData = await this.axios.get(
                    this.$root.store.baseUrl + "/users/favorites",
                );
                console.log(ResponseData.data);
                if(ResponseData.data.length > 0)
                {
                    const response = await this.axios.get(
                        this.$root.store.baseUrl + "/recipes/preview",
                        {
                            params: {ids: JSON.stringify(ResponseData.data)}
                        });
                    if(response.status == 401)
                    {
                        this.$root.store.logout();
                        this.$router.push("/login");
                    }
                    else
                    {
                        console.log(response.data);
                        this.userRecipesArray = response.data;
                    }
                }

            } catch (err) {
                console.log(err);
            }
        }
    }
</script>

<style>
</style>