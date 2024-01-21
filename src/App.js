import './App.css';
import Login from './component/Login';
import Signup from './component/Signup';
import { Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import HomePage from './component/HomePage';
import MyRecipes from './component/recipe/MyRecipes';
import ShopingList from './component/ShopingList';
import RecipesList from './component/recipe/RecipeList';
import RecipeForm from './component/recipe/RecipeForm';
import RecipeDetails from './component/recipe/RecipeDetails';
import AddCategory from './component/AddCategory';

function App() {
  return (
    <div className="contaiter ">
      <Header />
      <div>
      <div className="middle aligned">
      <Routes>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/homepage" element={<HomePage />}/>
        <Route path="/myrecipes" element={<MyRecipes/>}/>
        <Route path="/recipeform" element={<RecipeForm/>}/>
        <Route path="/recipedetails" element={<RecipeDetails/>}/>
        <Route path="/recipes" element={<RecipesList/>}/>
        <Route path="/shopingList" element={<ShopingList/>}/>
        <Route path="/addc" element={<AddCategory/>}/>
      </Routes>
      </div></div>
    </div>
  );
}

export default App;
