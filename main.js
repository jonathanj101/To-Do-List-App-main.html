/* GLOBAL VARIABLES */

let userInput = document.querySelector("#user-input")
let unordrd = document.querySelector("#main-lists__container")


/* EVENT LISTENER FOR USER INPUT*/


userInput.addEventListener('keydown', () => {
    if (event.keyCode === 13) {

        //creating element at user's input 'enter'

        let listItem = document.createElement('li')
        let listBtnItem = document.createElement('li')
        let spanInputValue = document.createElement('span')
        let btnRemove = document.createElement('button')


        listItem.id = 'lists-item'
        listItem.className = userInput.value
        btnRemove.id = 'remove'
        listBtnItem.id = 'lists-item'
        spanInputValue.id = 'inputValue'


        let spnUserText = document.createTextNode(userInput.value)



        spanInputValue.appendChild(spnUserText)
        listBtnItem.appendChild(btnRemove)

        if (userInput.value === '') {
            // if user input is empty, not to add it to the list
            alert('Empty Task, no Reminder!')
        } else {
            // adding task to the ul list
            unordrd.insertAdjacentElement("afterbegin", listItem)
            listItem.insertAdjacentElement("beforeend", btnRemove)
            listItem.insertAdjacentElement('afterbegin', spanInputValue)
            btnRemove.innerHTML = '&times;'
            userInput.value = ''

        }
        // LOCAL STORAGE
        let userTask = []
        let date = new Date()


        let year = date.getYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let secs = date.getSeconds()
        let taskId = {
            created: `${month}/${day}/${year} ${secs}`
        }

        const listsItem = document.querySelectorAll('li')
        const span = document.querySelectorAll('span')

        span.forEach(function (item) {
            userTask.push(item.textContent, taskId)

        })
        if (localStorage.getItem('Tasks') == null) {
            localStorage.setItem('Tasks', '[]')
        }
        let old_data = JSON.parse(localStorage.getItem('Tasks'))
        old_data.push(userTask)
        localStorage.setItem('Tasks', JSON.stringify(old_data))

        if (listsItem == '') {
            listsItem.innerHTML = spanInputValue
        }
    }

})

/* delete task*/
userInput.addEventListener('keyup', () => {
    if (event.keyCode === 13) {
        let btnRemove = document.querySelector('#remove')
        let spanInputValue = document.querySelector("#inputValue")
        btnRemove.addEventListener('click', (e) => {
            e.target.parentElement.remove()
        })
        /* mouseover event on x button to display line-through on task */
        btnRemove.addEventListener('mouseover', () => {
            if (spanInputValue.id === "inputValue") {
                spanInputValue.style.textDecoration = 'line-through'
                spanInputValue.style.textDecorationColor = "red"
            }
        })
        /* mouseout event on x button to not display line-through on task */
        btnRemove.addEventListener('mouseout', () => {
            if (spanInputValue.id === 'inputValue') {
                spanInputValue.style.textDecoration = 'none'
            }
        })
    }
})