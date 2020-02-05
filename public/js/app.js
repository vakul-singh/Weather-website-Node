console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')
messageOne.textContent = ''

// weatherForm.addEventListner('submit',())
//e=event
weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()
    const location=search.value

    messageOne.textContent="Loading...."
    messageTwo.textContent=""

    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
    //"then" function is going to run when the json data has arrived
    response.json().then((data) => {
        // console.log(data)
        if(data.error)  {
            messageOne.textContent = data.error
        }  else  {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            // console.log(data.location)
            // console.log(data.forecast)
        }
    })
})

})

