import React from 'react'

const Input = (props) => {
    return (
        <form className='form'>
            <input className='input' type='text' placeholder='Type a message...' value={props.message} onChange={event => props.setMessage(event.target.value)} onKeyPress={event => event.key==='Enter' && props.sendMessage(event)} />
            <button className='sendButton' onClick={event => props.sendMessage(event)}>SEND</button>
        </form>
    )
}

export default Input
