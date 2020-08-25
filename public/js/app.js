console.log('client side javascript')



const wf = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent=''

wf.addEventListener('submit',(e) => {
    e.preventDefault()
    // console.log('Testing!');
    // console.log(search.value);
    messageOne.textContent='Loading'
    messageTwo.textContent=''

    fetch('http://localhost:3000/weather?address='+search.value).then((response) => {
    response.json().then((data) => {
        if(data.error){
            //console.log(data.error);
            messageOne.textContent=data.error
        }
        else{
            //console.log(data.location);
            //console.log(data.forecastData);
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecastData
        }
    })
})
})