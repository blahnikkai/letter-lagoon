import './AnswerBox.css'

export default function AnswerBox({answer, set_answer, submit_answer}) {
    return (
        <form onSubmit={(e) => submit_answer(e)}>
            <input 
                id='ans_txt_box'
                type='text'
                value={answer}
                onChange={(e) => set_answer(e.target.value)}
            />
        </form>
    )
}
