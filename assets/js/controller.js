$(document).ready(function(){
  validateLogin()
  getUsrCookie();
});

const getUsrCookie = () => {
  //let {headers} = await axios.get("http://localhost:3000/");
  //let header = $.cookie('userTokenCookie');
  let header = $.cookie('connect.sid');
  console.log(header)
}

const validateLogin = async () => { 
  const user_id = 16; //aqui vai vir dinâmico depois
  const userData = await getUserFilterId(user_id)
  if(userData != false){
    showAllPage(userData);
  }else{
    hideAllPage();
  }
}

const getUserFilterId = async (user_id) => {
  let urlUser = `https://encontre-um-musico-api.herokuapp.com/api/users/${user_id}`;
  try {
    const { data } = await axios.get(urlUser, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    return data;
  } catch (error) {
    toastr.error("Falha ao buscar os dados do usuário.", "Entre em contato com os Administradores!");
    return false
  }
}

const getUserInstrumentBadgesId = async (user_id) => {
  let urlInstrumentBadges = `https://encontre-um-musico-api.herokuapp.com/api/user/instrument_badges`;
  try {
    const { data } = await axios.get(urlInstrumentBadges, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    const result = data.length;
    console.log(result);
    return data;
  } catch (error) {
    toastr.error("Falha ao buscar os dados do usuário.", "Entre em contato com os Administradores!");
    return false
  }
}

const showAllPage = async (userData) => {

  const user_title = `<h1>${userData[0].user_title}</h1>`;
  const user_full_name = `<strong>${userData[0].user_full_name}</strong>`
  const user_adress = `<p>${userData[0].user_city} - ${userData[0].user_state}</p>`;
  const user_bio = `<p>${userData[0].user_bio}</p>`;
  const user_image = `<img src="${userData[0].user_image}" alt="" />`;
  const instrument_badges = await getUserInstrumentBadgesId(userData);


  $('#user_title').append(user_title);
  $('#user_full_name').append(user_full_name);
  $('#user_adress').append(user_adress);
  $('#user_bio').append(user_bio);
  $('#user_image').append(user_image);

  $('#wrapper').show()
}

const hideAllPage = () => {
  $('#wrapper').hide()
}

