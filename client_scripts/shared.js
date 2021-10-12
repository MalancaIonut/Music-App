async function handleForm(event) {
	event.preventDefault();

	const form = event.currentTarget;
	const url = form.action;
	const formData = new FormData(form);
	const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);
	

	const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: formDataJsonString,
	};

	await fetch(url, fetchOptions)
	.then(response => {
		console.log(response);
		if (!response.ok) {
			return response.json().then(data => {throw new Error(data.message)})
		}
		window.location = redirectLocation; 
	})
	.catch((error) => {
		document.getElementById('errorMessage').innerText = error.message;
        document.getElementById('errorMessage').style.display = 'block';
	});
}