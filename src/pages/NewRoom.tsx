import {Link} from "react-router-dom";

import illustration from "../assets/images/illustration.svg"
import logo from "../assets/images/logo.svg";
import "../styles/home.scss";
import { Button } from "../components/Button";

export function NewRoom(){
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

                    <p className="msg-new-room">Crie uma nova sala</p>
                    <div className="div-risco">ou entre em uma sala</div>
                    <form onSubmit={(e)=>{e.preventDefault()}}> 
                        <input 
                            type="text"
                            placeholder="Nome da sala"
                        />
                        <Button 
                            name="button-entrar"
                            type="submit"
                        >
                            Entrar na sala
                        </Button>
                    </form>
                    <p className="msg-sala-existente">Quer entrar em uma sala ja existente? <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}