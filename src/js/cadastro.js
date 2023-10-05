const form = document.getElementById("cadastro-form");
const errorMessage = document.getElementById('error-message');
const urlCadastroUser = 'http://localhost:8080/usuario';

// eventos
form.addEventListener('submit', (event)=>{
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm-password');
    const nomeUserFild = document.getElementById('username');

    const username = nomeUserFild.value;
    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;
    const data ={
        nome:username,
        senha:password
    }
    const options ={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    if(password !== confirmPassword){
        errorMessage.textContent= 'As senhas estão diferentes.'
        passwordField.value ='';
        confirmPasswordField.value= '';
        event.preventDefault();
    }else{
        errorMessage.textContent= '';
        
        fetch(urlCadastroUser, options).then(resp => resp.json()).then(data=>{
            
            if (data.valor) {
                localStorage.setItem('id', data.id);
                localStorage.setItem('nome', data.nome);
                window.location.href='./home.html';
            }else{
                errorMessage.textContent= 'Nome se usuario ja existe';
            }
        })

        event.preventDefault();
    }

})