import React from "react";

class WelcomePage extends React.Component{
    
    constructor(props){
        super(props);
        this.state={};
    }
    
    render(){
        const useName=localStorage.getItem("name");
        return (
            <div className="welcome">
                <div className="title">
                    Welcome
                </div>
            </div>
            
        )
    }
}
export default WelcomePage;