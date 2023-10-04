const dropdownSelect = document.querySelector('.dropdown-select');
const dropdownOptions = document.querySelector('.dropdown-options');

dropdownSelect.addEventListener('click', () => {
    dropdownOptions.classList.toggle('active');
});