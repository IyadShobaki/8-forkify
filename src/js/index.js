import axios from 'axios';

async function getResults(query){
    // Different from fetch, axios will return json. With fetch we have to convert it to json
    try{
        const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
        const recipes = res.data.recipes; 
        console.log(recipes);
        
    } catch (error) {
        alert(error)
    }
}
getResults('pasta');

