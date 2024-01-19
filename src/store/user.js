import axios from "axios"


export function addNewUser(data) {
    const res = axios.post("http://localhost:8080/api/user/sighin", data)
    .then(x => {
        console.log(x.data)
    })
    .catch(err => console.log(err)).finally()
    return res;
}
