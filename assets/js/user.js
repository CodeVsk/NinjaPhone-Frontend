const cepInput = document.querySelector('#cepTechnician')
cepInput.addEventListener('input', ()=>{
    if(cepInput.value.length == 8){
        fetch('https://viacep.com.br/ws/'+cepInput.value+'/json')
        .then(res=>res.json())
        .then(json=>{
            document.querySelector("#stateTechnician").value = json.localidade+"-"+json.uf
            document.querySelector("#addressTechnician").value = json.logradouro
        })
        .catch(err=>{
            console.log(err)
        })
    }
})

const nameInput = document.querySelector('#nameTechnician');
const emailInput = document.querySelector('#emailTechnician');
const telInput = document.querySelector('#telTechnician');
const cpflInput = document.querySelector('#cpfTechnician');
const stateInput = document.querySelector('#stateTechnician');
const addressInput = document.querySelector('#addressTechnician');
const passwordInput = document.querySelector('#passwordTechnician');
const registerButton = document.querySelector('#formRegister');

document.querySelector('.btn_register').addEventListener("click", ()=>{
    const imageLink = document.querySelector('#imagemLinkCredito');
    if(nameInput.value.length > 0){
        if(ValidateEmail(emailInput)){
            if(telInput.value.length > 0){
                if(cpflInput.value.length > 0){
                    if(cepInput.value.length > 0){
                        if(stateInput.value.length > 0){
                            if(addressInput.value.length > 0){
                                if(passwordInput.value.length >= 6){
                                    if(imageLink){
                                        fetch('https://ninjaphoneapi.herokuapp.com/retornaLatLong/'+cepInput.value)
                                        .then(result=>result.json())
                                        .then(data=>{
                                            fetch("https://ninjaphoneapi.herokuapp.com/auth/cadastroTecnicos",{
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                method: "POST",
                                                body: JSON.stringify({
                                                    "Nome": nameInput.value,
                                                    "Email": emailInput.value,
                                                    "Celular": telInput.value,
                                                    "Cpf": cpflInput.value,
                                                    "Endereco": addressInput.value,
                                                    "Cidade": stateInput.value,
                                                    "Cep": cepInput.value,
                                                    "Estado": stateInput.value,
                                                    "AntecendenteCriminal": imageLink.getAttribute('data'),
                                                    "Senha":passwordInput.value,
                                                    "Status":"Pendente",
                                                    "Horas":"",
                                                    "Dia":"",
                                                    "Localidade":data.json.latitude+","+data.json.longitude
                                                })
                                            })
                                            .then(res => {
                                                if(res.status === 200){
                                                    const cardSelect = document.querySelector(".card_success_container");
                                                    cardSelect.className =  cardSelect.className.replace(" stacks_off", "");
                                                    document.querySelector(".technician_container").classList.add("stacks_off")
                                                }
                                            })
                                        })
                                        .catch(err=>{console.log(err)})
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});

/* VALIDATE INPUTS */

function ValidateEmail(inputText){
    let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(inputText.value.match(mailformat)){
        return true;
    }else{
        alert("O email inserido em inválido!");
        inputText.focus();
        return false;
    }
}

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
