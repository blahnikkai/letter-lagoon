export async function load_word_set() {
    const response = await fetch('/enable1.txt')
    const words = await response.text()
    const word_lst = words.split('\n')
    return new Set(word_lst)
}

export async function load_two_let_seq_cnt() {
    const response = await fetch('/two_let_seq.json')
    const text = await response.text()
    return JSON.parse(text)
}

export async function load_three_let_seq_cnt() {
    const response = await fetch('/three_let_seq.json')
    const text = await response.text()
    return JSON.parse(text)
}