import './App.css'
import AnswerBox from './AnswerBox'
import LifeDisplay from './LifeDisplay'
import SequenceDisplay from './SequenceDisplay'
import StartButton from './StartButton'
import TimerBar from './TimerBar'
import {useState} from 'react'

const min_seq_cnt = 500
const starting_life_cnt = 3
const letters = 'abcdefghijklmnopqrstuv'
const response = await fetch('/ospd.txt')
const words = await response.text()
const word_lst = words.split('\n')

export default function App() {
    const [answer, set_answer] = useState('')
    const [sequence, set_sequence] = useState('')
    const [resetting, set_resetting] = useState(null)
    const [used_words, set_used_words] = useState(null)
    const [lives, set_lives] = useState(0)
    const [playing, set_playing] = useState(false)

    const generate_sequence = () => {
        const generate_letter = () =>
            letters[Math.floor(Math.random() * letters.length)]
        let poss_seq = generate_letter() + generate_letter()
        while (get_seq_cnt(poss_seq) < min_seq_cnt)
            poss_seq = generate_letter() + generate_letter()
        set_sequence(poss_seq)
    }
    const fail = () => {
        set_lives(lives - 1)
        if(lives === 1) {
            end_game()
        }
        else {
            reset()
        }
    }
    const reset = () => {
        set_answer('')
        generate_sequence()
        set_resetting(true)
    }
    const submit_answer = (e) => {
        e.preventDefault()
        const lower_ans = answer.toLowerCase()
        const valid =
            word_lst.includes(lower_ans) && lower_ans.includes(sequence)
        set_answer('')
        if(!valid)
            return
        if(!used_words.includes(lower_ans)) {
            console.log(used_words)
            set_used_words([...used_words, lower_ans])
            reset()
        }
    }
    const get_seq_cnt = (poss_seq) => {
        const cnt = word_lst.reduce((accum, word) => {
            return accum + (word.includes(poss_seq) ? 1 : 0)
        }, 0)
        console.log(poss_seq, cnt)
        return cnt
    }
    const start_game = () => {
        set_lives(starting_life_cnt)
        set_used_words([])
        set_resetting(false)
        set_playing(true)
        reset()
    }
    const end_game = () => {
        set_playing(false)
    }
    return (
        <div className='App'>
            <TimerBar
                playing={playing}
                resetting={resetting}
                set_resetting={set_resetting}
                fail={fail}
            />
            <SequenceDisplay
                playing={playing}
                sequence={sequence} 
            />
            <AnswerBox
                playing={playing}
                answer={answer}
                set_answer={set_answer}
                submit_answer={submit_answer}
            />
            <LifeDisplay
                playing={playing}
                lives={lives}
            />
            <StartButton
                playing={playing}
                start_game={start_game}
            />
        </div>
    )
}
