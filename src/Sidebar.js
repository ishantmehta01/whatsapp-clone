import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import { Avatar, IconButton } from '@material-ui/core'
import DonutLarge from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVerticalIcon from '@material-ui/icons/MoreVert'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import SidebarChat from './SidebarChat'
import db from './firebase'
import { useStateValue } from './StateProvider'
import './Sidebar.css'

function Sidebar() {
    const [rooms, setRooms] = useState([])
    const [{user}] = useStateValue()
    const { roomId } = useParams()

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => {
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })

        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user && user.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton><DonutLarge/></IconButton>
                    <IconButton><ChatIcon/></IconButton>
                    <IconButton><MoreVerticalIcon/></IconButton>
                </div>
            </div>
            
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search or start a new chat" />
                </div>
            </div>

            <div className="sidebar__body">
                <SidebarChat addNewChat/>
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} isSelected={room.id === roomId}/>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
