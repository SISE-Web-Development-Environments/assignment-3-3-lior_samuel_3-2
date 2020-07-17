
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
                  "https://assignment3-2-tomer-itai.herokuapp.com/recipes/search/" +
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

