import React, { useState } from 'react';
import axios from 'axios';

const Recipe = () => {
//State Variables
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [healthLabels, setHealthLabels] = useState('');

  //API Key
  const apiKey = 'YOUR_API_KEY'; // Replace with your Edamam API key

  //getRecipies - It constructs a URL with the user's query and health labels and makes an API request using axios.
  const getRecipes = async () => {//The async keyword is used to indicate that this function contains asynchronous operations.
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${query}&app_id=YOUR_APP_ID&app_key=${apiKey}&health=${healthLabels}`
      );
      setRecipes(response.data.hits);//setRecipes(response.data.hits) updates the recipes state variable with the new recipe data, triggering a re-render of the component with the updated data.
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="recipe-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter ingredients (e.g., chicken, pasta)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Health Labels (optional)"
          value={healthLabels}
          onChange={(e) => setHealthLabels(e.target.value)}
        />
        <button className="search-button" onClick={getRecipes}>
          Find Recipes
        </button>
      </div>
      <ul className="recipe-list">
        {recipes.map((recipe, index) => (
          <li key={index}>
            <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">
              {recipe.recipe.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recipe;
