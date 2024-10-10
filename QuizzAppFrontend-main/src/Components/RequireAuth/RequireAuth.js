import { Navigate } from "react-router-dom";
import { checkAccess } from "../../utils";
function RequireAuth (props){
    checkAccess();
    const auth=localStorage.getItem('token');
    return(
        
        <div>
            {
                auth?props.children:<Navigate to={"/login"}/>
            }
        </div>
    );
}
export default RequireAuth;