import axios from "axios";
import * as actions from '../store/action';

export const getRecipes = () => {
    return dispatch => {
        axios.get("http://localhost:8080/api/recipe")
        .then(r => {
            dispatch({ type: actions.SET_RECIPE, recipes: r.data });
        })
        .catch(err => console.log(err))
    }
}