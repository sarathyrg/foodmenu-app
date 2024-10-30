import { useEffect, useState } from "react";
import { fetchRecipes, fetchRecipesById } from "./utils/api";
import Loader from "./components/loader/loader";
import Header from "./components/Header/Header"
import RecipeList from "./components/RecipeList/RecipeList";


function App() {

  //reload,rerender --- state data change
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")



  useEffect(() => {
    const fetchRecipesData = async () => {
      try {
        const data = await fetchRecipes()
        setRecipes(data)
        setLoading(!true)
      }
      catch {
        setLoading(false)
      }
    }
    fetchRecipesData()
  }, [])


  const filterRecipe = recipes.filter(rec => rec.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const recipesToDisplay = searchQuery ? filterRecipe : recipes
  // fetchRecipes()
  // fetchRecipesById()

  // fetchRecipe(getAllRecipesURL)
  // fetchRecipe(getRecipesURLByID)

  return (
    <div className="App">
      <Header title={"Recipe App"} setSearchQuery={setSearchQuery} />

      {loading ? <Loader name={"Recipes is Loading"} /> :
        <RecipeList recipes={recipesToDisplay} />}
    </div>
  );
}

export default App
