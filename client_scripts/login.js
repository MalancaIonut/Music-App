const Myform = document.getElementById("form");
Myform.addEventListener("submit", handleFormSubmit);

const redirectLocation = 'http://localhost:3000/';

function handleFormSubmit(event) {
	handleForm(event);
}

(function loggedInOrLoggedOut() {
    document.getElementById('signup').style.display = 'block';
}());

