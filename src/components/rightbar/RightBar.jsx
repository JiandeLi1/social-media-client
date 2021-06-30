import React, { useEffect, useState, useContext} from 'react'
import { Users } from "../../dummyData";
import './RightBar.css'
import OnlineFriend from '../onlineFriend/onlineFriend'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext"
import { Add, Remove } from "@material-ui/icons"

export default function RightBar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [friends, setFriends] = useState([])
    //We set the currentUser equal context user
    const { user: currentUser,
            dispatch
            } = useContext(AuthContext)
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id))

    // useEffect(() => {
    //     setFollowed(currentUser.followings.includes(user?.id))
    // }, [currentUser, user.id])

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get(`http://localhost:8800/api/users/friends/${user._id}`)
                setFriends(friendList.data)
            } catch (err) {
                console.log(err)
            }
        }
        getFriends()
    }, [user])

    const handleClick = async () => {
        try {
            if (followed) {
                await axios.put(`http://localhost:8800/api/users/${user._id}/unfollow`,
                    { userId: currentUser._id })
                dispatch({type:"UNFOLLOW", payload:user._id})
            } else {
                await axios.put(`http://localhost:8800/api/users/${user._id}/follow`,
                    { userId: currentUser._id })
                 dispatch({type:"FOLLOW", payload:user._id})
            }
        } catch (err) {
            console.log(err)
        }
        setFollowed(!followed)
    }


    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img src="/assets/img/gift.png" alt="" className="birthdayImg" />
                    <span className="birthdayText">
                        Today is <b>Alex</b> and <b> 5 other friends</b> birthday
                    </span>
                </div>
                <h4 className="rightbarTitle">Online Friend</h4>
                <ul className="rightbarFriendList">
                    {Users.map(u => (<OnlineFriend key={ u.id} user={ u }/>))}
                </ul>
                
            </>
        )
    }

   
    const ProfileRightbar = () => {
        return (<>
                    {user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={ handleClick }>
                    { followed ? "Unfollow" : "Follow"}
                    { followed ? <Remove /> : <Add />}
                        </button>
                    )}
                    <h4 className="rightbarTitle"> Infomation </h4>
                    <div className="rightbarInfo">
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue"> { user.city} </span>
                        </div>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoValue"> { user.from } </span>
                        </div>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoValue"> {
                        user.relationship === 1 ? "Single" :
                        user.relationship === 2 ? "Married" :
                        "-"        
                        } </span>
                        </div>
                    </div>
                    <h4 className="rightbarTitle"> Your friends </h4>
                    <div className="rightbarFollowings">
                {friends.map(friend => (
                    <Link to={ friend.username}
                        style={{
                            textDecoration: "none",
                            textAlign:"center"
                        }}>
                        <div className="rightbarFollowing">
                            <img src={  friend.profilePicture ?
                                        PF + friend.profilePicture :
                                        PF + "person/noAvatar.jpg"
                                        }
                                 alt=""
                                 className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName">{ friend.username }</span>
                        </div>
                    </Link>
                ))}
                        </div>
                         <div>
                
                    </div>

                </>
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                { user ? ProfileRightbar() : HomeRightbar() }
            </div>
        </div>
    )
}
