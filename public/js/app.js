const weatherForm = document.querySelector('form')
const locationElement = document.querySelector('input')
const forecastMessage = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    forecastMessage.textContent = 'Loading...'

    const locationName= locationElement.value
    const url = `/weather?location=${locationName}`

    fetch(url).then(async(response) => {
    response = await response.json()
    if (response.error) {
        forecastMessage.textContent = response.error
    } else {
        forecastMessage.textContent = response.forecast
    }
    
}).catch((error)=>{console.log('error2: ', error)})
})

