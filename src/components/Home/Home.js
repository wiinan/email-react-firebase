import React from 'react';
import { Header, Sidebar, Compose, Main, ViewMail } from '..';
import { useLocalContext } from '../../context/context';
import SimpleSnackbar from '../Snackbar/Snackbar';
import './Home.css';

export default function Home({ showMails=true, mailData }) {
    const { composeOpen } = useLocalContext();
    return (
        <div className='home'>
            {composeOpen && <Compose />}
            <Header />
            <Sidebar >
                {showMails ? <Main /> : <ViewMail mailData={mailData} />}
            </Sidebar>
            <SimpleSnackbar />
        </div>
    )
}