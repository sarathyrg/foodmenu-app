import React, { useEffect, useState } from "react"
import styles from "./Recipelist.module.css"
import { Link } from "react-router-dom"
import Cx from "classnames"

function RecipeList({ recipes = [] }) {

    const [filteredData, setFilterdData] = useState(recipes)

    useEffect(() => {
        setFilterdData(recipes)
    }, [recipes])

    const checkForRecipes = () => {
        if (recipes.length === 0)
            return <div className={styles.norecipes}> No recipes Found,Search another recipes</div>
        else
            return renderList()
    }


    const renderList = () => {
        return <div className={styles.list}>

            {filteredData.map(recipe => (
                <Link
                    to={`/recipe/${recipe.id}`}
                    className={styles.linkitem}
                    key={recipe.id}>
                    <div className={styles.cardContainer}>
                        <div className={styles.cardHeader}>
                            {recipe.title}
                        </div>
                        <div className={styles.recipeinfo}>
                            <span className={Cx(styles.tag, styles.level)}>{recipe.level}</span>
                            <span className={Cx(styles.tag, styles.time)}>{recipe.time}</span>
                            <span className={Cx(styles.tag, styles.veg)}>{recipe.isVeg ? "Veg" : "Non-Veg"}</span>
                        </div>
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className={styles.image}
                        />

                    </div>
                </Link>
            ))}
        </div>
    }

    const handleFilter = (event) => {
        const value = event.target.value;
        if (value === "") {
            setFilterdData(recipes)
        }
        else {
            const filtered = recipes.filter((recipes) => {
                if (value === "veg") {
                    return recipes.isVeg
                }
                else if (value === "non-veg") {
                    return !recipes.isVeg
                }
                else if (value === " ") {
                    return recipes
                }
                else {
                    return recipes.level === value
                }
            });
            setFilterdData(filtered)
        }
    }


    return (
        <div className={styles.recipelist}>
            <div className={styles.header}>
                <h3 className={styles.title}>CheckOut These Recipes</h3>
                <select onChange={handleFilter} name="filter" id="filter">
                    <option value="">All</option>
                    <option value="veg">Veg</option>
                    <option value="non-veg">Non-Veg</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            {checkForRecipes()}

        </div>



    )
}
export default RecipeList 