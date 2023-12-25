import './BonusLetter.css'

export default function BonusLetter({letter, gotten}) {
    return (
        <div
            id='bonus_letter'
            style={{opacity: gotten ? '.3' : '1'}}>
            {letter}
        </div>
    )
}
