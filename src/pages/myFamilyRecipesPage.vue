
<template>
    <div class="familyPageDiv">
        <b-container>
            <div class="jumbotron">
                <h1 class="title">{{ this.$root.store.username }} My Family Recipes</h1>
                <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
                {{ !$root.store.username }}

                <div v-if="personalRecipes.length > 0">
                    <b-container>
                        <b-row>
                            <b-col v-for="r in personalRecipes" :key="r.id">
                                <RecipePreviewFamily class="RecipePreviewFamily" :recipe="r" />
                            </b-col>
                        </b-row>
                    </b-container>
                </div>
                <div v-else>
                    family Recipes list is empty - No family Recipes
                </div>
            </div>
        </b-container>
    </div>

</template>

<script>

    import RecipePreviewFamily from "../components/RecipePreviewFamily";
    export default {
        components: {
            RecipePreviewFamily,
        },
        data() {
            return {
                personalRecipes: [],
            }
        },
        async created(){
            try {
                const responseData = await this.axios.get(
                    "http://localhost:3000/familyRecipes/"+this.$root.store.username,

                );
                if(responseData.status == 401)
                {
                    this.$root.store.logout();
                    this.$router.push("/login");
                }
                else
                {
                    this.personalRecipes = responseData.data;
                    // console.log("----------------------------------------------")
                    // console.log(responseData.data);
                    // console.log("----------------------------------------------")
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