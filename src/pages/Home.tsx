import {useHistory} from "react-router-dom";

import illustration from "../assets/images/illustration.svg"
import logo from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google-icon.svg";
import "../styles/home.scss";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";


export function Home(){
    const history = useHistory();
    const { user,signIn} = useAuth();


    const handleCreateRoom = async() =>{
        //
        if(!user){
            await signIn();
        }

        history.push("/rooms/new");
    }

    

    
    return(
        <div>
            <aside className="background">

                <img src={illustration} alt="imagem de fundo"></img>
                <strong>Toda pergunta tem uma resposta.</strong>
                <p>Aprenda e compartilhe conhecimento com outras pessoas</p>

            </aside>

            <main>
                <div className="form-enter">
                    <img src={logo} alt="logo" className="logo"></img>
                    <Button name="button-google-icon" onClick={handleCreateRoom}>
                        <img src={googleIcon} alt="iconGoogle" className="img-icon-google"></img>
                        Crie sua sala com o google
                    </Button>
                    <div className="div-risco">ou entre em uma sala</div>
                    <form onSubmit={(e)=>{e.preventDefault()}}> 
                        <input 
                            type="text"
                            placeholder="digite seu codigo"
                        />
                        <Button 
                            name="button-entrar"
                            type="submit"
                        >
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}