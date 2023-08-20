import BonusLetter from '../BonusLetter'
import './AllBonusLetters.css'

export default function AllBonusLetters({playing, letters, bonus_letters}) {
    return (
        <ul
            id='bonus_letters_container'
            style={playing ? {display: ''} : {display: 'none'}}
        >
            {letters.map((letter, ind) => 
                <BonusLetter
                    key={ind + 1}
                    letter={letter}
                    gotten={bonus_letters.has(letter)}
                />
            )}
        </ul>
    )
}
