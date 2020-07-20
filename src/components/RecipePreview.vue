<template>
    <router-link
            :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
            class="recipe-preview"
    >
        <div class="recipe-body">
            <img  :src="recipe.image" class="recipe-image" />
        </div>

        <div class="recipe-footer">
            <div :title="recipe.title" class="recipe-title">
                {{ recipe.title }}
            </div>
            <ul class="recipe-overview">
                <li > <img class="imageSign" src="../assets/clock_images.jpg"/> {{ recipe.readyInMinutes }} minutes</li>
                <li > <img class="imageSign" src="../assets/Like-Button-PNG.png"/> {{ recipe.aggregateLikes }} likes</li>
            </ul>
            <ul class="recipe-overview">
                <li v-if="this.recipe.vegetarian"> <img class="imageSign" src="../assets/vegetarian-image.png"/>vegetarian</li>
                <li v-if="this.recipe.vegan"> <img class="imageSign" src="../assets/vegan_image.jpg"/> vegan</li>
                <li v-if="this.recipe.glutenFree"> <img class="imageSign" src="../assets/gluten-free-image.png"/> glutenFree</li>

                <li v-if="this.isWatched"> <img class="imageSign" src="../assets/eye_image.png"/> seem</li>
                <li v-if="!this.isWatched"> <img class="imageSign" src="../assets/not_seen_image.png"/> not Seen</li>

            </ul>
        </div>
    </router-link>
</template>

<script>
export default {
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });

  },
  data() {
    return {
      image_load: false,
      isWatched: false,
      isLiked: false,
    };
  },
  methods: {
      async searchRecipes() {
          try {
              this.axios.defaults.withCredentials=true;

              const response = await this.axios.get(
                  "http://localhost:3000/isWatched"+
                  +this.$root.store.username+
                  "/"+this.recipe.id,
                  {
                      params: {
                          username: this.$root.store.username,
                          id: this.recipe.id,
                      },
                  },
              );
              console.log("=====================")
              console.log("anser: " )
              console.log("=====================")
              if(response.data==1){
                  this.isWatched=true;
              }
              else{
                  this.isWatched=false;
              }
          } catch (error) {
              console.log(error);
          }
      },
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },

  }
};
</script>

<style scoped>
    .imageSign{
        height: 25px;
        width: auto;
        margin-top: 10px;
    }
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: 200px;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 14pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
</style>
