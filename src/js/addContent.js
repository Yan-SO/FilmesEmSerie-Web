const tituloPagina = document.getElementById('titulo');
const dropdownSelect = document.querySelector('.dropdown-select');
const dropdownOptions = document.querySelector('.dropdown-options');
const tipo = localStorage.getItem('tipo');
const tituloCampoStatus = document.getElementById('tituloCampoStatus');
const lista = document.getElementById('lista');
const largado = document.getElementById('largado');
const terminado = document.getElementById('terminado');
const vendo = document.getElementById('vendo');
const interessado = document.getElementById('interessado');
const botaoConteine = document.getElementById('botaoConteine');
const nomeItem = document.getElementById('nomeItem');
const notaItem = document.getElementById('notaItem');
const nomeAlert = document.getElementById('nomeAlert');
const stausAlert = document.getElementById('stausAlert');
const notaAlert = document.getElementById('notaAlert');
const imagemPreview = document.getElementById('imagemPreview');
const inputImagem = document.getElementById('inputImagem');
const urlCadastroItens = 'http://localhost:8080/item';


//eventos
localStorage.setItem('status', 'Selecione uma opção');

lista.addEventListener('click', ()=>{
    window.location.href = './itensList.html';
})

dropdownSelect.textContent = localStorage.getItem('status');
largado.addEventListener('click', ()=>{
    localStorage.setItem('status', 'LARGADO');
    dropdownSelect.textContent = 'Largado';
});
interessado.addEventListener('click', ()=>{
    localStorage.setItem('status', 'INTERESSADO');
    dropdownSelect.textContent = 'Interessado';
});
vendo.addEventListener('click', ()=>{
    localStorage.setItem('status', 'VENDO');
    dropdownSelect.textContent = 'Vendo';
});
terminado.addEventListener('click', ()=>{
    localStorage.setItem('status', 'TERMINADO');
    dropdownSelect.textContent = 'Terminado';
});

if(tipo === 'SERIE'){
    tituloCampoStatus.textContent = `Qual o status da ${tipo.toLowerCase()}:`
}else{
    tituloCampoStatus.textContent = `Qual o status do ${tipo.toLowerCase()}:`
}
tituloPagina.textContent = `Adicioner um novo ${tipo.toLowerCase()}`;

dropdownSelect.addEventListener('click', () => {
    dropdownOptions.classList.toggle('active');
});
interessado.addEventListener('click', () => {
    dropdownOptions.classList.toggle('active');
});
vendo.addEventListener('click', () => {
    dropdownOptions.classList.toggle('active');
});
terminado.addEventListener('click', () => {
    dropdownOptions.classList.toggle('active');
});
largado.addEventListener('click', () => {
    dropdownOptions.classList.toggle('active');
});

botaoConteine.addEventListener('click', () => {
    const data = {
        nomeItem: nomeItem.value,
        tipo: tipo,
        status: localStorage.getItem('status'),
        nota: notaItem.value,
        idUsuario: localStorage.getItem('id')
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    if (validaCampos()) {
        if (localStorage.getItem('id')) {
            fetch(urlCadastroItens, options)
                .then(resp => resp.json())
                .then(resp => {
                    if (resp.valor) {
                        if (inputImagem.files && inputImagem.files[0]) {
                            const arquivo = inputImagem.files[0];

                            if (arquivo.type === 'image/png') {
                                const formData = new FormData();
                                formData.append('image', arquivo);
                                const urlAddImagem = `http://localhost:8080/item/imagem/add-${resp.id}`;

                                fetch(urlAddImagem, {
                                    method: 'POST',
                                    body: formData,
                                })
                                .then(response => response.json())
                                .then(data => {
                                    if (data.valor) {
                                        console.log(data);
                                        window.location.href = './itensList.html';
                                    } else {
                                        console.log(data.Message);
                                    }
                                })
                                .catch(error => {
                                    console.error(error);
                                });
                            } else {
                                alert('Selecione uma imagem PNG válida.');
                                inputImagem.value = '';
                            }
                        } else {
                            console.log('imagem nao add');
                        }
                    } else {
                        console.error(` DEU ERRO: ${resp.Message}`);
                    }
                });
        } else {
            window.location.href = '../../index.html';
        }
    }
});


function limparMensagens(){
    nomeAlert.textContent = '';
    stausAlert.textContent='';
    notaAlert.textContent='';
}
function validaCampos(){
    limparMensagens();
    let nomeValid = false;
    let statusValid= false;
    let notaValid= false;

    if(nomeItem.value){
        nomeValid= true;
    }else{
        nomeAlert.textContent='Por favor coloque o nome da obra'
    }
    if(localStorage.getItem('status') ==='Selecione uma opção'){
        stausAlert.textContent= 'Por favor selecione uma opção';
    }else{
        statusValid = true;
    }
    if(!notaItem.value){
        notaAlert.textContent='Por favor coloque uma nota da obra';
    }else if(notaItem.value <0 || notaItem.value >10){

        notaAlert.textContent='Por favor coloque uma nota de 0 até 10';
    } else {
        notaValid= true;
    }
    if(nomeValid && statusValid && notaValid){
        return true;
    }else{return false;}
}

inputImagem.addEventListener('change',()=>{
    if (inputImagem.files && inputImagem.files[0]){
        const arquivo = inputImagem.files[0];
        if (arquivo.type === 'image/png') {
            const leitor = new FileReader();
            leitor.onload = (e)=>{
                const urlImagem = e.target.result;
                imagemPreview.src = urlImagem;
            }
            leitor.readAsDataURL(arquivo);
        }else {

            alert('Selecione uma imagem PNG válida.');
            inputImagem.value = '';
            imagemPreview.src = '../../assets/Item_sem_imagem.png';
        }
    }
})

