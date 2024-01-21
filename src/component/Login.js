// import { useEffect, useState } from 'react';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../store/action';

const schema = yup
    .object({
        userName: yup.string().required("This field is required"),
        password: yup.string().required("This field is required"),
    })
    .required()

const Login = () => {
    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getRecipes = () => {
        axios.get("http://localhost:8080/api/recipe")
            .then(r => {
                dispatch({ type: actions.SET_RECIPE, recipes: r.data });
            })
            .catch(err => console.log(err))
    }
     const getBays = (id) => {
        axios.get(`http://localhost:8080/api/bay/${id}`)
            .then(spl => {
                dispatch({ type: actions.SET_SHP_LST, shopinglist: spl.data });
    
            })
            .catch(err => console.log(err))
    }
     const getCategories = () => {
       return axios.get("http://localhost:8080/api/category")
                .then(x => {
                dispatch({ type: actions.SET_CATEGORIES,ctgrs: x.data });
    
                })
                .catch(err => console.log(err))
    }
    const submit = (data) => {
        axios.post("http://localhost:8080/api/user/login", { Username: data.userName, Password: data.password })
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    navigate("/homepage");
                    dispatch({ type: actions.SET_USER, user: res.data });
                    // getRecipes();
                    // getBays(res.data.Id);
                    getCategories();
                } else {
                    console.error("Error:", res.status);
                }
            })
            .catch((error) => {
                console.error("Error:", error.message);
                navigate("/signup");
            });
    }
    return (<div class="container">
        <form class="ui form" onSubmit={handleSubmit(submit)}>
            <div class="field">
                <label>User Name</label>
                <div class="ui left icon input">
                <input type="text"  placeholder='user name' {...register("userName")} />
                <i class="user icon"></i>
                </div>
                <p>{errors.userName?.message}</p>
            </div>
            <div class="field">
                
                <label>Password</label>
                <div class="ui left icon input">
                <input type="password"  placeholder='password' {...register("password")} />
                <i class="lock icon"></i>
                </div>
                <p>{errors.password?.message}</p>
            </div>
            <input class="ui button" type="submit" value="Log in" />

        </form>
        <Link to="/signup">you don't have an acoount? sign up</Link>

    </div>);
}

export default Login;