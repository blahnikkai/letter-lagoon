import "./Background.css"

export default function Background({playing}) {
  return (
    <div id='background_container'>
        <img
            src={playing ? 
                'images/background.png' 
                : 'images/start_screen.png' 
            }
            alt='' 
            id='background'
        />
    </div>
  )
}