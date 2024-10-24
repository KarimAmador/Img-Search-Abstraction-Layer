const query = document.getElementById('query');
const page = document.getElementById('page');
const searchQuery = document.getElementById('searchQuery');
const button = document.querySelector('.button');
const base = window.location.href;

searchQuery.innerText = base;

const updateURL = (e) => {
    if (!query.value) {
        button.classList.add('disabled');
        searchQuery.innerText = base;
        searchQuery.setAttribute('href', base);
        button.setAttribute('href', base);
        return;
    };
    
    const search = `${base}query/${query.value}?page=${page.value}`;
    searchQuery.innerText = search;
    searchQuery.setAttribute('href', search);
    button.setAttribute('href', search);
    button.classList.remove('disabled');
}

[query, page].forEach(i => i.addEventListener('change', updateURL));
[query, page].forEach(i => i.addEventListener('keydown', (e) => {
    if (e.key == 'Enter' && query.value) {
        updateURL(e);
        window.location.href = searchQuery.innerText;
    }
}));