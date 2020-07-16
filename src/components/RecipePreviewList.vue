<template>
  <b-container>
    <h3 style="text-align: center;">
      <span v-if="title">{{ title }}:</span>
    </h3>

    <div v-if="recipes.length > 0">
      <b-row :cols="columLen">
        <b-col v-for="r in recipes" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" />
        </b-col>
      </b-row>
    </div>

    <div v-else>
      No Recipes
    </div>

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
        required: false
      },
      columLen: {
        type: Number,
        required: true
      },
      recipes: [],
    },
    methods: {

    }
  };
</script>

<style lang="scss" scoped>
  .container {
    min-height: 400px;
  }
</style>