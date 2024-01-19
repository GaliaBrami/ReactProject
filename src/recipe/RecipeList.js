import { useEffect, useState } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Recipe from "./Recipe";

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [level, setLevel] = useState();
    const [time, setTime] = useState();
    const difficulties = [{ id: 1, value: "easy" }, { id: 2, value: "medium" }, { id: 3, value: "hard" }];
    const durations = [{ id: 10, value: "10 minutes" }, { id: 15, value: "15 minutes" }, { id: 30, value: "half hour" }, { id: 60, value: "hour" }, { id: 200, value: "2 hours+" }];
    const navigate=useNavigate();
    const dispatch=useDispatch();
    // setRecipes(useSelector(state => state.recipes));
    useEffect(() => {
        axios.get("http://localhost:8080/api/recipe")
            .then(r => {
                setRecipes(r.data)
                setFilteredRecipes(r.data);
            })
            .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        axios.get("http://localhost:8080/api/category")
            .then(x => {
                setCategories(x.data)
            })
            .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        setFilteredRecipes(recipes.filter(r => (!category || r.CategoryId == category) && (!time || r.Duration <= time) && (!level || r.Difficulty <= level)))
    }, [category, time, level])

    return <>
    <div class="ui list">
        <select class="ui dropdown" name="selectCategory" defaultValue="selectCategory" onChange={(e) => setCategory(e.target.value)}>
            <option value="" >select category</option>
            {categories?.map((c) => (
                <option key={c.Id} value={c.Id}>
                    {c.Name}
                </option>
            ))}
        </select>
        <select class="ui dropdown" name="selectDuration" onChange={(e) => setTime(e.target.value)}>
            <option value="" >select duration</option>
            {durations?.map((d) => (
                <option key={d.id} value={d.id}>
                    {d.value}
                </option>
            ))}
        </select>
        <select class="ui dropdown" name="select difficulty" onChange={(e) => setLevel(e.target.value)}>
            <option value="" >select difficulty</option>
            {difficulties?.map((d) => (
                <option key={d.id} value={d.id}>
                    {d.value}
                </option>
            ))}
        </select>
        </div>
        <div class="ui link cards">
        {filteredRecipes?.map((recipe) => (
            <Recipe recipe={recipe}/>
        ))}</div>
    </>

}
export default RecipeList