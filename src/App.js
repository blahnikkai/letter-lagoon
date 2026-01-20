import {useState} from 'react'
import {load_word_set, 
        load_two_let_seq_cnt, 
        load_three_let_seq_cnt} from './functions/file_loader'
import Background from './components/Background'
import './App.css'
import Foreground from './components/Foreground'

const STARTING_LIFE_CNT = 3
const THREE_LET_PROB = .1
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'

const word_set = await load_word_set()
const two_let_seq_cnt = await load_two_let_seq_cnt()
const three_let_seq_cnt = await load_three_let_seq_cnt()

export default function App() {
    const [answer, set_answer] = useState('')
    const [sequence, set_sequence] = useState('')
    const [resetting, set_resetting] = useState(false)
    const [used_words, set_used_words] = useState(null)
    const [lives, set_lives] = useState(0)
    const [playing, set_playing] = useState(false)
    const [first_time, set_first_time] = useState(true)
    // status
    // 1 = ans is correct
    // 2 = invalid ans
    // 3 = valid ans previously used
    // 4 = correct ans
    const [status, set_status] = useState(0)
    const [bonus_letters, set_bonus_letters] = useState(new Set())
    const [score, set_score] = useState(0)
    const [high_score, set_high_score] = useState(0)
    const [new_high_score, set_new_high_score] = useState(false)
    const [difficulty, set_difficulty] = useState('dynamic')

    const decode = (inds) => {
        return inds.reduce((val, i) => val + LETTERS[i], '')
    }
    const calc_min_seq_cnt = () => {
        if(difficulty === 'easy') {
            return 2000;
        }
        else if(difficulty === 'medium') {
            return 1000;
        }
        else if(difficulty === 'hard') {
            return 500;
        }
        else if(difficulty === 'dynamic') {
            return 4000 * Math.pow(.5, score / 10)
        }
        throw new Error('invalid difficulty')
    }
    const generate_sequence = () => {
        const generate_num = () => Math.floor(Math.random() * LETTERS.length)
        const generate_enc = () => {
            let enc = []
            for(let i = 0; i < leng; ++i)
                enc.push(generate_num())
            return enc
        }
        const get_enc_cnt = (enc) => {
            let cnt = 0
            if(enc.length === 2)
                cnt = two_let_seq_cnt[enc[0]][enc[1]]
            else
                cnt = three_let_seq_cnt[enc[0]][enc[1]][enc[2]]
            // console.log(cnt, ': ', decode(enc))
            return cnt
        }
        let leng = 2
        if(Math.random() < THREE_LET_PROB)
            leng = 3
        let poss_enc = generate_enc(leng)
        while(get_enc_cnt(poss_enc) < calc_min_seq_cnt())
            poss_enc = generate_enc(leng)
        set_sequence(decode(poss_enc))
    }
    const fail = () => {
        set_lives(lives - 1)
        if(lives === 1)
            end_game()
        else
            reset()
    }
    const time_run_out = () => {
        set_status(4)
        fail()
    }
    const reset = () => {
        set_resetting(true)
        set_answer('')
        generate_sequence()
    }
    const submit_answer = (e) => {
        e.preventDefault()
        const lower_ans = answer.toLowerCase()
        const valid = word_set.has(lower_ans) && lower_ans.includes(sequence)
        set_answer('')
        // answer is invalid
        if(!valid) {
            set_status(2)
        }
        // answer is valid, but already used
        else if(used_words.includes(lower_ans)) {
            set_status(3)
        }
        // answer is correct
        else {
            set_score(score + 1)
            let new_bonus_letters = new Set(bonus_letters)
            // add letters from ans to bonus letters
            for(const letter of lower_ans)
                new_bonus_letters.add(letter)
            set_bonus_letters(new_bonus_letters)
            // if every letter used, get an extra life and reset bonus letters
            if(new_bonus_letters.size === 26) {
                set_lives(lives + 1)
                set_bonus_letters(new Set())
            }
            // add ans to used words
            set_used_words([...used_words, lower_ans])
            reset()
            set_status(1)
        }
    }
    const start_game = () => {
        set_first_time(false)
        set_lives(STARTING_LIFE_CNT)
        set_score(0)
        set_used_words([])
        set_playing(true)
        set_bonus_letters(new Set())
        reset()
    }
    const end_game = () => {
        set_new_high_score(false)
        if(score > high_score) {
            set_high_score(score)
            set_new_high_score(true)
        }
        set_status(0)
        set_playing(false)
    }
    return (
        <div className='App'>
            <div className='container'>
                <Background
                    playing={playing}
                />
                <Foreground
                    playing={playing}
                    resetting={resetting}
                    set_resetting={set_resetting}
                    time_run_out={time_run_out}
                    sequence={sequence}
                    answer={answer}
                    set_answer={set_answer}
                    submit_answer={submit_answer}
                    lives={lives}
                    score={score}
                    status={status}
                    set_status={set_status}
                    letters={LETTERS}
                    bonus_letters={bonus_letters}
                    start_game={start_game}
                    high_score={high_score}
                    new_high_score={new_high_score}
                    first_time={first_time}
                    difficulty={difficulty}
                    set_difficulty={set_difficulty}
                />
            </div>
        </div>
    )
}
