import { Button, Checkbox, CircularProgress, FormControlLabel, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { auth } from '../../lib/firebase';
import './Signup.css';

const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export default function Signup({ showSignup }) {

    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [passwordError, setPasswordError] = useState({ state: false, msg: '' });
    const [emailError, setEmailError] = useState({ state: false, msg: '' })
    const toggleSignUp = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            showSignup(true);
            setLoading(false);
        }, 500);
    };
    const createAccount = (e) => {
        e.preventDefault();
        setLoading(true);
        const error = formData.password === formData.confirmPassword
        if (!error) {
            setPasswordError({ state: true, msg: 'Senhas Diferentes' })
            setFormData({ ...formData, confirmPassword: '' })
            setLoading(false)
            return;
        } else {
            setEmailError({ state: false, msg: '' })
            setPasswordError({ state: false, msg: '' })
        }
        auth.createUserWithEmailAndPassword(formData.email, formData.password).then(() => {
            auth.currentUser.updateProfile({
                displayName: `${formData.firstName} ${formData.lastName}`
            }).then(() => {
                setLoading(false);
                setEmailError({ state: false, msg: '' })
            })
        }).catch((error) => {
            console.log(error.code)
            if (error.code === 'auth/email-already-in-use') {
                setEmailError({ state: true, msg: 'E-mail já Existe' })
                setLoading(false)
                setFormData({ ...formData, email: '' })
                setEmailError({ state: false, msg: '' })
            } else if (error.code === 'auth/invalid-email') {
                setEmailError({ state: true, msg: 'E-mail Invalido' })
                setLoading(false);
                setFormData({ ...formData, email: '' })
                setPasswordError({ state: false, msg: '' })
            } else if (error.code === 'auth/weak-password') {
                setPasswordError({ state: true, msg: 'Senha Fraca, utilize 8 caracteres.' })
                setLoading(false)
                setFormData({ ...formData, password: '' })
                setPasswordError({ state: false, msg: '' })
            }
        });
    }
    const buttonDisabled = !formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword;

    return (
        <div className='signup__container'>
            <div className={`signup ${loading && 'login__fade'}`}>
                {loading && <CircularProgress className='signup__loading' />}
                <div className='login__loading signup__loading' />
                <div className='signup__container'>
                    <div className='signup__left'>
                        <img className='login__logo' src='/assets/google.svg' alt='google' />
                        <h1 className='signup__heading'>
                            Crie sua Conta Google
                        </h1>
                        <p className='signup__subheading'>Continue no Gmail</p>
                        <div className='signup__inputs'>
                            <div className='signup__nameInputs'>
                                <TextField id='outline-basic' label='Nome' variant='outlined' className='login__nameInput' value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                                <TextField id='outline-basic' label='SobreNome' variant='outlined' className='login__nameInput' value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                            </div>
                            <TextField id='outline-basic' label='E-mail' fullWidth variant='outlined' type='email' className='login__nameInput' error={emailError.state} helperText={emailError.msg ? emailError.msg : 'Você pode utilizar letras, números e pontuações.'} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            <div className='signup__passwordInputs'>
                                <div className='signup__passwordWrapper'>
                                    <TextField id='outline-basic' label='Senha' type={checked ? 'text' : 'password'} variant='outlined' className='signup__passwordInput' error={passwordError.state} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                    <TextField id='outline-basic' label='Confirme a senha' type={checked ? 'text' : 'password'} variant='outlined' className='signup__passwordInput' error={passwordError.state} value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
                                </div>
                                <p className={`signup__helpertext ${passwordError.state && 'signin__error'}`}>{passwordError.msg ? (passwordError.msg) : 'Use no minino 8 caracteres com letras, numeros e caracteres especiais'}</p>
                                <FormControlLabel checked={checked} onChange={() => setChecked(!checked)} control={<Checkbox name='chackedB' color='primary' />} label='Mostrar Senha' />
                            </div>
                            <div className='signup__buttons'>
                                <Button className='signup__button' variant='text' color='primary' onClick={toggleSignUp}>Faça login em vez disso</Button>
                                <Button className='signup__button' variant='contained' color='primary' onClick={createAccount} disabled={buttonDisabled}>Registrar</Button>
                            </div>
                        </div>
                    </div>
                    <figure className='signup__figure'>
                        <img className='signup__figureImg' src='https://ssl.gstatic.com/accounts/signup/glif/account.svg' alt='account' />
                        <figcaption className='signup__figcaption'>
                            One account. All of google working for you.
                            </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    )
}