import * as actions from './action'

const initalseState = {
    user: null,
    count: 0,
    recipes: [],
    recipe: null,
    shoplist:[],
    categories:[]
}

const reducer = (state = initalseState, action) => {
    switch (action.type) {
        case actions.SET_RECIPE:
            return { ...state, recipes: action.recipes}
        case actions.SET_CATEGORIES:
            return { ...state, categories: action.ctgrs}
        case actions.SET_SHP_LST:
            return { ...state, shoplist: action.shopinglist }
        case actions.ADD_RECIPE:
            const recipes = [...state.recipes];
            recipes.push(action.recipe);
            // actions.addRecipe();
            return { ...state, recipes }
            case actions.ADD_TO_SHPLST:{
                const shplist = [...state.shoplist];
                shplist.push(action.prod);
                return { ...state, shplist }
            }
            case actions.ADD_CATEGORY:{
                const categories = [...state.categories];
                categories.push(action.c);
                return { ...state, categories }
            }
            case actions.EDIT_RECIPE: {
            const recipes = [...state.recipes];
            const findIndex = recipes.findIndex(x => x.Id === action.recipe.Id);
            recipes[findIndex] = action.recipe;
            return { ...state, recipes }
        }
        case actions.DELETE_RECIPE: {
            const recipes = state.recipes.filter(x => x.id !== action.id);
            return { ...state, recipes }
        }
        case actions.DEL_TO_SHPLST: {
            const s = state.shoplist.filter(x => x.id !== action.id);
            return { ...state, s }
        }
        case actions.SET_CHOSEN:
            return { ...state, recipe: action.recipe }
        case actions.SET_USER:
            return { ...state, user: action.user }
        // case actions.SET_MASS:
        //     return { ...state, mass: action.data }
        // case actions.RELOAD:
        //     return { ...state, reloed: true }
        default: return { ...state }
    }
}

export default reducer;