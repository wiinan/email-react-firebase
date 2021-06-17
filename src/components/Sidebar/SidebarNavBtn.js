import { Badge } from '@material-ui/core';
import { Inbox, Keyboard, Videocam } from '@material-ui/icons';
import React, { useState } from 'react';
import { useLocalContext } from '../../context/context';
import { useMailContext } from '../../context/MailContext';

export default function SidebarNavBtn() {
    const { drawerOpen } = useLocalContext();
    const [active, setActive] = useState('inbox')
    const { setMailsType, inboxUnreadNo } = useMailContext()

    const updatePrimaryActive = () => {
        setMailsType('Primary')
        setActive('inbox')
    }
    const sentActive = () => {
        setMailsType('Sent')
        setActive('sent')
    }
    return (
        <div className='sidebar__btns'>
            <div className={`sidebar__btn sidebar__topBtn ${!drawerOpen && 'sidebar__btnClose'} ${active === 'inbox' && 'sidebar__active'}`} onClick={updatePrimaryActive}>
                <div className={`sidebar__btnLeft ${!drawerOpen && 'sidebar__btnLeftClose'}`}>
                    {drawerOpen ? (
                        <>
                            <Inbox className='sidebar__icon' />
                            <p>Inbox</p>
                        </>) : (
                        <Badge badgeContent={0} color='error'>
                            <Inbox className='sidebar__icon' />
                        </Badge>
                    )}
                </div>
                <div className={`sidebar__unread ${!drawerOpen && 'sidebar__unreadClose'}`}>
                    <p>{inboxUnreadNo}</p>
                </div>
            </div>
            <div onClick={sentActive} className={`sidebar__btn sidebar__topBtn ${!drawerOpen && 'sidebar__btnClose'} ${active === 'sent' && 'sidebar__active'}`}>
                <div className={`sidebar__btnLeft ${!drawerOpen && 'sidebar__btnLeftClose'}`}>
                    {drawerOpen ? (
                        <>
                            <Inbox className='sidebar__icon' />
                            <p>Enviados</p>
                        </>) : (
                        <Badge badgeContent={0} color='error'>
                            <Inbox className='sidebar__icon' />
                        </Badge>
                    )}
                </div>
                <div className={`sidebar__unread ${!drawerOpen && 'sidebar__unreadClose'}`}>
                </div>
            </div>
            <SideDummyButtons />
            <SideDummyButtons />
            <SideDummyButtons />
            <SideDummyButtons />
            <SideDummyButtons />
            <SideDummyButtons />
            <SideDummyButtons />
        </div>
    )
}
const SideDummyButtons = () => {
    const { drawerOpen } = useLocalContext();
    return (
        <div className={`sidebar__btn sidebar__topBtn ${!drawerOpen && 'sidebar__btnClose'}`}>
            <div className={`sidebar__btnLeft ${!drawerOpen && 'sidebar__btnLeftClose'}`}>
                {drawerOpen ? (
                    <>
                        <Inbox className='sidebar__icon' />
                        <p>Inbox</p>
                    </>) : (
                    <Badge badgeContent={0} color='error'>
                        <Inbox className='sidebar__icon' />
                    </Badge>
                )}
            </div>
            <div className={`sidebar__unread ${!drawerOpen && 'sidebar__unreadClose'}`}>
            </div>
        </div>
    )
}
export function MeetBtns() {
    const { drawerOpen } = useLocalContext();
    return (
        <div className='navbar__meetOptions'>
            <p className='navbar__meetTitle'>Meet</p>
            <div className={`sidebar__btn sidebar__topBtn ${!drawerOpen && 'sidebar__btnClose'}`}>
                <div className={`sidebar__btnLeft ${!drawerOpen && 'sidebar__btnLeftClose'}`}>
                    {drawerOpen ? (
                        <>
                            <Videocam className='sidebar__icon' />
                            <p>Nova Reuniao</p>
                        </>) : (
                        <Videocam className='sidebar__icon' />
                    )}
                </div>
                <div className={`sidebar__unread ${!drawerOpen && 'sidebar__unreadClose'}`}>
                </div>
            </div>
            <div className={`sidebar__btn sidebar__topBtn ${!drawerOpen && 'sidebar__btnClose'}`}>
                <div className={`sidebar__btnLeft ${!drawerOpen && 'sidebar__btnLeftClose'}`}>
                    {drawerOpen ? (
                        <>
                            <Keyboard className='sidebar__icon' />
                            <p>Entrar em Reuniao</p>
                        </>) : (
                        <Keyboard className='sidebar__icon' />
                    )}
                </div>
                <div className={`sidebar__unread ${!drawerOpen && 'sidebar__unreadClose'}`}>
                </div>
            </div>
        </div>
    )
}