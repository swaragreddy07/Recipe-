import React, { useState, useEffect, useRef } from "react";
import { Route, useNavigate } from "react-router-dom";
import styles from "./home.module.css";

function Home() {
  const [result, setResult] = useState("pizza");
  const [item, setItem] = useState();
  const [search, setSearch]  = useState("pizza");
  const navigate = useNavigate();

  async function Search(query) {
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`
      );
      const data = await res.json();
      setItem(data);
  
    } catch (e) {
      console.log(e);
    }
  }

 function handleChange(e){
   Search(e)
 }
  function handleClick(id) {
    navigate(`/view/${id}`);
  }

  useEffect(() => {
    Search("pizza");
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.h2}>SimpleRecipe</h2>

        <input
          className={styles.input}
          type="text"
          placeholder="Enter items..."
          onChange={(e) => {
            handleChange(e.target.value);
            setSearch(e.target.value)
          }}
        />
      </div>
      <h2 className={styles.H2}>Showing Search results for {search}</h2>
      <div className={styles.container}>
        {item &&
          item["data"].recipes.map((recipe, index) => (
            <div class={styles.border}>
              <img
                className={styles.img}
                key={index}
                src={recipe.image_url}
                alt={`Recipe ${index}`}
              />
              <p className={styles.P}>{recipe.publisher}</p>
              <h1 className={styles.h3}>{recipe.title}</h1>
              <button
                onClick={(e) => {
                  handleClick(recipe.id);
                }}
                className={styles.button}
              >
                RECIPE DETAILS
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
