
import {  useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import Recipe from './Recipe';
import * as actions from '../store/action';

// import { Link } from 'react-router-dom';
// import * as actions from '../store/action';
// import { type } from '@testing-library/user-event/dist/type';
const MyRecipes = () => {

    // addNewRecipe = () => {

    // }
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const recipes = useSelector(state => state.recipes);

    return (<>
        <button class="ui button" onClick={() => {
            // addNewRecipe();
            console.log("Add recipe -go to form")
            navigate("/recipeform" );
            console.log("Add recipe -get to form")
            dispatch({ type: actions.SET_CHOSEN, recipe: {Id:-1} });
            
        }
        }>Add new recipe</button>
        <div class="ui link cards">
            {recipes?.map((recipe) => (
                (user && recipe.UserId === user.Id) ?
                    <>
                        <Recipe key={recipe.Id} recipe={recipe} />
                    </> : null
            ))}
        </div>
    </>);
}

export default MyRecipes;