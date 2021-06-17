import { Button } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { useLocalContext } from '../../context/context';
import MenuItem from './MenuItem';
import './style.css';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../lib/firebase';

export default function Compose() {
    const { setComposeOpen, setSnackbarMsg, setSnackbarOpen, currentUser, category } = useLocalContext();
    const [recipients, setRecipients] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [id, setId] = useState('');
    useEffect(() => {
        setId(uuidv4());
    }, [])
    const createMailId = () => {
        setId(uuidv4());
    }
    const sendMail = () => {
        setComposeOpen(false);
        createMailId();
        setSnackbarOpen(true);
        setSnackbarMsg('Enviando E-mail...');
        db.collection('sentMails').doc(currentUser.email).collection('mails').doc(id).set({
            id: id, caregory: category, recipients: recipients, subject: subject, body: body, sender: currentUser.email, read: true, senderName: currentUser.displayName
        }).then(() => {
            addRecivedMail();
            setSnackbarMsg('Mail sent');
            setSnackbarOpen(true);
        }).catch((err) => console.log(err))
    };
    const addRecivedMail = () => {
        db.collection('RecivedMails').doc(recipients).collection('mail').doc(id).set({
            id: id, caregory: category, recipients: recipients, subject: subject, body: body, sender: currentUser.email, read: false, senderName: currentUser.displayName
        }).then(() => {
            setSnackbarMsg('Mail sent')
        }).catch((err) => console.log(err))
    }
    return (
        <div className='compose'>
            <div className='compose__container'>
                <div className='compose__header'>
                    <h4>Nova Mensagem</h4>
                    <Close onClick={() => setComposeOpen(false)} className='compose__icon' />
                </div>
                <input className='compose__input' placeholder='Destinatarios' value={recipients} onChange={(e) => setRecipients(e.target.value)} />
                <input className='compose__input' placeholder='Assunto' value={subject} onChange={(e) => setSubject(e.target.value)} />
                <textarea className='compose__textarea' value={body} onChange={(e) => setBody(e.target.value)} />
                <div className='compose__footer'>
                    <div className='compose__footer__container'>
                        <Button className='compose__btn' color='primary' variant='contained' onClick={sendMail} >Enviar</Button>
                        <MenuItem />
                    </div>
                </div>
            </div>
        </div>
    )
}