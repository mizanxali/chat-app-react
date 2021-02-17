import React from 'react'
import onlineIcon from '../icons/onlineIcon.png'
import closeIcon from '../icons/closeIcon.png'

const InfoBar = (props) => {
    return (
        <div className='infoBar'>
            <div className='leftInnerContainer'>
                <img className='onlineIcon' src={onlineIcon} alt='' />
                <h3>{props.roomName}</h3>
            </div>
            <div className='rightInnerContainer'>
                <a href='/'><img src={closeIcon} alt='' /></a>
            </div>
        </div>
    )
}

export default InfoBar
