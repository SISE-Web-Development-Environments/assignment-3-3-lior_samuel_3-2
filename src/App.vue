<template>
  <div id="app">
    <div id="nav">
        <b-navbar  class="fullBar" variant="info">
            <b-navbar>
                <router-link :to="{ name: 'main' }">Vue Recipes</router-link>|
                <router-link :to="{ name: 'search' }">Search</router-link>|
                <router-link :to="{ name: 'about' }">About</router-link>|
            </b-navbar>

            <b-navbar-nav class="ml-auto" >
                <b-nav-item-dropdown text="Hello Guest" v-if="!$root.store.username" right>
                    Guest:
                    <router-link :to="{ name: 'register' }">Register</router-link>|
                    <router-link :to="{ name: 'login' }">Login</router-link>|
                </b-nav-item-dropdown>
                <b-nav-item-dropdown :text="$root.store.username" v-else right>
                    Personal:
                    <button @click="Logout">Logout</button>|
                    <router-link tag="" :to="{ name: 'main' }" @click.native="$root.store.logout">Logout</router-link>
                    <router-link tag="b-dropdown-item" :to="{ name: 'favorites' }">favorites</router-link>
                    <router-link tag="b-dropdown-item" :to="{ name: 'MyRecipes' }">My Recipes</router-link>
                    <router-link tag="b-dropdown-item" :to="{ name: 'myFamilyRecipes' }">My Family Recipes</router-link>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-navbar>

    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  //font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;

  //background-image: url("./pictures/background.jpg");//////////////////////////////////////
  //background-size: 1800px;                           /////////////////////////////////////
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
