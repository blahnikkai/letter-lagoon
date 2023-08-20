import './StartButton.css'

export default function StartButton({playing, start_game}) {
    return (
        <button
            id='start_btn'
            onClick={() => start_game()}
            style={playing ? {display: 'none'} : {display: ''}}>
            Start Game
        </button>
    )
}
