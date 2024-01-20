import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { addNewUser } from "../store/user";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import axios from "axios";
import * as actions from '../store/action';


const schema = yup.object({
  Username: yup.string().required("This field is required"),
  Password: yup.string().required("This field is required").min(4, "This field must be 4 charcters or more"),
  Name: yup.string().required("This field is required"),
  Phone: yup.string().required("This field is required").matches(/^[0-9]{10}$/, "The requested format must be adjusted"),
  Email: yup.string().required("This field is required").email("The requested format must be adjusted"),
  Tz: yup.string().required("This field is required")
}).required();

const Signup = () => {
  const [error,setError]=useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const navig = useNavigate();
  const dispatch = useDispatch();
  const submit = (data) => {
    const user = {
      Username: data.Username,
      Password: data.Password,
      Name: data.Name,
      Phone: data.Phone,
      Email: data.Email,
      Tz: data.Tz
    }
    console.log("hgfhgdgf");
    // const res = addNewUser(user);
    axios.post("http://localhost:8080/api/user/sighin", data)
      .then(x => {
        console.log(x.data)
        setError('');
        dispatch({ type: actions.SET_USER, user: x.data });

      })
      .catch(err => {
        setError(err.response.data);
        console.log(err)})//.finally()
   


  }
  return (<>
  {error!=""?
  <div class="ui red message">{error}</div>:null}
    <form class="ui form" onSubmit={handleSubmit(submit)}>
      <div>
        <label>user name:</label>
        <input type="text"  {...register("Username")} />
        <p>{errors.Username?.message}</p>
      </div>
      <div>
        <label>password:</label>
        <input type="text" {...register("Password")} />
        <p>{errors.Password?.message}</p>
      </div>
      <div>
        <label>name:</label>
        <input type="text" {...register("Name")} />
        <p>{errors.Name?.message}</p>
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" {...register("Phone")} />
        <p>{errors.Phone?.message}</p>
      </div>
      <div>
        <label>email:</label>
        <input type="text" {...register("Email")} />
        <p>{errors.Email?.message}</p>
      </div>
      <div>
        <label>identity:</label>
        <input type="text" {...register("Tz")} />
        <p>{errors.Tz?.message}</p>
      </div>
      <input class="ui button" type="submit" value="Sign up" />

    </form>
    <Link to="/login">you have an acoount? log in</Link>
  </>);

}
export default Signup;