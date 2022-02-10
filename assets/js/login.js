$(document).ready(function () {
    if(verifyLoginUrl()){
        createFailLoginElement();
        setTimeout(() => {
            window.location.href = "/login";
        }, 3000);
    }
});

const verifyLoginUrl = () => {
    let urlPath = window.location.href.replace('http://encontre-um-musico.herokuapp.com/login/', '');
    urlPath = urlPath === 'error' ? true : false; 
    return urlPath;
}

const createFailLoginElement = () => {
    `{${Toastify({
        text: "Usuário não cadastrado",
        duration: 3000,
        gravity: "top",
        position: "center", 
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #FF6347, #FF0000)",
        }
      }).showToast()}`;
}

