import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getPosts } from "../../store/post"
import { NavLink } from "react-router-dom"
import React from 'react'
import './MainPagePosts.css'
import { createLikesThunk, deleteLikesThunk } from '../../store/likes'



const MainPagePosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts))
    console.log(posts)


    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])


    const allPosts = posts.map((post) => {
        if (!post) return null
        const { id, caption, comments, numLikes, postUrl, user, createdAt, likesUserId, likesUername } = post
        let postHeader = (

            <div className='mainpage-post-header'>
                <div className='image-container'>
                    <img src={user.profilePicUrl} className='mainpage-profile-pic'></img>
                </div>
                <div className='mainpage-username'>
                    {user.username}
                </div>
            </div>

        )

        let body = (
            <>
                <img src={postUrl} className='mainpage-body-image'></img>
            </>
        )

        let commentsLink
        if (comments.length >= 2) {
            commentsLink = (
                // Going to add an onclick that directs to the profile id of that post
                <div>
                    View all {comments.length} comments
                </div>
            )
        } else if (comments.length === 1) {
            commentsLink = (
                // Going to add an onclick that directs to the profile id of that post
                <div>
                    View {comments.length} comment
                </div>
            )
        } else {
            commentsLink = (
                <div>
                    0 comments
                </div>
            )
        }


        let likesComponent
        //user hasnt like the post
        if (likesUserId.includes(user.id)) {
            likesComponent = (
                <div style={{ marginRight: '15px' }} className="mainpage-interface-icons">
                    <i class="fa-solid fa-heart" id='likesHeart' onClick={() => { dispatch(deleteLikesThunk(id)).then(() => dispatch(getPosts())) }}></i>
                </div>
            )

        } else {
            likesComponent = (
                <div style={{ marginRight: '15px' }} className="mainpage-interface-icons">
                    <i class="fa-regular fa-heart" onClick={() => { dispatch(createLikesThunk(id)).then(() => dispatch(getPosts())) }}></i>
                </div>
            )
        }


        const datePosted = new Date(createdAt)
        const now = Date.now()
        const milliseconds = Math.abs(now - datePosted)
        const hours = Math.ceil(milliseconds / (1000 * 60 * 60))
        const days = Math.ceil(milliseconds / (1000 * 60 * 60 * 24))

        let postTimer
        if (hours < 24) {
            postTimer = (
                <>
                    {hours} hours ago
                </>
            )
        } else {
            postTimer = (
                <>
                    {days} days ago
                </>
            )
        }

        let userInterface = (
            <>
                <div className='mainpage-posts-icons'>
                    {likesComponent}
                    <div className="mainpage-interface-icons">
                        <i class="fa-regular fa-comment fa-flip-horizontal" ></i>
                    </div>
                </div>
                <div className='mainpage-posts-likes'>
                    {numLikes} likes
                </div>
                <div className='mainpage-posts-bio'>
                    <div className='mainpage-posts-bio-username'>
                        {user.username}
                    </div>
                    <div className='mainpage-posts-bio-caption'>
                        {caption}
                    </div>
                </div>
                <div className='mainpage-comments-placeholder'>
                    {commentsLink}
                </div>
                <div className='mainpage-time'>
                    {postTimer}
                </div>
            </>

        )

        let commentForm = (
            <>
                <div className='comment-form-line'></div>
                <div className='comment-post-form'>
                    <div>
                        Add a comment...
                    </div>
                    <div >
                        <button className='comment-post-button'> Post</button>
                    </div>
                </div>
            </>

        )

        return (
            <div className='postsbox'>
                <div>
                    {postHeader}
                </div>
                <div className='mainpage-body-image-container'>
                    {body}
                </div>
                <div className='mainpage-interface-div'>
                    {userInterface}
                </div>
                <div className='mainpage-comment-form'>
                    {commentForm}
                </div>
            </div>
        )

    })

    return (
        <>
            {allPosts}
        </>
    )
}

export default MainPagePosts
