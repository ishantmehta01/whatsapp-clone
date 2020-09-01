import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import db from './firebase'

function SidebarChat({ addNewChat, id, name }) {
    const [seed, setSeed] = useState('')
    useEffect(() => {
        setSeed(Math.random() * 5000)
    }, [])

    const handleAdNewChat = () => {
        const roomName = prompt('Please enter name for chat')
        if(roomName) {
            //do something with DB
            db.collection('rooms').add({
                name: roomName
            })
        }
    }

    return addNewChat ? 
        (
            <div className="sidebarChat" onClick={handleAdNewChat}>
                <h2>Add New Chat</h2>
            </div>
        ):
        (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg`}/>
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>Last message...</p>
                </div>
            </div>
        </Link>
    )
}

export default SidebarChat
