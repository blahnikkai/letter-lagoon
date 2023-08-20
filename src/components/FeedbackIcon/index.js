import {useEffect} from 'react'
import './FeedbackIcon.css'

export default function FeedbackIcon({status, set_status}) {
    useEffect(() => {
        if(status !== 0) {
            const time_id = setTimeout(() => {
                console.log('resetting status')
                set_status(0)
            }, 1000)
        }
        // return () => {
        //     clearTimeout(timeId)
        // }
    }, [status])

    if (status === 0) return null
    return (
        <div
            id='feedback_icon' 
            style={{color: 'white'}}>
            {status === 1
                ? 'correct'
                : status === 2
                ? 'incorrect'
                : 'already used'}
        </div>
    )
}
