import { getUser } from "./auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRouter({children, typeuser}){
    const navigate = useNavigate();
    const user = getUser();

    useEffect(()=> {
        if(!user) {
            navigate("/");
            return;
        }

        if(typeuser && !typeuser.includes(user.typeuser)) {
            navigate("/home");
        }
    },[]);
    return children;
     
}

export default ProtectedRouter;