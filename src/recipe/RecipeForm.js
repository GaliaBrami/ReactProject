import { useFieldArray, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import * as actionType from "../store/action"

const difficulties = [{ id: 1, value: "easy" }, { id: 2, value: "medium" }, { id: 3, value: "hard" }];

const schema = yup
    .object({
        Name: yup.string().required(),
        CategoryId: yup.number().required(),
        Img: yup.string().required(),
        Duration: yup.number().positive().integer().required(),
        Difficulty: yup.number().positive().required(),
        Description: yup.string().required(),
        Ingrident: yup.array().of(
            yup.object().shape({
                Name: yup.string().required(),
                Count: yup.number().positive(),
                Type: yup.string().required(),
            })
        ),
        Instructions: yup.array().of(yup.string().required()),
    })
    .required()

const AddRecipes = () => {
    const recipe = useSelector(x => x.recipe)
    const user = useSelector(state => state.user)
    const categories = useSelector(state => state.categories)
    const dispatch = useDispatch()
    const navigate = useNavigate()



    const {
        register,
        handleSubmit,
        formState: { errors }, control
    } = useForm({
        resolver: yupResolver(schema),
        values: recipe,
    })
    const addNewRecipe = (data) => {
        axios.post("http://localhost:8080/api/recipe", data)
            .then(x => {
                dispatch({ type: actionType.ADD_RECIPE, recipe: x.data })
                alert("recipe added succesfully")
                navigate('/homepage');
            })
            .catch(err => console.log(err))
    }
    const editRecipe = (data) => {
        axios.post("http://localhost:8080/api/recipe/edit", data)
            .then(x => {
                dispatch({ type: actionType.EDIT_RECIPE, recipe: x.data })
                alert("recipe edited succesfully");
                navigate('/homepage');
            })
            .catch(err => console.log(err))
    }
    const onSubmit = (data) => {

        data.UserId = user.Id;
        if (recipe.Id != -1)
            editRecipe(data);
        else
            addNewRecipe(data)
    }
    const { fields: fieldsIngrident, append: appendIngrident, remove: removeIngrident, } = useFieldArray({
        control,
        name: "Ingrident",
    });
    const { fields: fieldsInstructions, append: appendInstructions, remove: removevInstructions, } = useFieldArray({
        control,
        name: "Instructions",
    });
    return <>
        <div class="ui clearing segment">
            <div class="ui right floated button" onClick={() => { navigate('/addc') }}>add new category</div>
        </div>
        {/* <button class="ui button" onClick={() => { navigate('/addc') }}></button> */}
        <h2>Enter Recipe Details:</h2>

        <form class="ui form" onSubmit={handleSubmit(onSubmit)}>
            <input {...register("Name")} placeholder="Name" />
            <p>{errors.Name?.message}</p>
            <label>select Category</label>
            <select name="selectCategory" {...register("CategoryId")}>
                {categories?.map((category) => (
                    <option key={category.Id} value={category.Id}>
                        {category.Name}
                    </option>
                ))}
            </select>
            <br />

            <input {...register("Img")} placeholder="img" />
            <p>{errors.Img?.message}</p>

            <input {...register("Duration")} placeholder="duration" type="number" />
            <p>{errors.Duration?.message}</p>

            <select name="selectLevel" {...register("Difficulty")}>
                {difficulties?.map((d) => (
                    <option key={d.id} value={d.id}>
                        {d.value}
                    </option>
                ))}
            </select>
            <br />

            <input {...register("Description")} placeholder="description" />
            <p>{errors.Description?.message}</p>

            {fieldsIngrident.map((field, index) => (
                <div class="ui grid">
                    <div class="four wide column">
                        <input {...register(`Ingrident.${index}.Name`)} placeholder="name" />
                        <p>{errors.Ingrident?.[index]?.a?.message}</p>
                    </div>
                    <div class="four wide column">
                        <input {...register(`Ingrident.${index}.Count`)} placeholder="count" type="number" />
                        <p>{errors.Ingrident?.[index]?.b?.message}</p>
                    </div>
                    <div class="four wide column">
                        <input {...register(`Ingrident.${index}.Type`)} placeholder="type" />
                        <p>{errors.Ingrident?.[index]?.c?.message}</p>
                    
                    </div><div class="four wide column">
                    <button class="ui button" onClick={() => removeIngrident(index)}> delete</button>
                    </div><hr />

                </div>
            ))}
            <button class="ui button" onClick={() => appendIngrident({})}> add Ingrident</button><br /><br />
            {fieldsInstructions.map((field, index) => (
                <>

                    <input {...register(`Instructions.${index}`)} placeholder="instruction" />
                    <p>{errors.Instructions?.[index]?.a?.message}</p>
                    <button class="ui button" onClick={() => removevInstructions(index)}> delete</button>
                    <hr />

                </>
            ))}
            <button class="ui button" onClick={() => appendInstructions('')}> add Instruction</button>
            <br /><br />
            <input class="ui button" type="submit" value="send to add" />
        </form>
    </>
}

export default AddRecipes;