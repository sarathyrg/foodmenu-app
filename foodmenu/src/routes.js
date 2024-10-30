import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Recipedetails from "./components/Recipedetails/Recipedetails";
import ErrorPage from "./components/Errorpage/Errorpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/recipe/:id",
    element: <Recipedetails />,
  },

]);

const MyRoutes = () => < RouterProvider router={router} />

export default MyRoutes