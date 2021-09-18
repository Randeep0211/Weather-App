


// fetch('http://puzzle.mead.io/puzzle')
// .then((response)=>{
//          response.json()
//         .then((data)=>{ console.log(data)})
// })


// fetch('http://localhost:4003/weather?address=!')
// .then((response)=>{
//     response.json()
//     .then((data)=>{
//         if (data.error) {
//             console.log(data.error)
//         }
//         else{
            
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })


const form= document.querySelector('form')
const input= document.querySelector('input')
const pOne= document.querySelector('#one')
const pTwo= document.querySelector('#two')





form.addEventListener('submit',(evt)=>{
    evt.preventDefault()

    // console.log(input.value)

    const location= input.value

    pOne.textContent='Loading...'
    pTwo.textContent=''

    
fetch('/weather?address=' + location)
.then((response)=>{
    response.json()
    .then((data)=>{
        if (data.error) {
            pOne.textContent= data.error
        }
        else{
            
            pOne.textContent= data.location
            pTwo.textContent= data.forecast
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

})

