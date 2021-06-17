import { Checkbox } from '@material-ui/core';
import { Label, LabelOutlined, Star, StarBorder } from '@material-ui/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocalContext } from '../../context/context';
import { db } from '../../lib/firebase';
import './style.css'

export default function Mail({ data }) {
    const [starred, setStarred] = useState(false);
    const [important, setImportant] = useState(false);
    const { currentUser } = useLocalContext();
    const history = useHistory();
    const updateRead = () => {
        history.push(`/${data.id}`)
        if (data.read === false) {
            db.collection('RecivedMails').doc(currentUser.email).collection('mail').doc(data.id).update({ ...data, read: true })
        }
    }
    return (
        <div className={`mail ${data.read === false && 'mail--unread'}`} onClick={updateRead}>
            <Checkbox className='mail--colorGray mail--hoverBlack' />
            {starred ? (
                <Star onClick={() => setStarred(!starred)} className='mail--Yellow' />
            ) : (
                <StarBorder onClick={() => setStarred(!starred)} className='mail--colorGray mail--hoverBlack' />
            )}
            {important ? (
                <Label onClick={() => setImportant(!important)} className='mail--Yellow mail__label' />
            ) : (
                <LabelOutlined onClick={() => setImportant(!important)} className='mail--colorGray mail--hoverBlack mail__label' />
            )}
            <div className='mail__texts'>
                <p className='mail__text'>{data.senderName}</p>
                <div className='mail__titleSubtitle'>
                    <p className='mail__text'>{data.subject}</p>
                    <p className='mail__text mail__body'>{" "} -{data.body}</p>
                </div>
                <p className='mail__text'>{ }</p>
            </div>
        </div>
    )
}