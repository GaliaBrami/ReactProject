import axios from "axios";
import * as actions from '../store/action'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Image = process.env.PUBLIC_URL + '/shopping-list.jpg';
const style={backgroundImage: `url("${Image}")`,backgroundSize: 'cover',width: '100%',
height: '600px'}
const ShopingList = () => {
    const getBays = (id) => {
        axios.get(`http://localhost:8080/api/bay/${id}`)
            .then(spl => {
                dispatch({ type: actions.SET_SHP_LST, shopinglist: spl.data });
    
            })
            .catch(err => console.log(err))
    }
    const user=useSelector(x=>x.user);
    const shplist = useSelector(state => state.shoplist);
    useEffect(() => {
        getBays(user.Id)
    }, [shplist])

    const dispatch = useDispatch();
    return (<div style={style}>

        <ul class="ui list" >{shplist.map((i) => (
            <li key={i.Id}  >{i.Name}-{i.Count}
             <button class="ui button" onClick={() => {
             if(parseFloat(i.Count) - 1>0){
                    axios.post(`http://localhost:8080/api/bay`,
                     { Name: i.Name, UserId: user.Id, Count: parseFloat(i.Count) - 1 })
                    .then((x) => {
                        dispatch({ type: actions.UPDATE_TO_SHPLST, prod: x.data })
                    }).catch((error) => console.error(error))}
                    else{
                        axios.post(`http://localhost:8080/api/bay/delete/${i.Id}`, i.Id)
                        .then((x) => {
                            dispatch({ type: "DEL_TO_SHPLST", id:x.data.Id })
                        }).catch((error) => console.error(error))
                    }
                }}>-</button>
                <button class="ui button" onClick={() => {
                    axios.post(`http://localhost:8080/api/bay`,
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
        
    </div>);
}

export default ShopingList;