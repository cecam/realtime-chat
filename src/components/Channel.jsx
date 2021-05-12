import {useState, useEffect, useRef} from 'react'
import firebase from 'firebase/app'

import Message from './Message'

const Channel = ({db = null, user = null}) => {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    const {uid, displayName, photoURL} = user

    const dummy = useRef();

    useEffect(() => {
        if(db) {
            const unsuscribe = db
                .collection('messages')
                .orderBy('createdAt')
                .limit(50)
                .onSnapshot(querySnapshot => {
                    //Get all documents
                    const data = querySnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id
                    }))
                    setMessages(data)
                })
            return unsuscribe
        }
    }, [db])

    const handlerSubmit = e => {
        e.preventDefault()

        if(db) {
            db.collection('messages').add({
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
            })
        }

        setNewMessage('')

        dummy.current.scrollIntoView({behavior: 'smooth'});
    }

    return ( 
        <div className="channel">
            <ul className="channel__messages">
                {messages.map(message => (
                    <li key={message.id}>
                        <Message {...message} user={user} />
                    </li>
                ))}

                <span ref={dummy}></span>
            </ul>
            <form className="messageForm" onSubmit={handlerSubmit}>
                <input 
                    type="text"
                    onChange={e => setNewMessage(e.target.value)}
                    value={newMessage}
                    placeholder="Type your message here"
                    className="messageForm__input"
                />
                <button 
                    type="submit" 
                    disabled={!newMessage}
                    className="messageForm__btn"
                >
                    >
                </button>
            </form>
        </div>
     );
}
 
export default Channel;