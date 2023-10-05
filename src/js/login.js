const cadastro = document.querySelector('#cadastro');
const form = document.getElementById("login-form");
const wrongName = document.getElementById('wrong-name');
const wrongPassword = document.getElementById('wrong-password');
const urlLogin= 'http://localhost:8080/usuario/login';

// eventos
form.addEventListener('submit', (event)=>{

    let queryString;
    const usernameFileld = document.getElementById('username');
    const passwordField = document.getElementById('password');

    const usernameInf = usernameFileld.value;
    const passwordInf = passwordField.value;

    const data = {
        nome:usernameInf,
        senha:passwordInf
    }

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(urlLogin, options).then(resp => resp.json()).then(data => {
        if(data.valor){
            localStorage.setItem('id', data.id);
            localStorage.setItem('nome', data.nome);
            wrongName.textContent = '';
            wrongPassword.textContent=''

            window.location.href='./home.html'
            
        }else if(data.Message ==="wrong name"){
            wrongName.textContent = 'Nome de Usuario não existe';
            wrongPassword.textContent=''
            console.log(data);
        }else{
            wrongName.textContent = '';
            wrongPassword.textContent='Senha errada'
            console.log(data);

        }

    }).catch(error =>{
        console.error('Erro:', error);
    })

    //window.location.href='./home.html'
    event.preventDefault();
});

cadastro.addEventListener('click',()=>{
    window.location.href='./cadastro.html'
})