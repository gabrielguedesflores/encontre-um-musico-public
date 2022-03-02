$(document).ready(function(){
  validateLogin()
});


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

const validateLogin = async () => { 
  const user_id = user(); 
  console.log(user_id);
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

const getFriendsOfUser = async (user_id) => {
  let urlUser = `https://encontre-um-musico-api.herokuapp.com/api/user/friends`;
  try {
    const { data } = await axios.post(urlUser, {
      user_id: user_id
    });
    return data;
  } catch (error) {
    toastr.error("Falha ao buscar os amigos do usuário.", "Entre em contato com os Administradores!");
    return false
  }
}

const showAllPage = async (userData) => {

  const user_title = `<h1>${userData[0].user_title}</h1>`;
  const user_full_name = `<strong>${userData[0].user_full_name}</strong>`
  const user_adress = `<p>${userData[0].user_city} - ${userData[0].user_state}</p>`;
  const user_bio = `<p>${userData[0].user_bio}</p>`;
  const user_image = `<img src="${userData[0].user_image}" alt="" />`;

  $('#user_title').append(user_title);
  $('#user_badges').append(userData[0].instrument_badges_id);
  $('#user_full_name').append(user_full_name);
  $('#user_adress').append(user_adress);
  $('#user_bio').append(user_bio);
  $('#user_image').append(user_image);

  $('#wrapper').show()
}

const hideAllPage = () => {
  $('#wrapper').hide()
}

