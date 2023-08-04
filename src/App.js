import './App.css'
import SequenceDisplay from './SequenceDisplay'
import AnswerBox from './AnswerBox'
import { useState, useEffect } from 'react'

const letters = 'abcdefghijklmnopqrstuv'
const response = await fetch('/ospd.txt')
const words = await response.text()
const word_lst = words.split('\n')

export default function App() {
    const [answer, set_answer] = useState('')
    const [sequence, set_sequence] = useState('')
    const generate_sequence = () => {
        const generate_letter = () => letters[Math.floor(Math.random() * letters.length)]
        let poss_seq = generate_letter() + generate_letter()
        while(get_seq_cnt(poss_seq) < 500)
            poss_seq = generate_letter() + generate_letter()
        set_sequence(poss_seq)
    }
    useEffect(() => {
        generate_sequence()
    }, [])
    const submit_answer = (e) => {
        e.preventDefault()
        const lower_ans = answer.toLowerCase()
        const valid = word_lst.includes(lower_ans) && lower_ans.includes(sequence)
        set_answer('')
        if(valid)
            generate_sequence()
    }
    const get_seq_cnt = (poss_seq) => {
        const cnt = word_lst.reduce((accum, word) => {
            return accum + (word.includes(poss_seq) ? 1 : 0)
        }, 0)
        console.log(poss_seq, cnt)
        return cnt
    }
    return (
        <div className='App'>
            <SequenceDisplay
                sequence={sequence}
            />
            <AnswerBox
                answer={answer}
                set_answer={set_answer}
                submit_answer={submit_answer}
            />
        </div>
    )
}
