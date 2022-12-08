import styles from './SignIn.module.css'
import { useState } from 'react';
import { toast } from 'react-toastify';
import useProfile from '../../Hooks/useProfile';

import api from '../../services/api';
import { setItem } from '../../utils/cookies';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Input from '../../components/Input';
import Button  from '../../components/Button';
import Logo from '../../components/Logo';

import IconEyeOpen from '../../assets/icon-eye-open.png';
import IconEyeClosed from '../../assets/icon-eye-closed.png';
import Loading from '../../components/Loading';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({email: '', password: ''});
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const { setIsLoadingSignIn } = useProfile();

  const router = useRouter();
  
  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  function handleChangeInput(e) {
    setForm({...form, [e.target.name]: e.target.value})

    if(form.email || form.password) {
      setErrorEmail(false)
      setErrorPassword(false)
    }

  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoadingSignIn(true)

    try {
      if(!form.email) {
        setErrorEmail(true)
        setIsLoadingSignIn(false)
        return
      }

      if(!form.password) {
        setErrorPassword(true)
        setIsLoadingSignIn(false)
        return
      }

      const response = await api.post('/users/login',{
        email: form.email.trim(),
        password: form.password.trim()
      })
     
      const { token, user } = response.data;
      setItem('token', token);
      setItem('userId', user.id);
      setItem('username', user.username)
      
      router.push('/')
      
    } catch (error) {
      console.log(error)
       toast.error(error.response.data.message)
       setIsLoadingSignIn(false)
       return
    }
  }

  return (
    <div className={styles.container}>
      <Logo />
      <form onSubmit={handleSubmit}>
        <div className={styles.content}>
          <h1>Faça o Login</h1>
          <div className={styles.inputContent}>
            <div>
              <label>E-mail</label>
              <Input
                type='email'
                placeholder='Digite seu e-mail'
                name='email'
                value={form.email}
                handle={handleChangeInput}
              />
              { errorEmail && <span>O campo e-mail é obrigatório</span> }
            </div>
            <div className={styles.inputPassword}>
                <label>Senha</label>
                <Input 
                  type={showPassword ? 'text' : 'password'}
                  placeholder='****'
                  name='password'
                  value={form.password}
                  handle={handleChangeInput}
                />
                 { errorPassword && <span>O campo Senha é obrigatório</span> }
                <Image 
                  className={styles.iconEye}
                  src={showPassword ? IconEyeOpen : IconEyeClosed} 
                  alt='icone olho'
                  width={20}
                  onClick={handleShowPassword}
                />
            </div>
          </div> 
          <div className={styles.forgotLink}>
            <Link href={'/forgot'}>Esqueci minha senha</Link>
          </div> 
          <Button 
            text='Entrar'
            handle={handleSubmit}
          >
            <Loading />
          </Button>
          <div className={styles.spanLink}>
            <span>Ainda não é cadastrado? <Link href={'/sign-up'}>Clique aqui!</Link></span>
          </div>
        </div>
      </form>
    </div>
  )
}