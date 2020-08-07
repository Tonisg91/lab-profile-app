import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Profile() {

    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.loggedInUser)

    return (
        <div>
            <h1>Profile</h1>
        </div>
    )
}

export default Profile