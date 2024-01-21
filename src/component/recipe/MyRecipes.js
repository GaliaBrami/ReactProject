
import {  useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import Recipe from './Recipe';
import * as actions from '../../store/action';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MyRecipes = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const recipes = useSelector(state => state.recipes);
    const [r,seR]=useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/api/recipe")
            .then(x => {
                seR(x.data);
            })
            .catch(err => console.log(err))
    }, [recipes])

    return (<>
        <button class="ui button" onClick={() => {
            // addNewRecipe();
            navigate("/recipeform" );
            dispatch({ type: actions.SET_CHOSEN, recipe: {Id:-1} });
            
        }
        }>Add new recipe</button>
        <div class="ui link cards">
            {r?.map((recipe) => (
                (user && recipe.UserId === user.Id) ?
                    <>
                        <Recipe key={recipe.Id} recipe={recipe} />
                    </> : null
            ))}
        </div>
    </>);
}

export default MyRecipes;