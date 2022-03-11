type buttonType = {
    text?:string,
}


export function Button(props:buttonType){
    return(
        <button>{props.text || "default"}</button>
    )
}