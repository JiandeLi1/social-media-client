import React, { useRef, useState } from 'react'
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from '@material-ui/icons'
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from 'axios'
import './share.css'

export default function Share() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [file, setFile] = useState(null)
    const desc = useRef()
    const submitHandler = async (e) => {
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        //in order to avoid file conflicts with the same name
        //Use timestamp to rename the other
        if (file) {
            const data = new FormData()
            const fileName = Date.now() + file.name

            data.append('file', file)
            data.append("name", fileName)
            newPost.img = 'post/'+file.name
            try{
                await axios.post("http://localhost:8800/api/upload", data)
            }catch(err) {
                console.log(err)
            }
        }
        try {
            await axios.post("http://localhost:8800/api/posts", newPost)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }
    console.log(user)
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture ?
                        PF + user.profilePicture :
                        PF + "person/noAvatar.jpg" }
                        alt="" />
                    <input type="text"
                        placeholder={"What's in your mind, " + user.username + "?"}
                        className="shareInput"
                        ref={desc}
                    />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className="shareCancelImg" onClick={() => setFile(null) } />
                    </div>
                )}
                <form className="shareBottom" onSubmit={ submitHandler }>
                    <div className="shareOptions" >
                        <label for="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText"> Photo or Video</span>
                            <input type="file"
                                id="file"
                                style={{display:"none"}}
                                accept=".png, .jpeng, .jpg"
                                onChange={(e)=>setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText"> Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText"> Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText"> Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}
