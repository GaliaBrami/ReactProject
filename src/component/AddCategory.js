import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { Icon, Form, Input } from 'semantic-ui-react'
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/action";
// import Header from '../Header';
import { useNavigate } from 'react-router-dom';
const AddCategory = () => {
    const categories = useSelector(x => x.categories);

    const [categoryToAdd, setCategoryToAdd] = useState('');
    const navigate = useNavigate();

    const addCategory = (data) => {
        console.log(categories);
        console.log(data);
    
            axios.post("http://localhost:8080/api/category", {
                Name: data.category
            })
                .then(x => {
                    dispatch({ type: actions.ADD_CATEGORY, c: x.data })
                    console.log(x.data);
                    navigate('/recipeform')
                }
                )
                .catch(err => {
                    console.log(err);
                    alert(err.response.data);
                    
                })
       
    }
    
    const newCat = (event) => {
        setCategoryToAdd(event.target.value);
    };
    const {
        register,
        handleSubmit,
    } = useForm({
    })
    const dispatch = useDispatch();
    
    const nav = () => {
        navigate("/recipes")
    }
    return <>
        <form class=" six wide column" onSubmit={handleSubmit(addCategory)}>
            <div class="ui card">
                <div class="content">
                    <button class="ui button " type="submit" 
                    
                    >Add Category</button>
                    <input class="ui input content" placeholder="category to add" {...register("category")}onChange={newCat}></input>
                </div>
                </div>
        </form>
    </>
}
export default AddCategory;
