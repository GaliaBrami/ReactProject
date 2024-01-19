import { useDispatch, useSelector } from "react-redux";
import * as actions from '../store/action';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Recipe = ({ recipe }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    return (<div class="card recipe" key={recipe?.Id} >
        {/* horizontal */}
        <img class="ui medium image" src={recipe?.Img}></img>
        <div>
            {recipe?.Name}
        </div>
        <div>
            {recipe?.Description}
        </div>
        <button class="ui button" onClick={() => {
            // addNewRecipe();
            //console.log(recipe)
            dispatch({ type: actions.SET_CHOSEN, recipe: recipe });
            navigate("/recipedetails");
            
        }}>
            <i class='angle down icon'></i>
        </button>
        {(user && recipe?.UserId == user.Id) ? <>
        <div>
            <button class="ui button" onClick={()=>{
                dispatch({type:actions.SET_CHOSEN,recipe:recipe});
                navigate('/recipeform');
            }}>
                <i class='edit outline icon' ></i>
            </button>
            <button class="ui button" onClick={() => {
            axios.post(`http://localhost:8080/api/recipe/delete/${recipe.Id}`).then((res)=>{
                dispatch({ type: actions.DELETE_RECIPE, id: recipe.Id })
            }).catch(e=>{console.log(e)})
            }}>
                <i class='trash alternate outline icon'> </i>
            </button>
            </div>
        </> : null}
    </div>);
}

export default Recipe;