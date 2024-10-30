//api base and end points URl

// const getAllRecipesURL = "https://api-recipe.vercel.app/recipes"
// const getRecipesURLById = "https://api-recipe.vercel.app/recipes/20"


const BASE_URL = "https://api-recipe.vercel.app/"

const END_POINTS = {
    recipes: "recipes",
    recipesId: "recipes/:id",
}

// fetch(getRecipesURLById)
// .then(res => res.json())
// .then(res => console.log(res))

//api specific function
export const fetchRecipes = async () => {
    const url = `${BASE_URL}${END_POINTS.recipes}`
    return await fetchData(url)
}

export const fetchRecipesById = async (id) => {
    const url = `${BASE_URL}${END_POINTS.recipesId}`.replace(':id', id)
    return await fetchData(url)
}

//api helper function

async function fetchData(url) {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            console.log("response failed")
        }
        return await response.json()
    }
    catch (error) {
        console.log(error)
    }
}