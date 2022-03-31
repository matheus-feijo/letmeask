import { useState } from "react";
import {createContext} from "react";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useEffect } from "react";
import { ReactNode } from "react";

type User = {
    id:string;
    name:string;
    avatar:string;
}

type authProps = {
    user:User | undefined,
    signIn: () => Promise<void>
}

type authContextProvider= {
    children: ReactNode
}

export const authContext = createContext({} as authProps);

export function AuthProvider(props:authContextProvider){
    
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

    useEffect(()=>{
        const unsubscribe = getAuth().onAuthStateChanged(user=>{
                if (user) {
                    const { displayName, photoURL, uid } = user
            
                    if (!displayName || !photoURL) {
                      throw new Error('Missing information from Google Account.');
                    }
            
                    setUser({
                      id: uid,
                      name: displayName,
                      avatar: photoURL
                    })
                  }     
        });
        return () =>{
            unsubscribe();
        }
    },[]);
 

    return(
        <authContext.Provider value={{
            user,signIn
        }}>
            {props.children}

        </authContext.Provider>
    )
}