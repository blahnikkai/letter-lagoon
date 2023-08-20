import React, {useState, useEffect} from 'react'
import './TimerBar.css'


export default function TimerBar({playing, resetting, set_resetting, fail}) {
    const [timeout_id, set_timeout_id] = useState(null)

    const restart_timeout = () => {
        console.log('restarting timeout')
        if(timeout_id !== null)
            clearTimeout(timeout_id)
        set_timeout_id(setTimeout(() => {
            fail()
        }, 4000))
    }

    useEffect(() => {
        return () => {
            clearTimeout(timeout_id)
        }
    }, [])

    useEffect(() => {
        if(resetting) {
            const timer_bar = document.getElementById('timer_bar')
            timer_bar.classList.remove('shrink_anim')
            setTimeout(() => timer_bar.classList.add('shrink_anim'), 10)
            restart_timeout()
            set_resetting(false)
        }
    }, [resetting])
    return (
        <div 
            id='timer_bar'
            style={playing ? {display: ''} : {display: 'none'}}>
        </div>
    )
}
