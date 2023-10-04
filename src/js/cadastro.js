const form = document.getElementById("cadastro-form");
const errorMessage = document.getElementById('error-message');

// eventos
form.addEventListener('submit', (event)=>{
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm-password');

    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;

    if(password !== confirmPassword){
        errorMessage.textContent= 'As senhas estão diferentes.'
        passwordField.value ='';
        confirmPasswordField.value= '';
        event.preventDefault();
    }else{
        errorMessage.textContent= '';
        event.preventDefault();
    }

})