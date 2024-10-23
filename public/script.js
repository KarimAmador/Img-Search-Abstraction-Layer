const query = document.getElementById('query');
const page = document.getElementById('page');
const searchQuery = document.getElementById('searchQuery');
const buttonClass = document.querySelector('.button').classList;
const base = window.location.href;

searchQuery.innerText = base;

const updateURL = (e) => {
    if (!query.value) {
        buttonClass.add('disabled');
        searchQuery.innerText = base;
        searchQuery.setAttribute('href', base);
        document.querySelector('.button').setAttribute('href', base);
        return;
    };
    
    const search = `${base}query/${query.value}?page=${page.value}`;
    searchQuery.innerText = search;
    searchQuery.setAttribute('href', search);
    document.querySelector('.button').setAttribute('href', search);
    buttonClass.remove('disabled');
}

[query, page].forEach(i => i.addEventListener('change', updateURL));
[query, page].forEach(i => i.addEventListener('keydown', (e) => {
    const code = e.keyCode || e.which;
    if (code == 13 && query.value) {
        updateURL(e);
        window.location.href = searchQuery.innerText;
    }
}));