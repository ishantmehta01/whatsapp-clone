import React, { useState, useEffect } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic } from '@material-ui/icons'
import { useParams } from 'react-router-dom'
import db from './firebase'
import './Chat.css'

function Chat() {
    const [seed, setSeed] = useState('')
    const [input, setInput] = useState('')
    const [roomName, setRoomName] = useState('')
    const { roomId } = useParams()
    useEffect(() => {
        setSeed(Math.random() * 5000)
    }, [roomId])

    useEffect(() => {
        if(!roomId) return
        db.collection('rooms').doc(roomId).onSnapshot(
            snapshot => setRoomName(snapshot.data().name)
        )
    }, [roomId])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Yoou typed >> `, input)
        setInput('')
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seel at ...</p>
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
                <p className={`chat__message ${true ? 'chat__receiver' : ''}`}>
                    <span className="chat__name">
                        Ishant Mehta
                    </span>
                    Hello guys
                    <span className="chat__timestamp">
                        2hrs ago
                    </span>                    
                </p>
            </div>

            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <form>
                    <input placeholder="Type a message" value={input} onChange={e => setInput(e.target.value)}/>
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
