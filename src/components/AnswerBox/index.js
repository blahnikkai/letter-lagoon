import './AnswerBox.css'

export default function AnswerBox({playing, answer, set_answer, submit_answer}) {
    return (
        <form
            autoComplete='off'
            onSubmit={(e) => submit_answer(e)}
            style={playing ? {display: ''} : {display: 'none'}}>
            <input 
                id='ans_txt_box'
                type='text'
                value={answer}
                onChange={(e) => set_answer(e.target.value)}
            />
        </form>
    )
}
