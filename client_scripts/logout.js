function logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('role_id');
    window.location = 'http://localhost:3000';
}

setTimeout(() => { logout(); }, 2000);
