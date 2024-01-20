import axios from "axios";
// import { useDispatch } from 'react-redux';

export const SET_MASS = 'SET_MASS';
export const SET_USER = "SET_USER";
export const SET_RECIPE = "SET_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const EDIT_RECIPE = "EDIT_RECIPE";
export const ADD_RECIPE = "ADD_RECIPE";
export const RELOAD = "RELOAD";
export const SET_CHOSEN = "SET_CHOSEN";
export const GET_CATEGORY = `GET_CATEGORY`;
export const ADD_TO_SHPLST = `ADD_TO_SHPLST`;
export const UPDATE_TO_SHPLST = `UPDATE_TO_SHPLST`;
export const DEL_TO_SHPLST = `DEL_TO_SHPLST`;
export const SET_SHP_LST = `SET_SHP_LST`;
export const SET_CATEGORIES = `SET_CATEGORIES`;
export const ADD_CATEGORY = `ADD_CATEGORY`;

// const dispatch = useDispatch();

// export const getRecipe = () => {
//     return axios.get("https://jsonplaceholder.typicode.com/todos")
// // }
//  const getRecipes = () => {
//     axios.get("http://localhost:8080/api/recipe")
//         .then(r => {
//             dispatch({ type: SET_RECIPE, recipes: r.data });
//         })
//         .catch(err => console.log(err))
// }
//  const getBays = (user) => {
//     axios.get(`http://localhost:8080/api/bay/${user.Id}`)
//         .then(spl => {
//             dispatch({ type: SET_SHP_LST, shopinglist: spl.data });
//             console.log(spl);

//         })
//         .catch(err => console.log(err))
// }
//  const getCategories = () => {
//    return axios.get("http://localhost:8080/api/category")
//             .then(x => {
//                 console.log(x.data)
//             dispatch({ type: SET_CATEGORIES,ctgrs: x.data });

//             })
//             .catch(err => console.log(err))
// }
export const addRecipe = (r) => {
    // dispatch({ type: actions.ADD_RECIPE, recipe: data });
    console.log("jjjjjjjjj");
    return dispatch => {
        axios.post("https://localhost:8080/api/recipe/add", { r })
            .then(x => dispatch({ type: SET_RECIPE, data: x.data }))
    };
}

// export const getTodos = () => {
//     return dispatch => {
//         dispatch({ type: "RELOAD" });

//         axios.get("https://jsonplaceholder.typicode.com/todos")
//             .then(x => setTimeout(() => dispatch({ type: "SET_USER", data: x.data[0] }), 200))

//     }
// }