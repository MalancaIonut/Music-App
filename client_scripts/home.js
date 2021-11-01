(function loggedInOrLoggedOut() {
    if (localStorage.user_id) {
        if (localStorage.role_id == 2) {
            document.getElementById('admin').style.display = 'block';
        }
        document.getElementById('logout').style.display = 'block';
        document.getElementById('allsongs').style.display = 'block';
    } else {
        document.getElementById('login').style.display = 'block';
        document.getElementById('signup').style.display = 'block';
    }
}());
