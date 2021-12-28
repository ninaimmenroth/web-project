import React, {useEffect, useState} from "react";
import Recipe from './Recipe';
import './App.css';

const App = () => {
  //usually protect these in env varibales
  const APP_ID = '8ada17bf';
  const APP_KEY = 'f838156787f4dda69e200b7fecb37c99';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  //add variables in the array at the end --> effect runs when those are refreshed
  useEffect( () => {
    getRecipes();
  }, [query]);
  
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className = "App">
      <form onSubmit={getSearch} className = "search-form">
        <input className = "search-bar" type = "text" value={search} onChange={updateSearch} />
        <button  className = "search-button" type = "submit">
          Search
         </button>
        
      </form>
      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe 
        key ={recipe.recipe.label} 
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image} 
        ingredients={recipe.recipe.ingredients} />
      ))}
      </div>
    </div>
  );
};

export default App;
