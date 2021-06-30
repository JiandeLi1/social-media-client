import React, { Fragment, useState, useEffect } from 'react'
import TopBar from '../../components/topbar/TopBar'
import SideBar from '../../components/sidebar/SideBar'
import Feed from '../../components/feed/Feed'
import RightBar from '../../components/rightbar/RightBar'
import axios from 'axios'
import { useParams} from 'react-router'
import './profile.css'

export default function Profile() {
    const [user, setUser] = useState({})
    const username = useParams().username;
    const PF=process.env.REACT_APP_PUBLIC_FOLDER
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:8800/api/users?username=${username}`);
            setUser(res.data)
        }
        fetchUser()
    },[username])
    return (
        <div>
           <Fragment>
            <TopBar />
            <div className="profile">
                    <SideBar />
                    <div className="profileRight">
                        <div className="profileRightTop">
                            <div className="profileCover">
                                <img src={user.coverPicture || PF + "img/noCoverPicture.jpg"} alt="" className="profileCoverImg" />
                                <img src={PF+user.profilePicture || PF + "person/noAvatar.jpg"} alt="" className="profileUserImg" />
                            </div>
                            <div className="profileInfo">
                                <h4 className="profileInfoName">{ user.username }</h4>
                                <span className="profileInfoDesc">
                                    { user.desc }
                                </span>
                            </div>
                        </div>
                        <div className="profileRightBottom">
                            <Feed username={ username} />
                            <RightBar user={ user }/>
                        </div>
                    </div>
            </div>
        </Fragment>
        </div>
    )
}
