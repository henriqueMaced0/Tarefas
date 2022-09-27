import { useState } from 'react'

import { Link } from 'react-router-dom'
import { auth } from '../../services/firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate();

  async function handleRegister(evento){
    evento.preventDefault();

    if(email !== '' || password !== '' && name !== ''){
      await createUserWithEmailAndPassword(auth, email,name, password)
      .then(() => {
        navigate('/admin', { replace: true })
      })
      .catch(() => {
        alert('Erro ao fazer o cadastro,tente novamente!')
        console.log("ERRO AO FAZER O CADASTRO")
      })


    }else{
      alert("Preencha todos os campos!")
    }

  }
  


  return(
    <div className="home-container">
      <h1>Cadastre-se</h1>
      <span className="home-subtitulo" >Vamos criar sua conta!</span>

      <form className="form" onSubmit={handleRegister}>
        <input
          type="text"
          className='input-cpf'
          placeholder="Digite seu nome..."
          maxLength="14"
          value={name}
          onChange={(evento) => setName(evento.target.value) }
        />
        <input
          type="email"
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

        <button type="submit" >Cadastrar</button>
      </form>

      <Link className="button-link" to="/">
        Já possui uma conta? Faça login!
      </Link>

    </div>
  )
}