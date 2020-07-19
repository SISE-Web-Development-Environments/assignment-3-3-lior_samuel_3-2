<template>
    <router-link
            :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
            class="recipe-preview"
    >
        <div class="recipe-body">
            <img v-if="image_load" :src="recipe.image" class="recipe-image" />
        </div>

        <div class="recipe-footer">
            <div :title="recipe.title" class="recipe-title">
                {{ recipe.title }}
            </div>
            <ul class="recipe-overview">
                <li >{{ recipe.readyInMinutes }} minutes</li>
                <li >{{ recipe.aggregateLikes }} likes</li>
            </ul>
            <ul class="recipe-overview">
                <li v-if="this.recipe.vegetarian">vegetarian</li>
                <li v-if="this.recipe.vegan"> vegan</li>
                <li v-if="this.recipe.glutenFree"> glutenFree</li>
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
      vegetarianFlag: false,
      veganFlag: false,
      glutenFreeFlag: false,
    };
  },
  methods: {
    toRecipeLink(){
      if(this.type == "normal")
      {
        return { name: 'recipe', params: { mode:"normal", recipeId: this.recipe.id } };
      }
      else if(this.type == "family")
      {
        return { name: 'recipe', params: { mode:"family", recipeId: this.recipe.id } };
      }
      else
      {
        return { name: 'recipe', params: { mode:"myRecipe", recipeId: this.recipe.id } };
      }
    }
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    type: {
      //can be normal, family or myRecipe. Defines the type of the recipe that is being previewed. Mostly used for routing to the right page
      type: String,
      required: true
    }

    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
  }
};
</script>

<style scoped>
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
