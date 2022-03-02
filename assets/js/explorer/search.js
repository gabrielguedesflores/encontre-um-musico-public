$(document).ready(function(){
  const userSearch_key = verifyKeywordUrl();
  const user_id = user(); 
  validateLogin(user_id, userSearch_key)
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

const verifyKeywordUrl = () => {
  let url = window.location.href.replace(URL_PATH + '/navegar/', '');
  return url;
}

const validateLogin = async (user_id, userSearch_key) => { 
  const userData = await getUserFilterId(user_id)
  const userSearch = await getFindUsersByBadge(userSearch_key)
  if(userSearch.instrument_badges.length !== 0){
    console.log(userSearch)
    console.log(userData)
    showAllPage(userSearch, userData);
  }else{
    hideAllPage();
  }
}

const getFindUsersByBadge = async (userSearch) => {
  let urlUsersBadge = `https://encontre-um-musico-api.herokuapp.com/api/user/findUsersByBadge`;
  try {
    const { data } = await axios.post(urlUsersBadge, {
      instrument_badges_id: `%${userSearch}%` 
    });
    //console.log(data.instrument_badges.length)
    return data;
  } catch (error) {
    toastr.error("Nos reporte o bug, por favor!", "Falha ao encontrar os usuários.");
    return false
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

const showAllPage = async (userSearch, userData) => {

  const user_full_name = `<strong>${userData[0].user_full_name}</strong>`;

  const linha = `<hr class="major" />`;
  for (let i = 0; i < userSearch.instrument_badges.length; i++) {
    const user_friend = `
      <article>
        <a href="#" class="image"><img src="${userSearch.instrument_badges[i].user_image}" alt="" /></a>
        <h3 style="color: #141115;">
          ${userSearch.instrument_badges[i].user_full_name}
        </h3>
        <p>${userSearch.instrument_badges[i].user_bio}</p>
        <ul class="actions">
          <li><a href="/amigos/${userSearch.instrument_badges[i].user_id}" class="button">Ver perfil</a></li>
        </ul>
      </article>                              
  `;
  $('.posts').append(user_friend);
  $('.posts').append(linha);

  }

  $('#wrapper').show()
}

const hideAllPage = () => {
  $('#wrapper').hide()
}



