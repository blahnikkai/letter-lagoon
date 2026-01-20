import React, {useState, useEffect, useRef} from 'react'
import './TimerBar.css'


export default function TimerBar({resetting, set_resetting, time_run_out}) {
    const [timeout_id, set_timeout_id] = useState(0)
    const timer_bar = useRef(null);

    const restart_timeout = () => {
        if(timeout_id !== null) {
            clearTimeout(timeout_id)
        }
        set_timeout_id(setTimeout(() => {
            time_run_out()
        }, 4000))
    }

    useEffect(() => {
        if(resetting) {
            timer_bar.current.classList.remove('shrink_anim');
            void timer_bar.current.offsetWidth; // Trigger a reflow
            timer_bar.current.classList.add('shrink_anim');
            restart_timeout()
            set_resetting(false)
        }
    }, [resetting, timeout_id])

    return (
        // <img id='timer_bar'  alt=''/>
        <img
            id='timer_bar'
            ref={timer_bar}
            src='images/prisoner.png'
            alt=''
        />
            
        // </div>
    )
}
