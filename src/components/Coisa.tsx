import {useContext} from "react";
import {UserContext} from "../context/UserContext";

export default function Coisa(){
    const {token, user} = useContext(UserContext);
    console.log('user ',user);
    console.log('token ',token);
    return(
        <h1>Oi, {user} </h1>
    )
}