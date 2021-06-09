const technicianButton = document.querySelector(".button_technician");
technicianButton.addEventListener("click",()=>{
    const tabTechnician = document.querySelector("#techniciansTab");
    tabTechnician.className =  tabTechnician.className.replace(" container-off", "");
    document.querySelector("#hoursTab").classList.add("container-off")
})

const tabHours = document.querySelector(".button_scheduling");
tabHours.addEventListener("click",()=>{
    const tabHours = document.querySelector("#hoursTab");
    tabHours.className =  tabHours.className.replace(" container-off", "");
    document.querySelector("#techniciansTab").classList.add("container-off")
})


function synchronyzeMonth(){
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    const date = new Date()
    let days = {}
    for(i=1; i <= new Date(date.getFullYear(), date.getMonth()+1, 0).getDate(); i++){
        days[i] = []
    }
    fetch("https://ninjaphoneapi.herokuapp.com/AtualizarDiaTecnico/60bc2e0ed079890015bcd632",{
        headers: {
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify({
            "Dia":month[date.getMonth()]+date.getFullYear(),
            "Horas":JSON.stringify(days)
        })
    })
    .then(res=>console.log(res.status))
}

//AtualizarDiaTecnico

function reqDiary(){
    if(localStorage.getItem("token")){
        const days = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sabádo"];
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
        const date = new Date()
        fetch("https://ninjaphoneapi.herokuapp.com/mostrarTecnico/60bc2e0ed079890015bcd632")
        .then(res=>res.json())
        .then(data=>{
            while (document.querySelector(".select_day").options.length) {
                document.querySelector(".select_day").remove(0);
            }
            let json = data.TodosTecnicos
            if(json.Dia === (month[date.getMonth()]+date.getFullYear()) && json.Dia !== undefined){
                for(let i=Object.keys(JSON.parse(json.Horas)).length; i > 0; i--){
                    document.querySelector(".select_day").add(new Option(i+"/"+(date.getMonth()+1),i));
                    if(i >= date.getDate()){
                        document.querySelector('#daysTechnician').insertAdjacentHTML('afterbegin',`
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto" id="hourCard">
                                <div class="fw-bold">${days[new Date(date.getFullYear(), date.getMonth(), i).getDay()]} <span class="badge bg-dark">${i+"/"+(date.getMonth()+1)}</span></div>
                            </div>
                            <div class="btn-group" role="group" aria-label="Basic outlined example">
                                <button onclick="listHours(this)" type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#insertHour" data="${i}">Disponibilidade</button>
                            </div>
                        </li>
                        `)
                        //const j = JSON.parse(json.Horas)[i]
                        //for(let i in j ){
                        //    if(j[i].length > 0)
                        //        document.querySelector('#hourCard').insertAdjacentHTML('beforeend',`<span class="badge bg-primary">${j[i][0]}</span>`)
                        //}
                    }
                };
                
            }else{
                document.querySelector('#daysTechnician').insertAdjacentHTML('afterbegin',`
                <div class="d-grid gap-2">
                    <h3>
                        <small class="text-muted">
                            Sua agenda não está sincronizada com este mês
                        </small>
                    </h3>
                    <button onclick="synchronyzeMonth()" class="btn btn-primary" type="button">Sincronizar Calendário</button>
                </div>
                `)
            }
            
        })
    }else{
        window.location.href = "./login.html"
    }
}


function listHours(e){
    document.querySelector("#insertHour").setAttribute("data",e.getAttribute("data"))
    fetch("https://ninjaphoneapi.herokuapp.com/mostrarTecnico/60bc2e0ed079890015bcd632")
    .then(res=>res.json())
    .then(data=>{
        let json = JSON.parse(data.TodosTecnicos.Horas)
        if(json[e.getAttribute("data")].length > 0 ){
            json[e.getAttribute("data")].forEach(element => {
                document.querySelectorAll("#selectBox").forEach(el=>{
                    if(el.getAttribute("value") == element[0]){
                        if(element[1] == true){
                            el.checked = true
                        }else{
                            el.disabled = true;
                        }
                    }
                })
            });
        }
    })
}

function applyHours(){
    fetch("https://ninjaphoneapi.herokuapp.com/mostrarTecnico/60bc2e0ed079890015bcd632")
    .then(res=>res.json())
    .then(data=>{
        let hours = []
        let json = JSON.parse(data.TodosTecnicos.Horas)
        document.querySelectorAll("#selectBox").forEach(el=>{
            if(el.checked == true)
            hours.push([el.getAttribute("value"),true])
        })
        json[document.querySelector("#insertHour").getAttribute("data")] = hours
        fetch("https://ninjaphoneapi.herokuapp.com/AtualizarHorasTecnico/60bc2e0ed079890015bcd632",{
            headers: {
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({
                "Horas":JSON.stringify(json)
            })
        })
        .then(res=>{
            if(res.status == 200){
                document.querySelector("#insertHour").setAttribute("data","")
                document.querySelectorAll("#selectBox").forEach(el=>{
                    el.checked = false
                })
                document.querySelector('#daysTechnician').innerHTML = ''
                reqDiary()
            }
        })
    })
}

function clearHours(){
    document.querySelector("#insertHour").setAttribute("data","")
    document.querySelectorAll("#selectBox").forEach(el=>{
        el.checked = false
    })
    document.querySelector('#daysTechnician').innerHTML = ''
    reqDiary()
}


const schedulingSelect = document.querySelector(".select_day")
schedulingSelect.addEventListener("change",()=>{
    const days = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sabádo"]; 
    document.querySelector('#daysTechnician').innerHTML = ""
    const date = new Date()
    fetch("https://ninjaphoneapi.herokuapp.com/mostrarTecnico/60bc2e0ed079890015bcd632")
    .then(res=>res.json())
    .then(data=>{
        JSON.parse(data.TodosTecnicos.Horas)[schedulingSelect.options[schedulingSelect.selectedIndex].value].forEach(e=>{
            if(e[1] !== true){
                fetch("https://ninjaphoneapi.herokuapp.com/mostrarAgendamentos/"+e[1])
                .then(res=>res.json())
                .then(data=>{
                    document.querySelector('#schedulesList').insertAdjacentHTML('afterbegin',`
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto" id="hourCard">
                            <div class="fw-bold">${days[new Date(date.getFullYear(), date.getMonth(), data.ParamsSelecionados.DiaAgendamento.split("-")[0]).getDay()]} <span class="badge bg-dark">${data.ParamsSelecionados.DiaAgendamento.split("-")[0]+"/"+(date.getMonth()+1)}</span></div>
                            <span class="badge bg-primary">${data.ParamsSelecionados.HorarioAgendamento}</span>
                        </div>
                        <div class="btn-group" role="group" aria-label="Basic outlined example">
                            <button onclick="returnInformation(this)" type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#informationSchedule" data="${data.ParamsSelecionados._id}">Visualizar</button>
                        </div>
                    </li>
                    `)
                })
            }
        })
    })
})

function returnInformation(e){
    fetch("https://ninjaphoneapi.herokuapp.com/mostrarAgendamentos/"+e.getAttribute("data"))
    .then(res=>res.json())
    .then(data=>{
        document.querySelector("#txtName").innerHTML = data.ParamsSelecionados.PrimeiroNomeCliente+" "+data.ParamsSelecionados.SegundoNomeCliente
        document.querySelector("#txtAddress").innerHTML = data.ParamsSelecionados.Endereco
        document.querySelector("#txtCep").innerHTML = data.ParamsSelecionados.Cep
        document.querySelector("#txtTel").innerHTML = data.ParamsSelecionados.Telefone
        document.querySelector("#txtEmail").innerHTML = data.ParamsSelecionados.Email
    })
}