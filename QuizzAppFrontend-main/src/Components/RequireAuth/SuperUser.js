import { Navigate } from "react-router-dom";
import { checkAccess } from "../../utils";

function Guest (props){
    checkAccess();
    let is_superuser=props?.is_super;
    
    return(
        <div>
            {
                is_superuser?props.children:<Navigate to={"/unauthorized"}/>
            }
        </div>
    );
}
export default Guest;