import { useState } from "react";
import {createContext} from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

type User = {
    id:string,
    name:string,
    avatar:string
}

type authProps = {
    children:JSX.Element[],
    User:User | undefined,
    signIn: () => void
}

export const authContext = createContext({} as authProps);

export function AuthProvider(props:authProps){
    
    const [user,setUser] = useState<User>();

    const signIn = async() =>{
        const provider = new GoogleAuthProvider();

        const result = await signInWithPopup(getAuth(),provider);
        console.log(result);
        if(result.user){
            const {displayName,photoURL,uid} = result.user
            
            if(!displayName || !photoURL){
                throw new Error("missing information from google account");
            }

            setUser({
                id: uid,
                name:displayName,
                avatar:photoURL,
            })
        }

        
    }
 

    return(
        <authContext.Provider value={{
            user,signIn
        }}>
            {props.children}

        </authContext.Provider>
    )
}