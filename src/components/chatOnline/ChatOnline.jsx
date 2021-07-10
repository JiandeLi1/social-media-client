import React from 'react'
import './chatOnline.css'

export default function ChatOnline() {
    return (
        <div class="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img src="assets/person/6.jpg"
                         className="chatOnlineImg"
                         alt="" />
                    <div className="chatOnlineBadge">

                    </div>
                </div>
                <span className="chatOnlineName">John Doe</span>
            </div>
        </div>
    )
}
