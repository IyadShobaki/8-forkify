import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

// ** Global state of the app
// * - Search object
// * - Current recipe object
// * - Shopping list object
// * - Liked recipes

const state = {};


// SEARCH CONTROLLER
const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();
    // TESTING
    //const query = 'pizza';
    
    if(query){
        // 2. New search object and add it to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4. Search for recipes
            await state.search.getResults();
    
            // 5. Render results on UI
            clearLoader();
            //console.log(state.search.result);
            searchView.renderResults(state.search.result);

        } catch (error){
            alert('Something wrong with the search...');
            clearLoader();
        }

    }
}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); // this will prevent reloading when press search button
    controlSearch();
});


// TESTING
// window.addEventListener('load', e => {
//     e.preventDefault(); // this will prevent reloading when press search button
//     controlSearch();
// });

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    //console.log(btn);
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10); // 10 means 'base 10'
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        //console.log(goToPage);
    }
});

// RECIPE CONTROLLER
// const r = new Recipe(47746);
// r.getRecipe();
// console.log(r);
const controlRecipe = async () => {
    // Get ID from url
    //const id = window.location.hash;
    const id = window.location.hash.replace('#', '');
    console.log(id);
    if(id){
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        // Create new recipe object
        state.recipe = new Recipe(id);

        // TESTING
        //window.r = state.recipe;

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
    
            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            // Render recipe
            clearLoader();
            //console.log(state.recipe);
            recipeView.renderRecipe(state.recipe);

        } catch (error){
            alert('Error processing recipe!');
        }

    
    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));





