$(document).ready(function () {
    if(createFailLoginElement()){
        insertFailLoginPopUp();
        setTimeout(() => {
            window.location.href = "/login";
        }, 3000);
    }
});

const createFailLoginElement = () => {
    let urlPath = window.location.href.replace('http://localhost:3000/login/', '');
    urlPath = urlPath === 'error' ? true : false; 
    return urlPath;
}

const insertFailLoginPopUp = () => {
    const cont = `{${Toastify({
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

