import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { useLocalContext } from './context';

const MailContext = createContext();

export function useMailContext() {
    return useContext(MailContext)
}

export function MailContextProvider({ children }) {
    const [receivedMails, setReceivedMails] = useState([]);
    const [onScreenMails, setOnScreenMails] = useState([]);
    const [sentMails, setSentMails] = useState([]);
    const [mailsType, setMailsType] = useState('Primary');
    const [primaryUnreadNo, setPrimaryUnreadNo] = useState(0);
    const [inboxUnreadNo, setInboxUnreadNo] = useState(0);

    const { currentUser } = useLocalContext();

    useEffect(() => {
        if (currentUser) {
            db.collection('RecivedMails').doc(currentUser.email).collection('mail').onSnapshot((snapshot) => {
                setReceivedMails(snapshot.docs.map(doc => doc.data()))
            })
        }
    }, [currentUser]);

    useEffect(() => {
        if (currentUser) {
            db.collection('sentMails').doc(currentUser.email).collection('mails').onSnapshot((snapshot) => {
                setSentMails(snapshot.docs.map((doc) => doc.data()));
            })
        }
    }, [currentUser])

    useEffect(() => {
        if (mailsType === 'Primary') {
            receivedMails.filter((e) => {
                return e.category === 'Primary'
            })
            setOnScreenMails(receivedMails)
        }
        if (mailsType === 'Sent') {
            setOnScreenMails(sentMails)
        }
        if (mailsType === 'Promotions') {
            receivedMails.filter((e) => {
                return e.category === 'Pomotions'
            })
            setOnScreenMails(receivedMails)
        }
        if (mailsType === 'Social') {
            receivedMails.filter((e) => {
                return e.category === 'Social'
            })
            setOnScreenMails(receivedMails)
        }
        if (mailsType === 'Updates') {
            receivedMails.filter((e) => {
                return e.category === 'Updates'
            })
            setOnScreenMails(receivedMails)
        }
    }, [mailsType, receivedMails, sentMails])

    useEffect(() => {
        setOnScreenMails(receivedMails);
    }, [receivedMails]);

    useEffect(()=>{
        let array = receivedMails.filter((e)=>{
            return e.read === false
        })
        let primaryUnread = array.filter((e)=>{
            return e.category === 'Primary'
        })
        primaryUnread.map((value,index)=>{
            let a = 1 + index;
            setPrimaryUnreadNo(a);
            return a
        })
    },[receivedMails])

    useEffect(()=>{
        let array = receivedMails.filter((e)=>{
            return e.read === false
        })
        array.map((value,index)=>{
            let a = 1 + index;
            setInboxUnreadNo(a);
            return a
        })
    },[receivedMails])

    const value = { onScreenMails, setMailsType, mailsType, primaryUnreadNo, inboxUnreadNo };
    return <MailContext.Provider value={value}>{children}</MailContext.Provider>
}