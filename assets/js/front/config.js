$(document).ready(function(){
  validateLogin()
  $('#sectionAlterarSenha').hide()
  $('.botoesMobile').hide()
  handlers()
  
});

const configComponents = (element) => {  
  estilizaBtnAtivo(element)
  switch (element.target.id) {
    case 'seu-perfil':
      $('#sectionSeuPerfil').show()

      $('#sectionAlterarSenha').hide()
      $('#sectionNotificacoes').hide()
      $('#sectionPrivacidade').hide()
      break;
    case 'alterar-senha':
      $('#sectionAlterarSenha').show()

      $('#sectionSeuPerfil').hide()
      $('#sectionNotificacoes').hide()
      $('#sectionPrivacidade').hide()
      break;
    case 'notificacoes':
      $('#sectionSeuPerfil').hide()
      $('#sectionAlterarSenha').hide()
      $('#sectionPrivacidade').hide()

      $('#sectionNotificacoes').show()
      break;
      case 'privacidade':
        $('#sectionSeuPerfil').hide()
        $('#sectionAlterarSenha').hide()
        $('#sectionNotificacoes').hide()

        $('#sectionPrivacidade').show()
        break;
  }
}

const estilizaBtnAtivo = (element) => {
  for (let i = 0; i < $('#banner').find('button').length; i++) {
    $('#banner').find('button').eq(i).removeClass('button primary small').addClass('button small')
  }
  element.target.className = 'button primary small'
}

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

const isMobile = () => {
  if (screen.width < 640 || screen.height < 480) {
      // sirva a versão pra celular
      return 'Mobile'
  } else if (screen.width < 1024 || screen.height < 768) {
      // talvez seja uma boa usar versão pra tablet
      return 'Tablet'
  } else {
      // sirva a versão normal
      return 'Web'
  }
}

const showAllPage = async (userData) => {

  if(isMobile() === 'Mobile'){
    $('#elementos').attr('style', 'margin-top: 150px;')
    $('.botoesMobile').show()
    $('.botoesWeb').hide()
  }

  const user_full_name = `<strong>${userData[0].user_full_name}</strong>`;
  $('#user_full_name').append(user_full_name);
  $("input[name='user_full_name']").val(userData[0].user_full_name);
  $("input[name='user_email']").val(userData[0].user_email);
  $("input[name='user_state']").val(userData[0].user_state);
  $("input[name='user_city']").val(userData[0].user_city);
  $("input[name='user_title']").val(userData[0].user_title);
  //$('#instruments_badges').append(userData[0].instrument_badges_id)
  $("textarea[name='user_bio']").val(userData[0].user_bio);

  $('#wrapper').show()
}

const hideAllPage = () => {
  $('#wrapper').hide()
}

const handlerMenuMobile = () => {
  console.log('handlerMenuMobile')
}

const handlers = () => {
  $('#seu-perfil').click(element => { configComponents(element) })

  $('#alterar-senha').click(element => { configComponents(element) })

  $('#notificacoes').click(element => { configComponents(element) })

  $('#privacidade').click(element => { configComponents(element) })
  
  $('#selectMenu').on('change', handlerMenuMobile())
}

