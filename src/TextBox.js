export default function TextBox({answer, set_answer, submit_answer}) {
    return (
        <form onSubmit={(e) => submit_answer(e)}>
            <input 
                type='text'
                value={answer}
                onChange={(e) => set_answer(e.target.value)}
            />
        </form>
    )
}
