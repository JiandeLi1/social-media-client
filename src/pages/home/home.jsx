import React, { Fragment} from 'react'
import TopBar from '../../components/topbar/TopBar'
import SideBar from '../../components/sidebar/SideBar'
import Feed from '../../components/feed/Feed'
import RightBar from '../../components/rightbar/RightBar'
import './home.css'

export default function home() {
    return (
        <Fragment>
            <TopBar />
            <div className="homeContainer">
                <SideBar />
                <Feed />
                <RightBar />
            </div>
        </Fragment>
    )
}
