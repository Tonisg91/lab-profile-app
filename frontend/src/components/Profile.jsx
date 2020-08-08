import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Profile() {

    // const dispatch = useDispatch()
    // const loggedInUser = useSelector(state => state.loggedInUser)
    

    const {username} = JSON.parse(localStorage.getItem('loggedInUser'))


    return (
        <div>
            <h1>{username}</h1>
        </div>
    )
}

export default Profile