import React from 'react'
import { Search, Person, Chat, Notifications } from "@material-ui/icons"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './TopBar.css'

export default function TopBar() {
    const { user } = useContext(AuthContext);
    const PF= process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link style={{textDecoration:"none"}}>
                    <span className="logo">JD social</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className="search"/>
                    <input className="searchInput" placeholder="Search for friend, post or video" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <div className="topbarLink">Home</div>
                    <div className="topbarLink">Time Line</div>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`} >
                <img src={
                    user.profilePicture ?
                        PF + user.profilePicture :
                        PF + "person/noAvatar.jpg"
                    }
                    />
                </ Link>    
            </div>
        </div>
    )
}
