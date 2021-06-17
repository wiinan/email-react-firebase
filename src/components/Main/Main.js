import { Checkbox } from '@material-ui/core';
import { Error, Inbox, LocalOffer, MoreVert, People, Refresh } from '@material-ui/icons';
import React, { useState } from 'react';
import { Mail } from '..';
import { useLocalContext } from '../../context/context';
import { useMailContext } from '../../context/MailContext';
import './style.css'

export default function Main() {
    const { drawerOpen } = useLocalContext();
    const { onScreenMails, mailsType, setMailsType, inboxUnreadNo } = useMailContext();
    const [active, setActive] = useState('Primary');
    const updateActive = (localText, globaltext) => {
        setMailsType(globaltext);
        setActive(localText);
    }
    console.log(mailsType)
    return (
        <div className={`main ${drawerOpen && 'main--fullWidth'}`}>
            <div className='main__controlBtns' >
                <Checkbox color='secondary' className='maill__check' />
                <Refresh />
                <MoreVert />
            </div>
            {mailsType !== 'sent' && (
                <div className='main__tabs'>
                    <div onClick={() => updateActive('Primary', 'Primary')} className={`main__tab ${active === 'Primary' && 'main__tabPrimary--active'}`}>
                        <Inbox />
                        <p>Principal</p>
                        {inboxUnreadNo !== 0 && (<div className='mail__unread primary--unread'>{inboxUnreadNo} new</div>)}
                    </div>
                    <div onClick={() => updateActive('Social', 'Social')} className={`main__tab ${active === 'Social' && 'main__tabSocial--active'}`}>
                        <People />
                        <p>Social</p>
                        <div className='mail__unread social--unread'>5 new</div>
                    </div>
                    <div onClick={() => updateActive('Promotions', 'Promotions')} className={`main__tab ${active === 'Promotions' && 'main__tabPromotions--active'}`}>
                        <LocalOffer />
                        <p>Promocional</p>
                        <div className='mail__unread promotions--unread'>5 new</div>
                    </div>
                    <div onClick={() => updateActive('Updates', 'Updates')} className={`main__tab ${active === 'Updates' && 'main__tabUpdates--active'}`}>
                        <Error />
                        <p>Importante</p>
                        <div className='mail__unread updates--unread'>5 new</div>
                    </div>
                </div>
            )}
            <div className='main__mails'>
                {onScreenMails.map((mail, index) => {
                    return <Mail key={index} data={mail} />
                })}
            </div>
        </div>
    )
}