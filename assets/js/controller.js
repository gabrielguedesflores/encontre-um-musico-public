$(document).ready(function(){
  console.log('chegou');
  validaLogin()
});

const validaLogin = async () => { 
  const user_id = 8; //aqui vai vir dinâmico depois
  if(await getUser(user_id)){
    showAllPage();
  }else{
    hideAllPage();
  }
}

const getUserData = async (user_id) => {
  const urlGetUser = `https://encontre-um-musico-api.herokuapp.com/api/users/${user_id}`;

  try {
    let { data } = await axios.get(urlGetUser, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    return data
  } catch (error) {
    console.log('Você não está logado!')
    return false
  } 
}

const showAllPage = () => {
  $('#wrapper').show()
}

const hideAllPage = () => {
  $('#wrapper').hide()
}
