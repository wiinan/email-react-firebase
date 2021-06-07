import React from 'react';
import { Header, Sidebar } from '..';
import './Home.css';

export default function Home(){
    return(
        <div className='home'>
            <Header />
            <Sidebar />
        </div>
    )
}