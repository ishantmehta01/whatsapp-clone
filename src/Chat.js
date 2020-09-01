import React, { useState, useEffect } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic } from '@material-ui/icons'
import { useParams } from 'react-router-dom'
import db from './firebase'
import firebase from 'firebase'
import { useStateValue } from './StateProvider'
import './Chat.css'

function scrollToBottom(){
    document.getElementsByClassName('chat__body')[0].scrollTop = document.getElementsByClassName('chat__body')[0].scrollHeight
}

function Chat() {
    const [seed, setSeed] = useState('')
    const [input, setInput] = useState('')
    const [roomName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])
    const [{user}] = useStateValue()

    const { roomId } = useParams()
    useEffect(() => {
        setSeed(Math.random() * 5000)
    }, [roomId])

    useEffect(() => {
        if(!roomId) return
        db.collection('rooms').doc(roomId).onSnapshot(
            snapshot => setRoomName(snapshot.data().name)
        )
          db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
                scrollToBottom()
            })
    }, [roomId])

    const handleSubmit = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        scrollToBottom()
        setInput('')
    }

    const lastSeen = messages[messages.length - 1]?.timestamp?.toDate();
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at {lastSeen ? new Date(lastSeen).toUTCString() : ''}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${(user.displayName === message.name) ? 'chat__receiver' : ''}`}>
                    <span className="chat__name">
                        {message.name}
                    </span>
                    {message.message}
                    <span className="chat__timestamp">
                        {message.timestamp ? new Date(message.timestamp.toDate()).toUTCString() : null}
                    </span>                    
                </p>
                ))}
            </div>

            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <form>
                    <input autoFocus placeholder="Type a message" value={input} onChange={e => setInput(e.target.value)}/>
                    <button onClick={handleSubmit} type="submit">Send message</button>
                </form>
                <IconButton>
                    <Mic />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
