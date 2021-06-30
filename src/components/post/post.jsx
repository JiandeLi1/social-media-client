import React, {  useContext, useState, useEffect } from 'react'
import { MoreVert } from '@material-ui/icons'
import axios from 'axios'
import { format } from "timeago.js"
import { Link } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
import './post.css'

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length)
    const [isLike, setIsLike] = useState(false)
    const [user, setUser] = useState({})
    const { user:currentUser } =useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    
    useEffect(() => {
        setIsLike(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes])

    const likeHandler = () => {
            try {
                axios.put("http://localhost:8800/api/posts/" + post._id + "/like", { userId: currentUser._id })
            } catch (error) {
            
            }
            setLike(isLike ? like - 1 : like + 1)
            setIsLike(!isLike)
    }
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:8800/api/users?userId=${post.userId}`);
            setUser(res.data)
        }
        fetchUser()
    }, [post.userId])
    
   

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img src={user.profilePicture ? PF+user.profilePicture : PF + "person/noAvatar.jpg"}
                                 alt=""
                                 className="postProfileImg" />
                        </Link>
                        <span className="postUsername">
                            { user.username}
                        </span>
                        <span className="postDate">{ format(post.createdAt) }</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <div className="postText">
                        { post.desc }
                    </div>
                    <img src={ PF+post.img } alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src={`${PF}img/like.png`} onClick={ likeHandler } alt="" />
                        <img src={`${PF}img/heart.png`} onClick={ likeHandler } alt="" />
                        <span>{ like } people liked this post!</span>
                    </div>
                    <div className="postBottomRight">
                        <span>{ post.comment } comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
