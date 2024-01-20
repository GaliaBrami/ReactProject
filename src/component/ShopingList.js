import axios from "axios";
import * as actions from '../store/action'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { useState } from "react";

const ShopingList = () => {
    const getBays = (id) => {
        axios.get(`http://localhost:8080/api/bay/${id}`)
            .then(spl => {
                dispatch({ type: actions.SET_SHP_LST, shopinglist: spl.data });
                // console.log(spl);
    
            })
            .catch(err => console.log(err))
    }
    const user=useSelector(x=>x.user);
    const shplist = useSelector(state => state.shoplist);
    useEffect(() => {
        getBays(user.Id)
    }, [shplist])

    // const [name, setName] = useState('');
    // const [c, setC] = useState(0);
    // const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    return (<>
        <ul>{shplist.map((i) => (
            <li key={i.Id}>{i.Name}-{i.Count}
                <button class="ui button" onClick={() => {console.log(i)
                    axios.post(`http://localhost:8080/api/bay/edit`,
                     { Name: i.Name, UserId: user.Id, Count: parseFloat(i.Count) + 1 })
                    .then((x) => {
                        dispatch({ type: actions.UPDATE_TO_SHPLST, prod: x.data })
                    }).catch((error) => console.error(error))
                }}>+</button>

                <button class="ui button" onClick={() => {
                    axios.post(`http://localhost:8080/api/bay/delete/${i.Id}`, i.Id)
                        .then((x) => {
                            dispatch({ type: "DEL_TO_SHPLST", id:x.data.Id })
                        }).catch((error) => console.error(error))
                }}><i class='trash alternate outline icon'> </i></button></li>
        ))}
        </ul>
        {/* <form>
            <input class="ui input" placeholder="name"type="text" onChange={(e) => setName(e.target.value)}></input>
            <input class="ui input" placeholder="count" type="number" onChange={(e) => setC(e.target.value)}></input>
            <button class="ui button" onClick={() => {
                axios.post(`http://localhost:8080/api/bay`, { Name: name, UserId: user.Id, Count: c}).then((x) => {
                    dispatch({ type: actions.ADD_TO_SHPLST, prod: x.data })
                }).catch((error) => console.log(error))
            }}>add product to shopping list</button>
        </form> */}
    </>);
}

export default ShopingList;