import './App.css'
import SequenceDisplay from './SequenceDisplay'
import TextBox from './TextBox'
import { useState, useEffect } from 'react'

const letters = 'abcdefghijklmnopqrstuv'

export default function App() {
    const [answer, set_answer] = useState('')
    const [word_lst, set_word_lst] = useState([])
    const [sequence, set_sequence] = useState('')
    async function get_words() {
        const response = await fetch('/ospd.txt')
        const words = await response.text()
        const word_lst = words.split('\n')
        set_word_lst(word_lst)
        console.log(word_lst.length)
    }
    useEffect(() => {
        generate_sequence()
        get_words()
    }, [])
    const submit_answer = (e) => {
        e.preventDefault()
        console.log(answer)
        const lower_ans = answer.toLowerCase()
        const valid = word_lst.includes(lower_ans) && lower_ans.includes(sequence)
        console.log(valid)
        set_answer('')
        if(valid)
            generate_sequence()
    }
    const generate_sequence = () => {
        const generate_letter = () => letters[Math.floor(Math.random() * letters.length)]
        set_sequence(generate_letter() + generate_letter())
    }
    return (
        <div className='App'>
            <SequenceDisplay
                sequence={sequence}
            />
            <TextBox 
                answer={answer}
                set_answer={set_answer}
                submit_answer={submit_answer}
            />
        </div>
    )
}
