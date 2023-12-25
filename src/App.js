import {useState} from 'react'
import AllBonusLetters from './components/AllBonusLetters'
import AnswerBox from './components/AnswerBox'
import FeedbackIcon from './components/FeedbackIcon'
import LifeDisplay from './components/LifeDisplay'
import SequenceDisplay from './components/SequenceDisplay'
import ScoreDisplay from './components/ScoreDisplay'
import StartButton from './components/StartButton'
import TimerBar from './components/TimerBar'
import './App.css'

const min_seq_cnt = 1000
const starting_life_cnt = 3
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'
const response = await fetch('/enable1.txt')
const words = await response.text()
const word_lst = words.split('\n')
const two_let_seq_cnt = JSON.parse(await fetch('/two_let_seq.json')
                                            .then((val) => val.text()))
const three_let_seq_cnt = JSON.parse(await fetch('/three_let_seq.json')
                                            .then((val) => val.text()))

export default function App() {
    const [answer, set_answer] = useState('')
    const [sequence, set_sequence] = useState('')
    const [resetting, set_resetting] = useState(false)
    const [used_words, set_used_words] = useState(null)
    const [lives, set_lives] = useState(0)
    const [playing, set_playing] = useState(false)
    // status
    // 1 = ans is correct
    // 2 = invalid ans
    // 3 = valid ans previously used
    // 4 = correct ans
    const [status, set_status] = useState(0)
    const [bonus_letters, set_bonus_letters] = useState(new Set())
    const [score, set_score] = useState(0)

    const decode = (inds) => {
        return inds.reduce((val, i) => val + LETTERS[i], '')
    }
    const generate_sequence = () => {
        const generate_num = () => Math.floor(Math.random() * LETTERS.length)
        const generate_enc = () => {
            // two letter sequence
            let enc = [generate_num(), generate_num()]
            // fifty percent chance of three letter sequence
            const three_let_prob = .5
            if(Math.random() > three_let_prob)
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
        let poss_enc = generate_enc()
        while (get_enc_cnt(poss_enc) < min_seq_cnt)
            poss_enc = generate_enc()
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
        const valid = word_lst.includes(lower_ans) && lower_ans.includes(sequence)
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
        set_lives(starting_life_cnt)
        set_used_words([])
        set_playing(true)
        set_bonus_letters(new Set())
        reset()
    }
    const end_game = () => {
        set_status(0)
        set_playing(false)
    }
    return (
        <div className='App'>
            {playing ? 
                <>
                    <TimerBar
                        resetting={resetting}
                        set_resetting={set_resetting}
                        time_run_out={time_run_out}
                    />
                    <SequenceDisplay
                        sequence={sequence} 
                    />
                    <AnswerBox
                        answer={answer}
                        set_answer={set_answer}
                        submit_answer={submit_answer}
                    />
                    <LifeDisplay
                        lives={lives}
                    />
                    <ScoreDisplay
                        score={score}
                    />
                    <FeedbackIcon
                        status={status}
                        set_status={set_status}
                    />
                    <AllBonusLetters
                        letters={[...LETTERS]}
                        bonus_letters={bonus_letters}
                    />
                </>
                : 
                <StartButton
                    start_game={start_game}
                />
            }
        </div>
    )
}
