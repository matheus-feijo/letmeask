import {ButtonHTMLAttributes} from "react";
import "../styles/button.scss";

type buttonType = ButtonHTMLAttributes<HTMLButtonElement>


export function Button(props:buttonType){
    return(
        <div id="customize-buttons">
            <button className={props.name} {...props}/>
        </div>
        
    )
}