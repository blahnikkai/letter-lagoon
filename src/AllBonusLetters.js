import BonusLetter from './BonusLetter'
import './AllBonusLetters.css'

export default function AllBonusLetters({letters, bonus_letters}) {
    return (
        <ul
            id='bonus_letters_container'
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
