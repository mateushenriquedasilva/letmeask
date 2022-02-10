import { FormEvent, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import  '../styles/auth.scss';
import { Button } from '../components/Button';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { database } from '../service/firebase';


export function NewRoom(){

    const { user } = useAuth();
    const history = useHistory()
    const [newRoom, setNewRoom] = useState('');

    async function handlerCreateRoom(event: FormEvent) {
        event.preventDefault();

        // remover os espaços em branco
        if(newRoom.trim() === ''){
            return;
        }        

        // enviando dados para o firebase
        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({ 
            title: newRoom,
            authorId: user?.id,
        })

        // O id da sala é passado pelo history(navigete), pegando o id da sala!
        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt="Ilustração simboizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar um nova sala</h2>
                    <form onSubmit={handlerCreateRoom}>
                        <input 
                            type="text"
                            placeholder='Nome da Sala'
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type='submit'>
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? 
                        <Link to="/"> clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}   