import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from './Message'

const Messages = (props) => {
    return (
        <ScrollToBottom className='messages'>
            {props.messages.map((message, i) => {
                return <div key={i}><Message name={props.name} message={message} /></div>
            })}
        </ScrollToBottom>
    )
}

export default Messages
