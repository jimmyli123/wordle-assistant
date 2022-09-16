
document.querySelector('button').addEventListener('click', start)
document.querySelectorAll('.characters').forEach(element => {
element.addEventListener('keyup', function(event) {
    event.preventDefault()
    if (event.keyCode === 13) {
        console.log(event)
        start()
    }
})
})


let dictApi = 'https://api.datamuse.com/words?sp='


function start() {
    try {
        removeAllChildNodes(document.querySelector('.display'))
        let word=  []
        let x = document.querySelectorAll('.characters')
        x.forEach(el => {
            word.push(el.value)
            el.value = ""
        })
        for (let i = 0; i<word.length; i++) {
            if (word[i] ==="" ) {
                word[i] = '?'
            }
        }
        let searchWords = word.join("")

        let API = dictApi.concat(searchWords)

        // Fetching words from API
        fetch(API)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.length > 50) {
                data.splice(51,data.length-50)
            }
            data.forEach( el => {
                const spanItem = document.createElement('span');
                spanItem.setAttribute('class', 'wordResult')
                spanItem.innerHTML = el.word
                // spanItem.innerHTML = el.word
                document.querySelector('.display').appendChild(spanItem)
                console.log(el.word)
            })

        })

        document.querySelectorAll('.characters')
        
    } catch(err) {
        console.log(`Error with input: ${err}`)
    }
    
    fetch

}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}