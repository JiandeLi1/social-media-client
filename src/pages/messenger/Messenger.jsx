import React, { Fragment, useContext, useState, useEffect, useRef} from 'react'
import './messenger.css'
import TopBar from "../../components/topbar/TopBar"
import Conversation from '../../components/conversations/Conversations'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { AuthContext } from '../../context/AuthContext'
import axios from "axios"
import { io } from "socket.io-client"

export default function Messenger() {
    const [conversations, setConversation] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const socket = useRef()
    const { user } = useContext(AuthContext)
    const scrollRef = useRef()

    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createAt: Date.now(),
            })
        })
    }, [])
    
    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages(prev=>[...prev, arrivalMessage])
    },[arrivalMessage, currentChat])

    useEffect(() => {
        //Take the socket from websocket port
        // setSocket(io("ws://localhost:8900"))
        // console.log(socket)

        //Set the name call addUser
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", users => {
            setOnlineUsers(
                user.followings.filter((f)=>users.some(u=> u.userId===f)))
        })
    }, [user])

   

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/conversations/" + user._id)
                setConversation(res.data)
                
            } catch (err) {
                console.log(err)
            }
        }
        getConversations()
    }, [user._id])
    
    useEffect(() => {
        const getMessage = async () => {
            try {
                const res = await axios.get("/messages/" + currentChat._id)
                setMessages(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getMessage()
    }, [currentChat])


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    },[messages])
    
    const handleSubmit =async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        }

        const receiverId = currentChat.members.find(member=>member !== user._id)

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        })

        try {
            const res = await axios.post("/messages", message);
            setMessages([...messages, res.data])
            setNewMessage("")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Fragment>
            <TopBar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        {
                            conversations.map(c => (
                                <div onClick={()=> setCurrentChat(c)}>
                                    <Conversation key={c.conversationId}
                                    conversation={c}
                                    currentUser={user} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ?
                                <Fragment>
                                    <div className="chatBoxTop">
                                        {
                                            messages.map(m => (
                                                <div ref={ scrollRef }>
                                                    <Message key={m._id}
                                                    message={m}
                                                    own={m.sender === user._id} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="chatBoxBottom">
                                        <textarea className="chatMessageInput"
                                            placeholder="write somthing..."
                                            onChange={e => setNewMessage(e.target.value)}
                                            value={ newMessage }
                                        />
                                        <button className="chatSubmitButton"
                                            onClick={handleSubmit}
                                        >Send</button>
                                    </div>
                                </Fragment> :
                                <span className="noConversation">Open a conversations to start a chat</span>}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline
                            onlineUsers={onlineUsers}
                            currentId={user._id}
                            setCurrentChat = { setCurrentChat }
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
