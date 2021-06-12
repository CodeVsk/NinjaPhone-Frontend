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
        "IPhone 11",
        "IPhone 11s",
        "IPhone 11 Pro Max",
        "IPhone 11 Pro",
        "IPhone XR",
        "IPhone X",
        "IPhone XS",
        "IPhone XS Max",
        "IPhone 5S",
        "IPhone 6",
        "IPhone 6S",
        "IPhone 6 Plus",
        "IPhone 6s Plus",
        "IPhone SE 1st Gen",
        "IPhone 8",
        "IPhone 7 Plus",
        "IPhone 8 Plus",
        "IPhone 5",
        "IPhone 5c",
        "IPhone SE 2nd Gen"
    ],
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
            const registerSelect = document.getElementsByClassName("cep_select");
            registerSelect[0].className =  registerSelect[0].className.replace(" stacks_off", "");
            document.getElementsByClassName("phone_select")[0].classList.add("stacks_off")
        }
    }
})

function selectService(e){
    localStorage.setItem('servicePhone', e.getAttribute("data"));
    fetch("https://ninjaphoneapi.herokuapp.com/mostrarTecnico/"+technicianSelect.options[technicianSelect.selectedIndex].value)
    .then(res=>res.json())
    .then(data=>{
        let json = data.TodosTecnicos
        hours_array = data.TodosTecnicos.Horas
        for(i=1;i<=Object.keys(JSON.parse(json.Horas)).length;i++){
            document.querySelector("#daySelect").add(new Option(i,i));
        }
        const cepSelect = document.getElementsByClassName("register_ninja");
        cepSelect[0].className =  cepSelect[0].className.replace(" stacks_off", "");
        document.getElementsByClassName("service_select")[0].classList.add("stacks_off")
        document.querySelector("#servicePrice").innerHTML = "Valor: "+document.querySelector("#price"+e.getAttribute("data")).textContent
    })
}

function selectRepair(e){
    if(e.className != "cep_off"){
        if(e.id == "cardStore"){
            const cepSelect = document.getElementsByClassName("register_service");
            cepSelect[0].className =  cepSelect[0].className.replace(" stacks_off", "");
            document.getElementsByClassName("cep_select")[0].classList.add("stacks_off")
        }else{
            const serviceProcess = document.getElementsByClassName("service_select");
            serviceProcess[0].className =  serviceProcess[0].className.replace(" stacks_off", "");
            document.getElementsByClassName("cep_select")[0].classList.add("stacks_off");
        }
    }
}


function getDistanceInKm(position1, position2) {
    "use strict";
    let deg2rad = function (deg) { return deg * (Math.PI / 180); },
        R = 6371,
        dLat = deg2rad(position2.lat - position1.lat),
        dLng = deg2rad(position2.lng - position1.lng),
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(deg2rad(position1.lat))
            * Math.cos(deg2rad(position1.lat))
            * Math.sin(dLng / 2) * Math.sin(dLng / 2),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return ((R * c *1000).toFixed());
}

const cepInput = document.querySelector('.cep')
cepInput.addEventListener('input', ()=>{
    if(cepInput.value.length == 8){
        const selectTechnicians = document.querySelector("#technicianSelect")
        while (selectTechnicians.options.length) {
            selectTechnicians.remove(0);
        }
        fetch('https://ninjaphoneapi.herokuapp.com/retornaLatLong/'+cepInput.value)
        .then(res=>res.json())
        .then(data=>{
            if(getDistanceInKm({lat: data.json.latitude, lng: data.json.longitude},{lat: -20.5385214, lng: -49.3272639}) <= 18){
                document.querySelector("#cardStore").classList.remove("cep_off")
                document.querySelector("#cardStore").classList.add("cep_card")
            }
            fetch('https://ninjaphoneapi.herokuapp.com/mostrarTecnicos')
            .then(res=>res.json())
            .then(datas=>{
                selectTechnicians.add(new Option("Selecione","Selecione"));
                datas.TodosTecnicos.forEach(e => {
                    if(e.Localidade !== undefined && e.Status == "Aprovado"){
                        if(getDistanceInKm({lat: data.json.latitude, lng: data.json.longitude},{lat: e.Localidade.split(",")[0], lng: e.Localidade.split(",")[1]}) <= 18){
                            document.querySelector("#cardNinja").classList.remove("cep_off")
                            document.querySelector("#cardNinja").classList.add("cep_card")
                            selectTechnicians.add(new Option(e.Nome,e._id));
                        }
                    }
                })
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
})

const technicianSelect = document.querySelector("#technicianSelect")
const services = ["Problema Desconhecido","Capa Traseira","Carregador com Problema","Caiu na Água","Bateria Viciada","Tela Danificada"]
technicianSelect.addEventListener('change' , ()=>{
    fetch("https://ninjaphoneapi.herokuapp.com/mostrarTecnico/"+technicianSelect.options[technicianSelect.selectedIndex].value)
    .then(res=>res.json())
    .then(data=>{
        let json = data.TodosTecnicos
        const service_card = document.getElementsByClassName("service_card_select")
        for(i=1;i<=6;i++){
            if(JSON.parse(json.Precos)[i][1] === true){
                document.querySelector("#price"+i).innerHTML = "R$"+JSON.parse(json.Precos)[i][0]
                service_card[i-1].classList.replace("service_card_off","service_card")
            }else{
                service_card[i-1].classList.add("service_card_off")
                document.querySelector("#price"+i).innerHTML = "Serviço Indisponivel"
            }
        }
        
    })
})

const daySelect = document.querySelector("#daySelect")
daySelect.addEventListener('change' , ()=>{
    while (document.querySelector("#hourtechSelect").options.length) {
        document.querySelector("#hourtechSelect").remove(0);
    }
    const hour = new Date()
    fetch("https://ninjaphoneapi.herokuapp.com/mostrarTecnico/"+technicianSelect.options[technicianSelect.selectedIndex].value)
    .then(res=>res.json())
    .then(data=>{
        let json = data.TodosTecnicos
        JSON.parse(json.Horas)[daySelect.options[daySelect.selectedIndex].value].forEach(e=>{
            if(e[1] == true){
                if(hour.getDate()===daySelect.options[daySelect.selectedIndex].value){
                    if(Number(e[0].replace(":","")) > Number(hour.getHours()+"00") && Number(e[0].replace(":",""))-Number(hour.getHours()+"00") > 30){
                        document.querySelector("#hourtechSelect").add(new Option(e[0]));
                    }
                }else{
                    document.querySelector("#hourtechSelect").add(new Option(e[0]));
                }
            }
        })
    })
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
            if(ValidateEmail(emailName_)){
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
                                    "TipoAtendimento": "Loja",
                                    "IdTecnico": "0"
                                })
                            })
                            .then(res=>{
                                if(res.status === 200){
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


const firstNameText_ = document.querySelector('#firstText');
const lastNameText_ = document.querySelector('#lastText');
const emailNameText_ = document.querySelector('#emailText');
const telNumberText_ = document.querySelector('#phoneText');
const addressInputText_ = document.querySelector('#addressText');
const numberSelectText_ = document.querySelector('#numberText');
const techSelectText_ = document.querySelector('#technicianSelect');
const daySelectText_ = document.querySelector('#daySelect');
const hourSelectText_ = document.querySelector('#hourtechSelect');

document.querySelector('.button_text').addEventListener("click", ()=>{
    const month = ['01','02','03','04','05','06','07','08','09','10','11','12']
    const date = new Date()
    if(firstNameText_.value.length > 0){
        if(lastNameText_.value.length > 0){
            if(ValidateEmail(emailNameText_)){
                if(telNumberText_.value.length > 0){
                    if(addressInputText_.value.length > 0){
                        if(numberSelectText_.value.length > 0){
                            if(techSelectText_.selectedIndex > 0){
                                if(daySelectText_.selectedIndex > 0){
                                    if(hourSelectText_.selectedIndex > 0){
                                        fetch('https://ninjaphoneapi.herokuapp.com/auth/cadastroAgendamento',{
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json'
                                            },
                                            method: "POST",
                                            body: JSON.stringify({
                                                "DiaAgendamento":daySelectText_.children[daySelectText_.selectedIndex].textContent+"-"+month[date.getMonth()]+"-"+date.getFullYear(),
                                                "HorarioAgendamento":hourSelectText_.children[hourSelectText_.selectedIndex].textContent,
                                                "PrimeiroNomeCliente":firstNameText_.value,
                                                "SegundoNomeCliente":lastNameText_.value,
                                                "Email":emailNameText_.value,
                                                "Telefone":telNumberText_.value,
                                                "ServiçoAFazer":repair[localStorage.getItem("servicePhone")],
                                                "ModeloAparelho":selectElement.children[selectElement.selectedIndex].textContent,
                                                "MarcaAparelho":phoneBrand.children[phoneBrand.selectedIndex].textContent,
                                                "TipoAtendimento": "Ninja",
                                                "IdTecnico": technicianSelect.options[technicianSelect.selectedIndex].value,
                                                "Endereco":addressInputText_.value+","+numberSelectText_.value,
                                                "Cep":cepInput.value
                                            })
                                        })
                                        .then(res=>res.json())
                                        .then(id=>{
                                            fetch("https://ninjaphoneapi.herokuapp.com/mostrarTecnico/"+technicianSelect.options[technicianSelect.selectedIndex].value)
                                            .then(res=>res.json())
                                            .then(data=>{
                                                let json = JSON.parse(data.TodosTecnicos.Horas)
                                                json[30].forEach(e => {if(e[0] == hourSelectText_.children[hourSelectText_.selectedIndex].textContent)e[1]=id.cadastroAgendamento._id})
                                                fetch("https://ninjaphoneapi.herokuapp.com/AtualizarHorasTecnico/"+technicianSelect.options[technicianSelect.selectedIndex].value,{
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                    method: "PUT",
                                                    body: JSON.stringify({
                                                        "Horas":JSON.stringify(json)
                                                    })
                                                })
                                                .then(result=>{
                                                    if(result.status === 200){
                                                        const cardSelect = document.getElementsByClassName("card_success_container");
                                                        cardSelect[0].className =  cardSelect[0].className.replace(" stacks_off", "");
                                                        document.getElementsByClassName("register_ninja")[0].classList.add("stacks_off")
                                                    }else{
                                                        window.location.href = "index.html"
                                                    }
                                                })
                                            })
                                        })
                                    }else{alert("Você deve selecionar um horário")}
                                }else{alert("Você deve selecionar um dia")}
                            }else{alert("Você deve selecionar um técnico")}
                        }else{alert("Você deve preencher o número de sua residência")}
                    }else{alert("Você deve preencher seu endereço")}
                }else{alert("Você deve preencher seu telefone")}
            }else{alert("Você deve preencher seu email")}
        }else{alert("Você deve preencher seu sobrenome")}
    }else{alert("Você deve preencher seu nome")}
})