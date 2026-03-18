import { useContext } from "react";
import AuthContext from "../context/AuthContext";
const useAuthContext = () => {
    const allcontext = useContext(AuthContext);
    return allcontext ;
}
export default useAuthContext;