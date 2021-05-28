let toggleValidate = true
const toggleButton = document.querySelector('.toggle_button')
const toggleMenu = document.querySelector('.nav_list')

toggleButton.addEventListener("click", ()=>{
    toggleMenu.classList.toggle("show",toggleValidate)
    document.body.style.overflow = toggleValidate ? "hidden" : "initial"
    toggleValidate = !toggleValidate
})

function tabToggle(element,target){
    const tabProcess = document.getElementsByClassName("tab-process");
    for (i = 0; i < tabProcess.length; i++) {
        tabProcess[i].className = tabProcess[i].className.replace(" tab-on", "");
    };
    document.getElementById(target).classList.add('tab-on');

    const tabItem = document.getElementsByClassName("tab-item");
    for (i = 0; i < tabItem.length; i++) {
        tabItem[i].className = tabItem[i].className.replace(" card-on", "");
    }
    element.classList.add("card-on")
}

function stackToggle(element,target){
    const stackProcess = document.getElementsByClassName(target);
    stackProcess[0].className =  stackProcess[0].className.replace(" stacks_off", "");
    document.getElementsByClassName("header_phone")[0].classList.add("stacks_off")
}

list = {
    "Iphone":[
        "Selecione",
        "Iphone 11",
        "Iphone 11s",
        "Iphone 11 Pro",
        "Iphone 10",
        "Iphone 10s",
    ],
    "Samsung":[
        "Selecione",
        "Galaxy s11",
        "Galaxy s10",
        "Galaxy s9",
        "Galaxy s8",
        "Galaxy s7",
    ]
}

const phoneBrand = document.querySelector('#phone_brand')
phoneBrand.addEventListener("change", ()=>{
    const selectElement = document.getElementById('phone_model');
    while (selectElement.options.length) {
        selectElement.remove(0);
    }
    list[phone_brand.options[phoneBrand.selectedIndex].text].forEach((item) => {
        selectElement.add(new Option(item));
    });
})

const phoneModel = document.querySelector('#phone_model')
document.querySelector('.button_phone').addEventListener("click", ()=>{
    if(phoneBrand.selectedIndex > 0){
        if(phoneModel.selectedIndex > 0){
            const serviceProcess = document.getElementsByClassName("service_select");
            serviceProcess[0].className =  serviceProcess[0].className.replace(" stacks_off", "");
            document.getElementsByClassName("phone_select")[0].classList.add("stacks_off");
        }
    }
})

const cardService = document.querySelector('.service_card')
cardService.addEventListener("click", ()=>{
    const cepSelect = document.getElementsByClassName("cep_select");
    cepSelect[0].className =  cepSelect[0].className.replace(" stacks_off", "");
    document.getElementsByClassName("service_select")[0].classList.add("stacks_off")
})


const cepInput = document.querySelector('.cep')
cepInput.addEventListener('input', ()=>{
    if(cepInput.value.length == 8){
        //fetch('https://viacep.com.br/ws/'+cepInput.value+'/json')
        //.then(res=>res.json())
        //.then(json=>{
        //    console.log(json.endereco)
        //})
        //.catch(err=>{
        //    console.log(err)
        //})

    }
})