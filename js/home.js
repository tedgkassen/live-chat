const USER = 'user'
const SOCKET = 'socket'

$(document).ready(function () {
  window.addEventListener("beforeunload", signOut)
});

function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();

  let userData = {
    name: profile.getName(),
    id: profile.getId(),
    image: profile.getImageUrl()
  }

  sessionStorage.setItem(USER, userData)

  $.post('http://localhost:8080/join', userData)
    .done((data) => {
        $('#content').html(data)
      })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    sessionStorage.removeItem(USER)
    console.log('User signed out.')
  })
}
