console.log("client side control")

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


//fetch api returns data which then cob=verted to json


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg1')
const msgTwo = document.querySelector('#msg2')


weatherForm.addEventListener('submit', (e) => {
    //to avoid default behavior of resetting form
    e.preventDefault()
    console.log(search.value)

    fetch('/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = 'Unable to find location'
            } else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecastData
                console.log(data)

            }
        })
    })
})