import { ReactNode } from "react";
import "../styles/question.scss";
import cx from "classnames"

type QuestionProps = {
    content:string,
    author:{
        name:string,
        avatar:string
    },
    children?:ReactNode,
    isHighLighted?:boolean,
    isAnswered?:boolean
}

export function Question({content,author,children,isHighLighted=true,isAnswered=false}:QuestionProps){
    console.log(isHighLighted);
    return(
        <div className={cx("question",
            {answered:isAnswered},
            { highlighted: isHighLighted && !isAnswered },
        )}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name}></img>
                    <span>{author.name}</span>
                </div>

                <div>{children}</div>
            </footer>
        </div>
    )
}