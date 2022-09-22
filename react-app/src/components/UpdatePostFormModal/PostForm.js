import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./PostForm.css"
import { editPost } from '../../store/post';

const PostForm = ({setPostFormModal, post}) => {
    const dispatch = useDispatch();
    console.log('post:', post)
    const sessionUser = useSelector(state => state.session.user)
    const [postUrl, setPostUrl] = useState(post.postUrl? post.postUrl : '')
    const [city, setCity] = useState(post.city||'')
    const [state, setState] = useState(post.state||'')
    const [country, setCountry] = useState(post.country||'')
    const [caption, setCaption] = useState(post.caption||'')
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(()=>{
        let errors=[]
        if (!isImage(postUrl)) errors.push("Image post url is not valid")
        if (caption.length>500) errors.push("Caption must be no longer than 500 characters")
        setErrors(errors)

    }, [postUrl, caption])

    let shareButton = (
        <button form='update-post-actual-form' style={{fontSize:'14px',color:"#39B5F9", backgroundColor:'white', border:'none'}} type="submit" className="create-post-submit-button">
            Done
        </button>
    )

    function isImage(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }

    const handleSubmit = e => {
        e.preventDefault();
        setHasSubmitted(true)
        if (errors.length>0){
            alert('Cannot submit post')
            return
        }
        post = {
            ...post,
            post_url: postUrl,
            city,
            state,
            country,
            caption
        }
        dispatch(editPost(post.id)).then(()=> setPostFormModal(false))
        alert("Post updated!")
        setHasSubmitted(false)
        return

    }

    return (
        <>
            <div className = 'update-post-title'>
                <h3>Edit Info</h3>
                {shareButton}
            </div>
            <div className='update-post-main-content-container'>
                <div className='update-post-image-container'>
                    <img className='update-post-left-pic' src={post.postUrl? post.postUrl: null}/>
                </div>
                <form id='update-post-actual-form' onSubmit={handleSubmit} className='update-post-form-outer-container' >
                    {/* copy and pasted */}
                    <div className='update-post-inside-form-container'>
                        <div className='create-post-form-profile-box'>
                            <div className='create-post-form-profile-image-container'>
                                <img src={sessionUser.profilePicUrl} className='create-post-form-profile-pic'/>
                            </div>
                            <div className='create-post-form-username-text'>
                                {sessionUser.username}
                            </div>
                        </div>
                        <input
                            id='create-post-caption-input'
                            className='create-post-input-field'
                            value = {caption}
                            placeholder = "Write a Caption..."
                            onChange= {e=> setCaption(e.target.value)}
                            style={{height:"160px", display:"flex", alignItems:"flex-start", textAlign: "left" }}
                        />
                        <input
                            type='text'
                            value = {city}
                            placeholder='City (Optional)'
                            onChange= {e=> setCity(e.target.value)}
                            className ='create-post-input-field'
                        />
                        <input
                            type='text'
                            value = {state}
                            placeholder = "State (Optional)"
                            onChange= {e=> setState(e.target.value)}
                            className ='create-post-input-field'
                        />
                        <input
                            type='text'
                            value = {country}
                            placeholder = "Country (Optional)"
                            onChange= {e=> setCountry(e.target.value)}
                            className ='create-post-input-field'
                        />
                        {errors.length>0 && hasSubmitted && (
                            <ul className='validation-errors'>
                                {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </form>
            </div>

        </>
    )





}

export default PostForm
