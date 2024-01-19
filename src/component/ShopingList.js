import axios from "axios";
import * as actions from '../store/action'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const ShopingList = () => {

    const [name, setName] = useState('');
    const [c, setC] = useState(0);
    const shplist = useSelector(state => state.shoplist);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    // console.log(shplist);
    return (<>
        <ul>{shplist.map((i) => (
            <li>{i.Name}-{i.Count}
                <button onClick={() => {
                    axios.post(`http://localhost:8080/api/bay`, { Name: i.Name, UserId: user.Id, Count: i.Count + 1 }).then((x) => {
                        dispatch({ type: actions.ADD_TO_SHPLST, prod: x.data })
                    }).catch((error) => console.error(error))
                }}>+</button>

                <button onClick={() => {
                    axios.post(`http://localhost:8080/api/bay/delete/${i.Id}`, i.Id)
                        .then(() => {
                            dispatch({ type: "DEL_TO_SHPLST", id: i.Id })
                        }).catch((error) => console.error(error))
                }}><i class='trash alternate outline icon'> </i></button></li>
        ))}
        </ul>
        <form>
            <input placeholder="name"type="text" onChange={(e) => setName(e.target.value)}></input>
            <input placeholder="count" type="number" onChange={(e) => setC(e.target.value)}></input>
            <button onClick={() => {
                axios.post(`http://localhost:8080/api/bay`, { Name: name, UserId: user.Id, Count: c}).then((x) => {
                    dispatch({ type: actions.ADD_TO_SHPLST, prod: x.data })
                }).catch((error) => console.error(error))
            }}>add product to shopping list</button>
        </form>
    </>);
}

export default ShopingList;