import React, { useState } from 'react';
import './styles.css';
import { TextField, Button, CircularProgress, FormControlLabel, Checkbox } from '@material-ui/core';
import Signup from '../Signup/Signup';
import { auth } from '../../lib/firebase';

export default function Signin() {
    const [showSignup, setShowSignup] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState({ state: false, msg: '' });
    const [passwordError, setPasswordError] = useState({ state: false, msg: '' });
    const [checked, setChecked] = useState(false);
    const toggleSignUp = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setShowSignup(false)
            setLoading(false);
        }, 500);
    }
    const signin = (e) => {
        e.preventDefault();
        setLoading(true);
        auth.signInWithEmailAndPassword(email, password).then(() => {
            setEmailError({state: false, msg: ''})
            setPasswordError({state: false, msg: ''})
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            if (err.code === 'auth/wrong-password') {
                setEmailError({state: false, msg: ''})
                setPasswordError({ state: true, msg: 'Senha Invalida' })
            } else if (err.code === 'auth/invalid-email' || err.code === 'auth/user-not-found') {
                setEmailError({state:true, msg:'Email Invalido'})
                setPasswordError({state: false, msg: ''})
            }
        })
    };

    return (
        <div className='login'>
            {showSignup ? (
                <div className='login__content'>
                    {loading && <CircularProgress className='login__loading' />}
                    <div className={`login__wrapper ${loading && 'login__fade'}`}>
                        <img className='login__logo' src='/assets/google.svg' alt='Google' />
                        <p className='login__title'>Entrar</p>
                        <p className='login__subtitle'>Continue no Gmail</p>
                        <form className='login__form'>
                            <TextField id='outlined-basic' className='login__input' label='E-mail' variant='outlined' type='email' value={email} onChange={(e) => setEmail(e.target.value)} error={emailError.state} helperText={emailError.msg}/>
                            <TextField id='outlined-basic' className='login__input' label='Senha' variant='outlined' type={checked ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} error={passwordError.state} helperText={passwordError.msg}/>
                            <FormControlLabel checked={checked} onChange={() => setChecked(!checked)} control={<Checkbox name='chackedB' color='primary' />} label='Mostrar Senha' />
                            <div className='login__infoText'>
                                Não está no seu computador? Use o modo visitante para fazer login com privacidade.
                    <a href='/learnmore'>Leia mais</a>
                            </div>
                            <div className='login__buttons'>
                                <Button className='login__button' color='primary' onClick={toggleSignUp}>Criar Conta ?</Button>
                                <Button className='login__button' color='primary' variant='contained' onClick={signin}>Logar</Button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <Signup showSignup={setShowSignup} />
            )}
        </div>
    )
}