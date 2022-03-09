import { FormEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, database, firebase } from '../services/firebase'
import googleIconImg from '../assets/images/google-icon.svg';
import { AuthContext } from '../contexts/AuthContext'

// css & imgs

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';

export function Home() {
    const navigate = useNavigate();
    const {user, signInWithGoogle} = useAuth();
    const [roomCode, setRoomCode] = useState('');


    async function handleCreateRoom() {
        if(!user) {
           await signInWithGoogle();
        }

        navigate('/rooms/new');

        
    }


    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if(roomCode.trim() == '' || roomCode.trim() === '') {
            alert("Insira um código de sala válido!");
            return;
        }


        const roomRef = await database.ref(`/rooms/${roomCode}`).get();

        if(!roomRef.exists()) {
            alert("Esta sala não existe.");
            return;
        }

        navigate(`/rooms/${roomCode}`);
        
    }


return (
        <div id="page-auth">
            <aside>
            <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />   
            <strong>Crie salas de Q&amp;A ao vivo</strong> 
            <p>Tire as dúvidas da sua audiência em tempo real</p>             
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="LetMeAsk" />

                <button onClick={handleCreateRoom} className="create-room">
                    <img src={googleIconImg} alt="Logo do Google" />
                    Crie sua sala com o Google
                </button>
                    
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                        type="text" 
                        placeholder="Digite o código da sala"
                        onChange={event => setRoomCode(event.target.value)}
                        value={roomCode}
                        ></input>
                        <Button type="submit" >
                        Entrar na sala
                        </Button>
                    </form>
                    
                   


                </div>
            
            </main>
        </div>
)

}