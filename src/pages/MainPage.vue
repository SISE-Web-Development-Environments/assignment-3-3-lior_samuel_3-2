
<template>
  <div class="MainPageDiv">
    <b-container class="container">
      <div class="jumbotron">
        <h1 class="title">Main Page</h1>

        <b-row>
          <b-col>
            <RecipePreviewListRandom title="Explore these recipes" />
          </b-col>

          <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
<!--          {{ !$root.store.username }}-->
          <b-col v-if="$root.store.username">
            <RPLUserLastWatched  title="Last watched recipes" class="RPLUserLastWatched" />
          </b-col>
        </b-row>

      </div>
    </b-container>
  </div>
</template>


<script>
import RecipePreviewListRandom from "../components/RecipePreviewListRandom";
import RPLUserLastWatched from "../components/RPLUserLastWatched";
export default {
  components: {
    RecipePreviewListRandom,
    RPLUserLastWatched
  }
};
</script>

<style lang="scss" scoped>
  .MainPageDiv{
    text-align: center;
    background-size: cover;
    background-image: url("../pictures/background.jpg");
  }

.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
