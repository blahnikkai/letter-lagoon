import {useEffect, useState} from 'react'
import {FaCheck, FaXmark, FaLock, FaClock} from 'react-icons/fa6';
import {IconContext} from 'react-icons';
import './FeedbackIcon.css'

// FaLock
// FaHeart
// FaX
// FaCheck
export default function FeedbackIcon({status, set_status}) {
    // makes icon disappear after one second
    const [timeout_id, set_timeout_id] = useState(0)

    useEffect(() => {
        if(status !== 0) {
            clearTimeout(timeout_id)
            set_timeout_id(setTimeout(() => {
                set_status(0)
            }, 1000))
        }
        return () => {
            clearTimeout(timeout_id)
        }
    }, [status])

    if(status === 0)
        return null
    return (
        <div
            id='feedback_icon' 
        >   
            {status === 1 
                && <IconContext.Provider
                        value={{color: 'green', size: '50px'}}
                    >
                    <FaCheck/>
                </IconContext.Provider>}
            {status === 2 
                && <IconContext.Provider 
                        value={{color: 'red', size: '50px'}}
                    >
                    <FaXmark/>
                </IconContext.Provider>}
            {status === 3 
                && <IconContext.Provider 
                        value={{color: 'orange', size: '50px'}}
                    >
                    <FaLock/>
                </IconContext.Provider>}
            {status === 4
                && <IconContext.Provider
                        value={{color: 'red', size: '50px'}}
                    >
                    <FaClock/>
                </IconContext.Provider>}
        </div>
    )
}
