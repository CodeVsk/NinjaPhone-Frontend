let toggleValidate = true
const toggleButton = document.querySelector('.toggle_button')
const toggleMenu = document.querySelector('.nav_list')

toggleButton.addEventListener("click", ()=>{
    toggleMenu.classList.toggle("show",toggleValidate)
    document.body.style.overflow = toggleValidate ? "hidden" : "initial"
    toggleValidate = !toggleValidate
})

function tabToggle(element,target){
    tabProcess = document.getElementsByClassName("tab-process");
    for (i = 0; i < tabProcess.length; i++) {
        tabProcess[i].className = tabProcess[i].className.replace(" tab-on", "");
    };
    document.getElementById(target).classList.add('tab-on');

    tabItem = document.getElementsByClassName("tab-item");
    for (i = 0; i < tabItem.length; i++) {
        tabItem[i].className = tabItem[i].className.replace(" card-on", "");
    }
    element.classList.add("card-on")
}