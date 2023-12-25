import './StartButton.css'

export default function StartButton({start_game}) {
    return (
        <button
            id='start_btn'
            onClick={() => start_game()}
        >
            Start Game
        </button>
    )
}
