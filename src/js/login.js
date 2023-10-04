const cadastro = document.querySelector('#cadastro');
const form = document.getElementById("login-form");

// eventos
form.addEventListener('submit', (event)=>{
    window.location.href='./home.html'
    event.preventDefault();
});
cadastro.addEventListener('click',()=>{
    window.location.href='./cadastro.html'
})