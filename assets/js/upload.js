function reportInfo(vars, showType = false) {
    if (showType === true) console.log(typeof vars);
    console.log(vars);
}

function addImg(ele, content) {
    var myDIV = document.querySelector(ele);
    var newContent = document.createElement('div');
    newContent.innerHTML = content;

    while (newContent.firstChild) {
        myDIV.appendChild(newContent.firstChild);
    }
}

var feedback = function(res) {
    reportInfo(res, true);
    if (res.success === true) {
        var get_link = res.data.link.replace(/^http:\/\//i, 'https://');
        document.querySelector('.status').classList.add('bg-success');
        var content =
            'Sucesso' + '<br><h1 class="image-url" id="imagemLinkCredito" data="' + get_link + '"><h1/>';
        addImg('.status', content);
    }
};

new Imgur({
    clientid: '9bbb958b5c712d2', //You can change this ClientID
    callback: feedback
});