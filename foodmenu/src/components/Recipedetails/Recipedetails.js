import React, { useEffect, useState } from "react"
import { fetchRecipesById } from "../../utils/api"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import Loader from "../loader/loader"
import styles from "./Recipedetails.module.css"
import Cx from "classnames"

function Recipedetails() {

  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  const { id } = useParams()
  //btn---->storage ,storage check- display

  useEffect(() => {
    const fetchRecipesData = async () => {
      try {
        const data = await fetchRecipesById(id)
        setRecipes(data)
        setLoading(!true)
      }
      catch {
        setLoading(false)
      }
    }
    fetchRecipesData()
  }, [id])

  // local storage ,array , map,fillter,som
  //spred operater

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("fav")) || []
    const isRecipeFav = fav.some(rec => rec.id === recipes.id)
    setIsFavorite(isRecipeFav)
  }, [recipes])

  const handleToggleFav = () => {
    setIsFavorite(preVal => !preVal)
    const fav = JSON.parse(localStorage.getItem("fav")) || []
    const updateFav = isFavorite ? fav.filter(rec => rec.id !== recipes.id) :
      [...fav, recipes]
    localStorage.setItem("fav", JSON.stringify(updateFav))

  }



  return (
    <div>
      {loading ? <Loader /> :
        <div className={styles.details}>
          <Link to={"/"}>Go Back</Link>
          <div className={styles.header}>
            <h2>{recipes.title}</h2>
            <button
              onClick={handleToggleFav}
              className={styles.favbtn}>
              {!isFavorite ? "+Add To Favorites" : " -Remove From Favorites"}</button>
          </div>
          <div className={styles.content}>
            <img src={recipes.image} className={styles.image} alt={recipes.title} />
            <div className={styles.recipeinfo}>
              <span className={Cx(styles.tag, styles.level)}>{recipes.level}</span>
              <span className={Cx(styles.tag, styles.time)}>{recipes.time}</span>
              <span className={Cx(styles.tag, styles.veg)}>{recipes.isVeg ? "Veg" : "Non-Veg"}</span>
            </div>

            <div className={styles.tags}>
              {recipes.ingredients.map((ingredient, ind) => (
                <span key={ind} className={styles.ingredient}>{ingredient}</span>
              ))}
            </div>
            <br />
            <h3>Instructions</h3>
            <br />
            <ol className={styles.instructions}>
              {recipes.instructions.map((instruction, ind) => (
                <li key={ind}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      }
    </div>
  )
}

export default Recipedetails