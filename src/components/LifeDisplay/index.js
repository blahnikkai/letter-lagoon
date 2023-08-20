import './LifeDisplay.css'

export default function LifeDisplay({playing, lives}) {
    return (
        <div
            id='life_disp'
            style={playing ? {display: ''} : {display: 'none'}}>
            {lives}
        </div>
    )
}
