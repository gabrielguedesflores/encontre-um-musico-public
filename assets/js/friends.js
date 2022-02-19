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
  const userFriends = await getFriendsOfUser(user_id)
  if(userFriends){
    showAllPage(userFriends);
  }else{
    toastr.error("Não possível encontrar seus amigos.")
  }
}

const getFriendsOfUser = async (user_id) => {
  let urlUser = 'https://encontre-um-musico-api.herokuapp.com/api/user/friends';
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

  const linha = `<hr class="major" />`;
  for (let i = 0; i < userData.user_friends[0].user_friends.length; i++) {
    const user_friend = `
      <article>
        <a href="#" class="image"><img src="${userData.user_friends[0].user_friends[i].user_image}" alt="" /></a>
        <h3 style="color: #141115;">
          ${userData.user_friends[0].user_friends[i].user_full_name}
        </h3>
        <p>${userData.user_friends[0].user_friends[i].user_bio}</p>
        <ul class="actions">
          <li><a href="#" class="button">Ver perfil</a></li>
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

