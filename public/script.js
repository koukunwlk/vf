let formId = document.querySelector('.form-id')
let inputElement = document.querySelector('.input-id')

inputElement.addEventListener('keydown',(event)=>{
    if(event.key == 'Enter'){
        formId.submit((e)=>{e.preventDefault()})
    }
})