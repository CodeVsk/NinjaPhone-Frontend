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
const selectElement = document.getElementById('phone_model');
phoneBrand.addEventListener("change", ()=>{
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

function selectService(e){
    localStorage.setItem('servicePhone', e.getAttribute("data"));
    const registerSelect = document.getElementsByClassName("cep_select");
    registerSelect[0].className =  registerSelect[0].className.replace(" stacks_off", "");
    document.getElementsByClassName("service_select")[0].classList.add("stacks_off")
}

function selectRepair(e){
    const cepSelect = document.getElementsByClassName("register_service");
    cepSelect[0].className =  cepSelect[0].className.replace(" stacks_off", "");
    document.getElementsByClassName("cep_select")[0].classList.add("stacks_off")
}

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

const Months = {
    "Janeiro":"01",
    "Fevereiro":"02",
    "Março":"03",
    "Abril":"04",
    "Maio":"05",
    "Junho":"06",
    "Julho":"07",
    "Agosto":"08",
    "Setembro":"09",
    "Outubro":"10",
    "Novembro":"11",
    "Dezembro":"12"
}

const dateInput = document.querySelector('#date-input2')
dateInput.addEventListener('change' , ()=>{
    let Hours = ["Selecione","07:00","08:00","09:00","10:00","11:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"]
    const hourElement = document.querySelector('#hour')
    while (hourElement.options.length) {
        hourElement.remove(0);
    }
    const date_array = dateInput.value.split(" ")
    fetch('https://ninjaphoneapi.herokuapp.com/mostrarAgendamentos')
    .then(res => res.json())
    .then(data=>{
        let hour_array = []
        data.TodosAgendamentos.forEach((v)=>{
            if(v.DiaAgendamento === date_array[1]+"-"+Months[date_array[2]]+"-"+date_array[3]){
                hour_array.push(v.HorarioAgendamento)
            }
        })
        hour_array.forEach((v)=>{
            Hours.forEach((d,i)=>{
                if(v === d){Hours.splice(i, 1);}
            })
        })
        Hours.forEach((item) => {
            hourElement.add(new Option(item));
        });
    })
})

const repair = {
    1:"Problema Desconhecido",
    2:"Capa Traseira",
    3:"Carregador com Problema",
    4:"Caiu na Água",
    5:"Bateria Viciada",
    6:"Tela Danificada",
}
const firstName_ = document.querySelector('#firstName');
const lastName_ = document.querySelector('#lastName');
const emailName_ = document.querySelector('#emailName');
const telNumber_ = document.querySelector('#phoneNumber');
const dateInput_ = document.querySelector('#date-input2');
const hourSelect_ = document.querySelector('#hour');
document.querySelector('.button_hour').addEventListener("click", ()=>{
    const date_array = dateInput.value.split(" ")
    if(firstName_.value.length > 0){
        if(lastName_.value.length > 0){
            if(emailName_.value.length > 0){
                if(telNumber_.value.length > 0){
                    if(dateInput_.value.length > 0){
                        if(hourSelect_.selectedIndex > 0){
                            fetch('https://ninjaphoneapi.herokuapp.com/auth/cadastroAgendamento',{
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                method: "POST",
                                body: JSON.stringify({
                                    "DiaAgendamento":date_array[1]+"-"+Months[date_array[2]]+"-"+date_array[3],
                                    "HorarioAgendamento":hourSelect_.children[hourSelect_.selectedIndex].textContent,
                                    "PrimeiroNomeCliente":firstName_.value,
                                    "SegundoNomeCliente":lastName_.value,
                                    "Email":emailName_.value,
                                    "Celular":telNumber_.value,
                                    "ServiçoAFazer":repair[localStorage.getItem("servicePhone")],
                                    "ModeloAparelho":selectElement.children[selectElement.selectedIndex].textContent,
                                    "MarcaAparelho":phoneBrand.children[phoneBrand.selectedIndex].textContent,
                                })
                            })
                            .then(res=>{
                                if(res.status){
                                    const cardSelect = document.getElementsByClassName("card_success_container");
                                    cardSelect[0].className =  cardSelect[0].className.replace(" stacks_off", "");
                                    document.getElementsByClassName("register_service")[0].classList.add("stacks_off")
                                }else{
                                    window.location.href = "index.html"
                                }
                                
                            })
                        }else{alert("Selecione o horário para agendamento")}
                    }else{alert("Selecione uma data")}
                }else{alert("Insira seu número de telefone")}
            }else{alert("Insira seu email")}
        }else{alert("Insira seu sobrenome")}
    }else{alert("Insira seu primeiro nome")}
})


function mask(o, f) {
    setTimeout(function() {
    let v = phoneMask(o.value);
        if (v != o.value) {
            o.value = v;
        }
    }, 1);
}

function phoneMask(v) {
    let r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 11) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 7) {
        r = r.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else if (v.trim() !== "") {
        r = r.replace(/^(\d*)/, "($1");
    }
    return r;
}
//https://ninjaphone.herokuapp.com/mostrarAgendamentos