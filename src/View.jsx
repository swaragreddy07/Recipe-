import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import styles from "./home.module.css";
function View() {
  const [item, setItem] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  function handleClick() {
    navigate("/");
  }
  async function search() {
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await res.json();
      setItem(data);
      console.log(item);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    search();
  }, []);
  return (
    <div>
      <div className={styles.Header}>
        <h2 className={styles.h2}>SimpleRecipe</h2>
        <p
          onClick={(e) => {
            handleClick();
          }}
          className={styles.para}
        >
          Home
        </p>
      </div>
      {item && (
        <div className={styles.view}>
          <img className={styles.Img} src={item["data"].recipe.image_url}></img>
          <div className={styles.description}>
            <p className={styles.P}>{item["data"].recipe.publisher}</p>
            <h1 className={styles.h3}>{item["data"].recipe.title}</h1>
            <p className={styles.last}>Ingredients:</p>
            {item["data"].recipe.ingredients.map((recipe, index) => (
              <div className={styles.ing}>
                <p className={styles.last}>{recipe.quantity}</p>
                <p className={styles.last}>{recipe.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default View;
