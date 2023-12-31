import './StartScreen.css'

export default function StartScreen({
    start_game, 
    score, 
    high_score, new_high_score, 
    first_time, difficulty, set_difficulty}) {

    const handle_submit = (e) => {
        e.preventDefault()
        start_game()
    }
    const handle_change = (e) => {
        console.log(e.target.value)
        set_difficulty(e.target.value)
    }

    return (
        <div id='start_screen'>
            {!first_time && <div className='start_screen_text'>Score: {score}</div>}
            {!first_time && <div className='start_screen_text'>High score: {high_score}</div>}
            {new_high_score && 
                <div className='start_screen_text'>
                    New high score!
                </div>
            }
            <form
                id='start_form'
                onSubmit={handle_submit}
            >
                <div id='difficulty_container'>
                    <label htmlFor='difficulty'>Difficulty:</label>
                    <select 
                        name='difficulty' 
                        id='difficulty_select' 
                        value={difficulty}
                        onChange={handle_change}
                    >
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                        <option value='dynamic'>Dynamic</option>
                    </select>
                </div>
                <input
                    type='submit'
                    id='start_btn'
                    value={first_time ? 'Start Game' : 'Play Again'}
                >
                </input>
            </form>
        </div>
    )
}
