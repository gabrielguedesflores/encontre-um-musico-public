$(document).ready(function(){
  const userFriend_id = verifyLoginUrl();
  const user_id = user(); 
  validateLogin(user_id, userFriend_id)
});

const URL_PATH = 'http://localhost:3000';
//const URL_PATH = 'https://encontre-um-musico.herokuapp.com';

const user = () => {return parseJwt(getCookie('userTokenCookie')).userId;}

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

function getCookie(cname) {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return '';
}

const verifyLoginUrl = () => {
  let url = window.location.href.replace(URL_PATH + '/amigos/', '');
  return url;
}

const validateLogin = async (user_id, userFriend_id) => { 
  const userData = await getUserFilterId(user_id)
  const userFriendId = await getUserFilterId(userFriend_id)
  if(userFriendId != false){
    showAllPage(userFriendId, userData);
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

const showAllPage = async (userFriendId, userData) => {

  const user_full_name = `<strong>${userData[0].user_full_name}</strong>`

  const user_title = `<h1>${userFriendId[0].user_title}</h1>`;
  const user_adress = `<p>${userFriendId[0].user_city} - ${userFriendId[0].user_state}</p>`;
  const user_bio = `<p>${userFriendId[0].user_bio}</p>`;
  const user_image = `<img src="${userFriendId[0].user_image}" alt="" />`;

  $('#user_title').append(user_title);
  $('#user_full_name').append(user_full_name);
  $('#user_adress').append(user_adress);
  $('#user_bio').append(user_bio);
  $('#user_image').append(user_image);
  $('#user_badges').append(userFriendId[0].instrument_badges_id);

  $('#wrapper').show()
}

const hideAllPage = () => {
  $('#wrapper').hide()
}



