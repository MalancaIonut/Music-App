(function loggedInOrLoggedOut() {
    if (localStorage.user_id) {
        document.getElementById('logout').style.display = 'block';
        document.getElementById('allsongs').style.display = 'block';
    } else {
        document.getElementById('login').style.display = 'block';
        document.getElementById('signup').style.display = 'block';
    }
}());