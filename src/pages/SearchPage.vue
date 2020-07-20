<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <b-form @submit.prevent="searchRecipes" @reset.prevent="onReset">
      <div class="form-group">
        <input
                v-model="form.query"
                type="text"
                class="form-control"
                name="query"
                id="query_input"
                aria-describedby="helpId"
                placeholder="Enter key words here"
        />
      </div>
      <div class="form-group">
        <label>Cuisine</label>
        <b-form-select
                class="form-control"
                name="Cuisine"
                id="cuisine"
                v-model="form.cuisine"
                :options="cuisines"
        >
        </b-form-select>
      </div>
      <div class="form-group">
        <label >Diet</label>
        <b-form-select
                class="form-control"
                name="Diet"
                id="diet"
                v-model="form.diet"
                :options="diets"
        >
        </b-form-select>
      </div>
      <div class="form-group">
        <label >Intolerance</label>
        <b-form-select
                class="form-control"
                name="Intolerance"
                id="intolerance"
                v-model="form.intolerance"
                :options="intolerances"
        >
        </b-form-select>
      </div>
      <div class="form-group">
        <label >Number Of results</label>
        <b-form-select
                class="form-control"
                name="Cuisine"
                id="number"
                v-model="form.number"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </b-form-select>
      </div>
      <!-- :disabled="isDisabled"-->
      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
              type="submit"
              variant="primary"
              class="ml-5 w-30"
              :disabled="isDisabled"
              v-on:click="updateLastSearchDetails();"
      >Search</b-button
      >
    </b-form>
    <br />
    <b-row>
      <b-col>
        <div>
          <div>
            <div id="results" v-if="!isArrayEmpty">
              <h3>Search Results:</h3>
              <label>Sort by: </label>&nbsp;
              <select name="sorts" id="sort" @change="sort($event)">
                <option selected disabled value="">Select option</option>
                <option value="likes">Likes</option>
                <option value="time">Time</option>
              </select>
            </div>
            <div id="no_results" v-if="isArrayEmpty">
              <br />
              <br />
              <h4>Sorry but we didn't find the requested recipes.</h4>
              <img
                      src="https://res.cloudinary.com/diax6jxzv/image/upload/v1594630470/ios-10-shrug-emoji.0_nh6aem.jpg"
              />
            </div>
          </div>
          <RecipeSearchList
                  title="Search Results"
                  class="Search Results"
                  :recipes="this.recipes"
          />
        </div>
      </b-col>
      <b-col>
        <h3>Last Search Details:</h3>
        <p>
          <strong>Past Query: </strong> {{ this.lastSearch }}<br/>
          <strong>Diet: </strong> {{ this.lastDiet }}<br/>
          <strong>Cuisine: </strong> {{ this.lastCuisine }}<br/>
          <strong>intolerance: </strong> {{ this.lastIntolerance }}<br/>
        </p>
        <b-col v-for="r in this.lastRecipesResolte" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" />
        </b-col>

      </b-col>
    </b-row>
  </div>
</template>

<script>
  import RecipeSearchList from "../components/RecipeSearchList";
  import diets from "../assets/diets";
  import cuisines from "../assets/cuisines";
  import intolerances from "../assets/intolerances";
  import RecipePreview from "../components/RecipePreview";
  export default {
    name: "Search",
    components: {
      RecipeSearchList,
      RecipePreview,
    },
    data() {
      return {
        form: {
          query: "",
          cuisine: null,
          diet: null,
          intolerance: null,
          number: 5,
        },
        recipes: [],
        cuisines: [{ value: null, text: "", disabled: true }],
        diets: [{ value: null, text: "", disabled: true }],
        intolerances: [{ value: null, text: "", disabled: true }],
        pressed: false,

        currentSearch: null,
        currentDiet: null,
        currentCuisine: null,
        currentIntolerance: null,

        lastSearch: null,
        lastDiet: null,
        lastCuisine: null,
        lastIntolerance: null,

        // lastRecipesResolte: null,///////////////////////////////////////////////////////////////////
        // resetlastRecipesResolte:null,
      };
    },
    mounted() {
      this.diets.push(...diets);
      this.cuisines.push(...cuisines);
      this.intolerances.push(...intolerances);

      this.lastSearch = localStorage.getItem("lastSearch");
      this.lastDiet = localStorage.getItem("lastDiet");
      this.lastCuisine = localStorage.getItem("lastCuisine");
      this.lastIntolerance = localStorage.getItem("lastIntolerance");
      //this.lastRecipesResolte = localStorage.getItem("lastRecipesResolte");///////////////////////////////////
    },
    computed: {
      isDisabled() {
        if (
                this.form.query === "" ||
                this.form.query === null ||
                this.form.query.value === 0
        ) {
          return true;
        }
        return false;
      },
      sortLikes() {
        function compare(a, b) {
          if (a.aggregateLikes < b.aggregateLikes) return 1;
          if (a.aggregateLikes > b.aggregateLikes) return -1;
          return 0;
        }
        console.log(this.recipes);
        return [...this.recipes].sort(compare);
      },
      sortTime() {
        function compare(a, b) {
          if (a.readyInMinutes < b.readyInMinutes) return -1;
          if (a.readyInMinutes > b.readyInMinutes) return 1;
          return 0;
        }
        console.log(this.recipes);
        return [...this.recipes].sort(compare);
      },
      isArrayEmpty() {
        return (
                Array.isArray(this.recipes) &&
                !this.recipes.length &&
                this.pressed == true
        );
      },
    },
    methods: {
      async searchRecipes() {
        try {
          this.axios.defaults.withCredentials=true;

          this.currentSearch = this.form.query;
          this.currentDiet = this.form.diet;
          this.currentCuisine = this.form.cuisine;
          this.currentIntolerance = this.form.intolerance;

          localStorage.setItem("lastSearch", this.currentSearch);
          localStorage.setItem("lastDiet", this.currentDiet);
          localStorage.setItem("lastCuisine", this.currentCuisine);
          localStorage.setItem("lastIntolerance", this.currentIntolerance);

          // localStorage.setItem("lastRecipesResolte", this.resetlastRecipesResolte);////////////////////////////////////////
          // localStorage.setItem("lastRecipesResolte", this.recipes);////////////////////////////////////////

          // this.lastSearch = localStorage.getItem("lastSearch");
          // this.lastDiet = localStorage.getItem("lastDiet");
          // this.lastCuisine = localStorage.getItem("lastCuisine");
          // this.lastIntolerance = localStorage.getItem("lastIntolerance");
          // console.log("lastSearch: "+this.lastSearch)
          // console.log("lastDiet: "+this.lastDiet)
          // console.log("lastCuisine: "+this.lastCuisine)
          // console.log("lastIntolerance: "+this.lastIntolerance)

          const response = await this.axios.get(
                  /*"http://localhost:3000/recipes/search/" +
                  this.form.query +
                  "/amount/" +
                  this.form.number, { withCredentials: true },*/
                  "http://localhost:3000/searchRecipes"+
                  "/"+this.form.diet+
                  "/"+this.form.cuisine+
                  "/"+this.form.intolerance+
                  "/"+this.form.query+
                  "/"+this.form.number,
                  {
                    params: {
                      diet: this.form.diet,
                      cuisine: this.form.cuisine,
                      intolerance: this.form.intolerance,
                      recipesNameSearch: this.form.query,
                      number: this.form.number,
                    },
                  },
          );
          const recipes = response.data;
          this.recipes = [];
          this.recipes.push(...recipes);
          console.log("---------------------------------")
          console.log(recipes)
          console.log("---------------------------------")

          if ($cookies.get("session")) {
            this.$root.store.saveSearch(
                    this.form.query,
                    this.recipes,
                    this.form.diet,
                    this.form.cuisine,
                    this.form.intolerance,
                    //this.form.recipesNameSearch,
            );
          }
          this.pressed = true;
        } catch (error) {
          console.log(error);
        }
      },
      onReset() {
        this.form = {
          query: "",
          cuisine: null,
          diet: null,
          intolerances: null,
        };
      },
      sort(sortType) {
        if (sortType.target.value === "time") {
          this.recipes = this.sortTime;
        }
        if (sortType.target.value === "likes") {
          this.recipes = this.sortLikes;
        }
      },
      updateLastSearchDetails() {
        this.lastSearch = localStorage.getItem("lastSearch");
        this.lastDiet = localStorage.getItem("lastDiet");
        this.lastCuisine = localStorage.getItem("lastCuisine");
        this.lastIntolerance = localStorage.getItem("lastIntolerance");
        //this.lastRecipesResolte = localStorage.getItem("lastRecipesResolte");///////////////////////////////////
      },
    },
  };
</script>

<style lang="scss" scoped>
  .searchPageDiv{
    text-align: center;
    background-size: cover;
    //background-color: black;
    background-image: url("../pictures/background.jpg");
  }
  #queryInput {
    border-radius: 50px;
  }

</style>

<!--

<template>
  <div class="searchPageDiv">
    <b-container>
      <div class="jumbotron">
        <h1 class="title">Search Page</h1>
        <b-form @submit.prevent="Recipessearch" @reset.prevent="resetForm">

          <div class="formAreas">
            <input
                    v-model="formInfo.query"
                    name="query"
                    id="queryInput"
                    type="text"
                    class="form-control"
                    placeholder=" Enter Recipe name or key word"
            />
          </div>

          <br>
          <div class="formAreas">
            <label >Cuisine</label>
            <b-form-select
                    class="form-control"
                    id="cuisine"
                    name="Cuisine"
                    v-model="formInfo.cuisine"
                    :options="cuisines"
            >
            </b-form-select>
          </div>

          <br>
          <div class="formAreas">
            <label >Diet</label>
            <b-form-select
                    id="diet"
                    class="form-control"
                    name="Diet"
                    v-model="formInfo.diet"
                    :options="diets"
            >
            </b-form-select>
          </div>

          <br>
          <div class="formAreas">
            <label >Intolerance</label>
            <b-form-select
                    name="Intolerance"
                    id="intolerance"
                    class="form-control"
                    v-model="formInfo.intolerance"
                    :options="intolerances"
            >
            </b-form-select>
          </div>

          <br>
          <div class="formAreas">
            <label >Number Of results</label>
            <b-form-select
                    v-model="formInfo.number"
                    name="Cuisine"
                    id="number"
                    class="form-control"
            >
              <option value="5">5 results</option>
              <option value="10">10 results</option>
              <option value="15">15 results</option>
            </b-form-select>
          </div>

          <br>
          <b-button type="reset" variant="warning ">Reset Form</b-button>
          <b-button
                  type="submit"
                  variant="success "
                  :disabled="isDisabled"
          >Search</b-button
          >
        </b-form>

        <br />
        <h3>Last Search Details:</h3>
        <p v-bind="pervQuery">{{ $root.store.pervQuery }}</p>
        <br />

        <div>
          <div>
            <div id="results" v-if="!isArrayEmpty">
              <h3>Search Results:</h3>
              <label >Sort by: </label>&nbsp;
              <select name="sorts" id="sort" @change="sortForm($event)">
                <option selected disabled value="">Select option</option>
                <option value="time">Time</option>
                <option value="likes">Likes</option>
              </select>
            </div>

            <div id="no_results" v-if="isArrayEmpty">
              <br />
              <br />
              <h4>no recipes with than name exist</h4>
            </div>
          </div>

          <RecipeSearchList
                  title="Search Results"
                  class="Search Results"
                  :recipes="this.recipes"
          />
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
  import RecipeSearchList from "../components/RecipeSearchList";
  import diets from "../assets/diets";
  import cuisines from "../assets/cuisines";
  import intolerances from "../assets/intolerances";

  export default {
    name: "Search",
    components: {
      RecipeSearchList,
    },
    data() {
      return {
        formInfo: {
          query: "",
          cuisine: null,
          diet: null,
          intolerance: null,
          resultNum: 5,
        },
        recipes: [],
        cuisines: [{ value: null, text: "", disabled: true }],
        diets: [{ value: null, text: "", disabled: true }],
        intolerances: [{ value: null, text: "", disabled: true }],
        pervQuery: null,
        isBtnPressed: false,
      };
    },
    mounted() {
      this.diets.push(...diets);
      this.cuisines.push(...cuisines);
      this.intolerances.push(...intolerances);
    },
    computed: {
      sortByLikes() {
        function compare(a, b) {
          if (a.aggregateLikes < b.aggregateLikes) return 1;
          if (a.aggregateLikes > b.aggregateLikes) return -1;
          return 0;
        }
        console.log(this.recipes);
        return [...this.recipes].sortForm(compare);
      },
      isDisabled() {
        if (
                this.formInfo.query === "" ||
                this.formInfo.query === null ||
                this.formInfo.query.value === 0
        ) {
          return true;
        }
        return false;
      },
      isArrayEmpty() {
        return (
                Array.isArray(this.recipes) &&
                !this.recipes.length &&
                this.isBtnPressed == true
        );
      },
      sortByTime() {
        function compare(a, b) {
          if (a.readyInMinutes < b.readyInMinutes) return -1;
          if (a.readyInMinutes > b.readyInMinutes) return 1;
          return 0;
        }
        console.log(this.recipes);
        return [...this.recipes].sortForm(compare);
      },
    },
    methods: {
      async Recipessearch() {
        try {
          const response = await this.axios.get(
                  "http://localhost:3000/searchRecipes" +
                  this.formInfo.query +
                  "/amount/" +
                  this.formInfo.resultNum,
                  { withCredentials: true },
                  {
                    params: {
                      diet: this.diet,
                      cousine: this.cuisine,
                      intolerance: this.intolerance,
                    },
                  }
          );
          const recipes = response.data;
          this.recipes = [];
          this.recipes.push(...recipes);
          localStorage.setItem("pervQuery", this.formInfo.query);
          console.log(recipes);
          this.isBtnPressed = true;
        } catch (error) {
          console.log(error);
        }
      },
      resetForm() {
        this.formInfo = {
          query: "",
          cuisine: null,
          diet: null,
          intolerances: null,
        };
      },
      sortForm(sortType) {
        if (sortType.target.value === "time") {
          this.recipes = this.sortByTime;
        }
        if (sortType.target.value === "likes") {
          this.recipes = this.sortByLikes;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .searchPageDiv{
    text-align: center;
    background-size: cover;
    //background-color: black;
    background-image: url("../pictures/background.jpg");
  }
  #queryInput {
    border-radius: 50px;
  }
</style>

-->
