import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Join = () => {

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    return (
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <h1 className='heading'>Join</h1>
                <div><input type='text' className='joinInput' placeholder='Name' onChange={(event) => setName(event.target.value)} /></div>
                <div><input type='text' className='joinInput mt-20' placeholder='Room' onChange={(event) => setRoom(event.target.value)} /></div>
                <Link onClick={(event) => (!name || !room) && event.preventDefault()} to={`/chat?name=${name}&room=${room}`}><button className='button mt-20' type='submit'>SIGN IN</button></Link>
            </div>
        </div>
    )
}

export default Join
