import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/action.js'
import axios from "axios";


const RecipeDetails = () => {
    const dispatch = useDispatch();
    const recipe = useSelector(state => state.recipe);
    const user = useSelector(state => state.user);
    const shplist = useSelector(state => state.shoplist);

    return (
        <div className=" recipe" key={recipe?.Id}>
            <h1>{recipe?.Name}</h1>
            <img className="ui medium image" src={recipe?.Img} alt={recipe?.Name} />
            <h2>{recipe?.Description}</h2>
            <h3>Ingrident</h3><ul>
                {recipe?.Ingrident?.map((i) => (
                    <li>
                        {i.Count} {i.Type} {i.Name}
                        <button class="ui left icon button" onClick={() => {

                            axios.post(`http://localhost:8080/api/bay`, { Name: i.Name, UserId: user.Id, Count: i.Count }).then((x) => {
                                dispatch({ type: actions.ADD_TO_SHPLST, prod: x.data })
                            }).catch((error) => console.log(error))

                        }}>
                            add to shopping list
                            <i class="shopping cart icon"></i>
                        </button>
                    </li>
                ))}</ul>
            <h3>Instructions</h3><ol>
                {recipe?.Instructions?.map((i) => (
                    <li>
                        {i}
                    </li>
                ))}</ol>
            <button class="ui button" onClick={() => {
                window.print();
            }}>
                <i class="print icon"></i>
            </button>
        </div>
    );

}

export default RecipeDetails;