
import { useState } from 'react'
import './home.css'

import { Link } from 'react-router-dom'

import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { useNavigate } from 'react-router-dom'

export default function Home(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate();

  async function handleLogin(evento){
    evento.preventDefault();

    if(email !== '' && password !== ''){
      
      await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // navegar para /admin
        navigate('/admin', { replace: true } )
      })
      .catch((erro) => {
        alert('Erro ao fazer login,tente mais tarde!')

        console.log("ERRO AO FAZER O LOGIN",erro)
      })

    }else{
      alert("Preencha todos os campos!")
    }


  }


  return(
    <div className="home-container">
      <h1>Lista de tarefas</h1>
      <span className="home-subtitulo">Gerencie sua agenda de forma rapida e fácil.</span>

      <form className="form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Digite seu email..."
          value={email}
          onChange={(evento) => setEmail(evento.target.value) }
        />

        <input
          type="password"
          placeholder="******"
          value={password}
          onChange={(evento) => setPassword(evento.target.value) }
        />

        <button type="submit" >Acessar</button>
      </form>

      <Link className="button-link" to="/register">
        Não possui uma conta? Cadastre-se
      </Link>

    </div>
  )
}