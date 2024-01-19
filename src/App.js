import './App.css';
import Login from './component/Login';
import Signup from './component/Signup';
import { Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import HomePage from './component/HomePage';
import MyRecipes from './recipe/MyRecipes';
import ShopingList from './component/ShopingList';
import RecipesList from './recipe/RecipeList';
import RecipeForm from './recipe/RecipeForm';
import RecipeDetails from './recipe/RecipeDetails';
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

        {/* <Route path="/recipesList" element={<RecipeList />}/> */}
        {/* <Route path="https://localhost:8080/api/recipe/edit" element={}></Route>
       <Route path="https://localhost:8080/api/category" element={}></Route>
       <Route path="https://localhost:8080/api/buy/:userid" element={}></Route>
       <Route path="https://localhost:8080/api/buy/edit" element={}></Route>
       <Route path="https://localhost:8080/api/buy/delete/:Userid/:Id" element={}></Route> */}
      </Routes>
      </div></div>
    </div>
  );
}

export default App;
