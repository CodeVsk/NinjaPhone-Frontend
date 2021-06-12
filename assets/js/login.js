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

const emailTxt = document.querySelector("#emailTechnician");
const passTxt = document.querySelector("#passwordTechnician");
document.querySelector("#technicianForm").addEventListener("submit",(e)=>{
    e.preventDefault()
    if(ValidateEmail(emailTxt)){
        if(passTxt.value.length > 0){
            fetch("https://ninjaphoneapi.herokuapp.com/auth/AutenticacaoTecnicos",{
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    "Email": emailTxt.value,
                    "Senha":passTxt.value
                })
            })
            .then(res=>res.json())
            .then(data=>{
                localStorage.setItem("id",data.CadastroDeTecnicos._id)
                localStorage.setItem("token",data.token)
                window.location.href = "./technician.html"
            })
        }
    }
})

const emailAdminTxt = document.querySelector("#emailadmin");
const passAdminTxt = document.querySelector("#passwordadmin");
document.querySelector("#adminForm").addEventListener("submit",(e)=>{
    e.preventDefault()
    if(ValidateEmail(emailAdminTxt)){
        if(passAdminTxt.value.length > 0){
            fetch("https://ninjaphoneapi.herokuapp.com/auth/loginAdmin",{
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    "Email": emailAdminTxt.value,
                    "Senha":passAdminTxt.value
                })
            })
            .then(res=>res.json())
            .then(data=>{
                localStorage.setItem("id",data.LoginAdmin._id)
                localStorage.setItem("tokenadm",data.token)
                window.location.href = "./admin.html"
            })
        }
    }
})

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