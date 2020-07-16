import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "*",
    name: "about",
    component: () => import("./pages/About"),
  },
  {
    path: "*",
    name: "favorites",
    component: () => import("./pages/FavoritesPage"),
  },
  {
    path: "*",
    name: "MyRecipes",
    component: () => import("./pages/MyRecipesPage"),
  },
  {
    path: "*",
    name: "myFamilyRecipes",
    component: () => import("./pages/myFamilyRecipesPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },

];

export default routes;
