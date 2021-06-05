
/*const monthOption = document.querySelector(".select_month");
monthOption.addEventListener("change",()=>{
    document.querySelector('#daysTechnician').innerHTML = ''
    let date = new Date(new Date().getFullYear(), monthOption.options[monthOption.selectedIndex].getAttribute("value"), 0);
    let format = new Date().toString().split(' ')
    const days = ["Domingo","Segunda-Feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sabádo"];
    //return days[date.getDay()]
    console.log(date.getDate())
    for(i=date.getDate(); i >=1  ; i--){
        let d = new Date(new Date().getFullYear(), monthOption.options[monthOption.selectedIndex].getAttribute("value")-1, i);
        document.querySelector('#daysTechnician').insertAdjacentHTML('afterbegin',`
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
                <div class="fw-bold">${days[d.getDay()]} <span class="badge bg-dark">${d.toLocaleDateString('pt-br', {day : 'numeric',month : 'short',year : 'numeric'})}</span></div>
                <span class="badge bg-primary">11:00</span>
            </div>
            <div class="btn-group" role="group" aria-label="Basic outlined example">
                <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#insertHour" data="${format[1]+"/"+format[2]+"/"+format[3]}">Disponibilidade</button>
            </div>
        </li>
        `)
    }
})*/

function synchronyzeMonth(){
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    const date = new Date()
    let days = {}
    for(i=1; i <= new Date(date.getFullYear(), date.getMonth()+1, 0).getDate(); i++){
        days[i] = []
    }
    console.log(days)
    fetch("https://ninjaphoneapi.herokuapp.com/AtualizarDiaTecnico/60b91f468790430015d9f941",{
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
    const days = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sabádo"];
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    const date = new Date()
    fetch("https://ninjaphoneapi.herokuapp.com/mostrarTecnico/60b91f468790430015d9f941")
    .then(res=>res.json())
    .then(data=>{
        let json = data.TodosTecnicos
        if(json.Data !== (month[date.getMonth()]+date.getFullYear())){
            for(let i in JSON.parse(json.Horas) ){
                //console.log(days[new Date(date.getFullYear(), date.getMonth(), i).getDay()])
                document.querySelector('#daysTechnician').insertAdjacentHTML('afterbegin',`
                <li class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">${days[new Date(date.getFullYear(), date.getMonth(), i).getDay()]} <span class="badge bg-dark">${i+"/"+(date.getMonth()+1)}</span></div>
                        <span class="badge bg-primary">11:00</span>
                    </div>
                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button onclick="listHours(this)" type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#insertHour" data="${i}">Disponibilidade</button>
                    </div>
                </li>
                `)
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
}


function listHours(e){
    document.querySelector("#insertHour").setAttribute("data",e.getAttribute("data"))
    fetch("https://ninjaphoneapi.herokuapp.com/mostrarTecnico/60b91f468790430015d9f941")
    .then(res=>res.json())
    .then(data=>{
        let json = JSON.parse(data.TodosTecnicos.Horas)
        console.log(json[e.getAttribute("data")].length)
        if(json[e.getAttribute("data")].length > 0 ){
            json[e.getAttribute("data")].forEach(element => {
                document.querySelectorAll("#selectBox").forEach(el=>{
                    if(el.getAttribute("value") == element)
                    el.checked = true
                })
            });
        }
    })
}

function applyHours(){
    fetch("https://ninjaphoneapi.herokuapp.com/mostrarTecnico/60b91f468790430015d9f941")
    .then(res=>res.json())
    .then(data=>{
        let hours = []
        let json = JSON.parse(data.TodosTecnicos.Horas)
        //console.log(json[document.querySelector("#insertHour").getAttribute("data")])
        document.querySelectorAll("#selectBox").forEach(el=>{
            if(el.checked == true)
            hours.push(el.getAttribute("value"))
        })
        json[document.querySelector("#insertHour").getAttribute("data")] = hours
        fetch("https://ninjaphoneapi.herokuapp.com/AtualizarHorasTecnico/60b91f468790430015d9f941",{
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