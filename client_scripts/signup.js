const Myform = document.getElementById("form");
Myform.addEventListener("submit", handleFormSubmit);

const redirectLocation = 'http://localhost:3000/auth/successfully';

function handleFormSubmit(event) {
    handleForm(event);
}

