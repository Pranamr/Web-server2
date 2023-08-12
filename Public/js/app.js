console.log('Inside Public folder')



const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const paragraph1 = document.querySelector('#message-1')
const paragraph2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    paragraph1.textContent = ''
    paragraph2.textContent = ''
    let location = input.value
    let url = 'http://localhost:3000/weather?address=' + location;

    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error){
            paragraph1.textContent = data.error
        }else {
            paragraph1.textContent = data.location
            paragraph2.textContent = data.forcast
        }
    })
})
})