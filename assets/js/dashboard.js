/*!
* Start Bootstrap - Simple Sidebar v6.0.0 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});


const selectOption = document.querySelector(".select_method");
selectOption.addEventListener("change",()=>{
    fetch("https://ninjaphoneapi.herokuapp.com/mostrarAgendamentos")
    .then(res=>res.json())
    .then(data=>{
        document.querySelector('#schedulesList').innerHTML = ''
        data.TodosAgendamentos.forEach(e => {
            if(selectOption.value === "1" && e.TipoAtendimento === "Loja"){
                document.querySelector('#schedulesList').insertAdjacentHTML('afterbegin', `
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">${e.PrimeiroNomeCliente } ${e.SegundoNomeCliente}  <span class="badge bg-primary rounded-pill">${e.HorarioAgendamento}</span></div>
                            ${e.ModeloAparelho} (${e.ServiçoAFazer})
                        </div>
                        <div class="btn-group" role="group" aria-label="Basic outlined example">
                            <button onclick="informationButton(this)" data="${e._id}" type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#informationModal" data="${e._id}">Informações</button>
                            <button onclick="removeButton(this)" data="${e._id}" type="button" class="btn btn-outline-primary">Remover</button>
                        </div>
                    </li>
                `);
            }
            if(selectOption.value === "2" && e.TipoAtendimento !== "Loja"){
                document.querySelector('#schedulesList').insertAdjacentHTML('afterbegin', `
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">Teste <span class="badge bg-primary rounded-pill">${e.HorarioAgendamento}</span></div>
                            ${e.ModeloAparelho} (${e.ServiçoAFazer})
                        </div>
                        <div class="btn-group" role="group" aria-label="Basic outlined example">
                            <button onclick="informationButton(this)" data="${e._id}" type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#informationModal" data="${e._id}">Informações</button>
                            <button onclick="removeButton(this)" data="${e._id}" type="button" class="btn btn-outline-primary">Remover</button>
                        </div>
                    </li>
                `);
            }
        });
    })
})


function informationButton(e){
    fetch("https://ninjaphoneapi.herokuapp.com/mostrarAgendamentos/"+e.getAttribute("data"))
    .then(res=>res.json())
    .then(data=>{
        console.log(data.ParamsSelecionados)
        document.querySelector("#modelPhone").innerHTML = data.ParamsSelecionados.ModeloAparelho
        document.querySelector("#damageService").innerHTML = data.ParamsSelecionados.ServiçoAFazer
        document.querySelector("#hourService").innerHTML = data.ParamsSelecionados.DiaAgendamento + "("+data.ParamsSelecionados.HorarioAgendamento+")"
    })
}

function removeButton(e){
    fetch("https://ninjaphoneapi.herokuapp.com/RemoverAgendamentos/"+e.getAttribute("data"), {method: 'DELETE'})
    .then(res=>res.status)
    fetch("https://ninjaphoneapi.herokuapp.com/mostrarAgendamentos")
    .then(res=>res.json())
    .then(data=>{
        document.querySelector('#schedulesList').innerHTML = ''
        data.TodosAgendamentos.forEach(e => {
            if(selectOption.value === "1" && e.TipoAtendimento === "Loja"){
                document.querySelector('#schedulesList').insertAdjacentHTML('afterbegin', `
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">${e.PrimeiroNomeCliente } ${e.SegundoNomeCliente}  <span class="badge bg-primary rounded-pill">${e.HorarioAgendamento}</span></div>
                            ${e.ModeloAparelho} (${e.ServiçoAFazer})
                        </div>
                        <div class="btn-group" role="group" aria-label="Basic outlined example">
                            <button onclick="informationButton(this)" data="${e._id}" type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#informationModal" data="${e._id}">Informações</button>
                            <button onclick="removeButton(this)" data="${e._id}" type="button" class="btn btn-outline-primary">Remover</button>
                        </div>
                    </li>
                `);
            }
            if(selectOption.value === "2" && e.TipoAtendimento !== "Loja"){
                document.querySelector('#schedulesList').insertAdjacentHTML('afterbegin', `
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">Teste <span class="badge bg-primary rounded-pill">${e.HorarioAgendamento}</span></div>
                            ${e.ModeloAparelho} (${e.ServiçoAFazer})
                        </div>
                        <div class="btn-group" role="group" aria-label="Basic outlined example">
                            <button onclick="informationButton(this)" data="${e._id}" type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#informationModal" data="${e._id}">Informações</button>
                            <button onclick="removeButton(this)" data="${e._id}" type="button" class="btn btn-outline-primary">Remover</button>
                        </div>
                    </li>
                `);
            }
        });
    })
}


//button_scheduling
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


const hourOption = document.querySelector(".select_status");
hourOption.addEventListener("change",()=>{
    fetch("https://ninjaphoneapi.herokuapp.com/mostrarTecnicos")
    .then(res=>res.json())
    .then(data=>{
        document.querySelector('#schedulesList').innerHTML = ''
        data.TodosTecnicos.forEach(e => {
            if(hourOption.value === "2" && e.Status === "Pendente"){
                document.querySelector('#technicianList').insertAdjacentHTML('afterbegin',`
                <li class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">${e.Nome}</div>
                    </div>
                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-outline-primary" data="${e.id_}">Visualizar</button>
                        <button type="button" class="btn btn-outline-primary" data="${e.id_}">Aprovar</button>
                        <button type="button" class="btn btn-outline-primary" data="${e.id_}">Recusar</button>
                    </div>
                </li>
                `)
            }
        })
    })
})
/*
const hourOption = document.querySelector(".select_day");
hourOption.addEventListener("change",()=>{
    fetch("https://ninjaphoneapi.herokuapp.com/mostrarAgendamentos")
    .then(res=>res.json())
    .then(data=>{
        document.querySelector('#schedulesList').innerHTML = ''
        data.TodosAgendamentos.forEach(e => {
            if(selectOption.value === "1" && e.TipoAtendimento === "Loja"){
                document.querySelector('#schedulesList').insertAdjacentHTML('afterbegin', `
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">${e.PrimeiroNomeCliente } ${e.SegundoNomeCliente}  <span class="badge bg-primary rounded-pill">${e.HorarioAgendamento}</span></div>
                            ${e.ModeloAparelho} (${e.ServiçoAFazer})
                        </div>
                        <div class="btn-group" role="group" aria-label="Basic outlined example">
                            <button onclick="informationButton(this)" data="${e._id}" type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#informationModal" data="${e._id}">Informações</button>
                            <button onclick="removeButton(this)" data="${e._id}" type="button" class="btn btn-outline-primary">Remover</button>
                        </div>
                    </li>
                `);
            }
        });
    })
})*/