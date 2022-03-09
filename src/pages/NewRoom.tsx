import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, FormEvent } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

// css & imgs
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

export function NewRoom() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        console.log(newRoom);
    
        
        if(newRoom.trim() == '' || newRoom.trim() === '') {
            alert("Insira um código de sala correta!");
            return;
        }



        const roomRef = database.ref('rooms');

        // push para listas & set para single lines
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });


        navigate(`/rooms/${firebaseRoom.key}`);

    
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
                    <h3>Olá, {user?.name}</h3>
                    <h2>Crie uma nova sala</h2>
                    
                    <form onSubmit={handleCreateRoom}>
                        <input type="text" 
                        placeholder="Nome da sala"
                        onChange={event => setNewRoom(event.target.value)}
                        value={newRoom}
                       
                        ></input>
                        <Button type="submit" >
                        Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala já existente? <Link to="/">clique aqui</Link></p>
                    
                   


                </div>
            
            </main>
        </div>
)

}