import './SequenceDisplay.css'

export default function SequenceDisplay({sequence}) {
    return (
        <p
            id='seq_txt'
        >
            {sequence}
        </p>
    )
}
