
<template>
  <div class="containerDiv">
    <b-container class="container">
      <h1 class="title">Main Page</h1>
      <b-row>
        <b-col>
          <RecipePreviewListRandom title="Randome Recipes" />
        </b-col>
      </b-row>

      <b-row>
        <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
        {{ !$root.store.username }}
        <b-col v-if="$root.store.username">
          <RPLUserLastWatched class="RPLUserLastWatched" />
        </b-col>
      </b-row>

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
