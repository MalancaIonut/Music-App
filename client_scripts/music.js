(function loggedInOrLoggedOut() {
    if (localStorage.user_id) {
        if (localStorage.role_id == 2) {
            document.getElementById('admin').style.display = 'block';
        }
        document.getElementById('logout').style.display = 'block';
    }
}());

function search() {
    let input, filter, cards;
    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; ++i) {
        let title = cards[i].querySelector('.card-body');
        if (title) {
            let txtValue = title.textContent;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                cards[i].style.display = '';
            } else {
                cards[i].style.display = 'none';
            }
        }
    }
}
