let toggleValidate = true
const toggleButton = document.querySelector('.toggle_button')
const toggleMenu = document.querySelector('.nav_list')

toggleButton.addEventListener("click", ()=>{
    toggleMenu.classList.toggle("show",toggleValidate)
    document.body.style.overflow = toggleValidate ? "hidden" : "initial"
    toggleValidate = !toggleValidate
})