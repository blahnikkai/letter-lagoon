import {FaHeart} from 'react-icons/fa6';
import {IconContext} from 'react-icons';
import './LifeDisplay.css'

export default function LifeDisplay({playing, lives}) {
    return (
        <div
            id='life_disp'
        >
            {[...Array(lives)].map((item, ind) => 
                <IconContext.Provider value={{color: 'red', size: '50px'}} key={ind}>
                    <FaHeart/>
                </IconContext.Provider>
            )}
        </div>
    )
}
