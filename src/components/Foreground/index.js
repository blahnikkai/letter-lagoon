import AllBonusLetters from '../AllBonusLetters'
import AnswerBox from '../AnswerBox'
import FeedbackIcon from '../FeedbackIcon'
import LifeDisplay from '../LifeDisplay'
import SequenceDisplay from '../SequenceDisplay'
import ScoreDisplay from '../ScoreDisplay'
import StartScreen from '../StartScreen'
import TimerBar from '../TimerBar'
import './Foreground.css'

export default function Foreground({
    playing,
    resetting, set_resetting,
    time_run_out,
    sequence,
    answer, set_answer, submit_answer,
    lives,
    score,
    status, set_status,
    letters, 
    bonus_letters,
    start_game,
    high_score,
    new_high_score,
    first_time,
    difficulty, set_difficulty
}) {
  return (
    <div id='foreground'>
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
                        letters={[...letters]}
                        bonus_letters={bonus_letters}
                    />
                </>
                : 
                <StartScreen
                    start_game={start_game}
                    score={score}
                    high_score={high_score}
                    new_high_score={new_high_score}
                    first_time={first_time}
                    difficulty={difficulty}
                    set_difficulty={set_difficulty}
                />
            }
    </div>
  )
}