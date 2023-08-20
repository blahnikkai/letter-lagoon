import './SequenceDisplay.css'

export default function SequenceDisplay({playing, sequence}) {
    return (
        <p
            id='seq_txt'
            style={playing ? {display: ''} : {display: 'none'}}>
            {sequence}
        </p>
    )
}
