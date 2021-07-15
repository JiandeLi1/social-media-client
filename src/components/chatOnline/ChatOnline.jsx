import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './chatOnline.css'

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {

    const [friends, setFriends] = useState([])
    const [onlineFriends, setOnlineFriends] = useState([])
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get("/users/friends/" + currentId)
            setFriends(res.data)
        }
        getFriends()
    }, [currentId])
    
    useEffect(() => {
        setOnlineFriends(friends.filter(f=>onlineUsers.includes(f._id)))
    },[friends, onlineUsers])
    
    const handleClick = async (user) => {
        try {
            const res = await axios.get(`/conversations/find/${currentId}/${user._id}`)
            setCurrentChat(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div class="chatOnline">
            {onlineFriends.map(f => (
                <div className="chatOnlineFriend" onClick={() => { handleClick(f)}}>
                <div className="chatOnlineImgContainer">
                        <img src={ f.profilePicture ? PF + f.profilePicture : PF + "person/noAvatar.jpg"}
                         className="chatOnlineImg"
                         alt="" />
                    <div className="chatOnlineBadge">

                    </div>
                </div>
                    <span className="chatOnlineName">{ f.username}</span>
            </div>  
            ))}
        </div>
    )
}
