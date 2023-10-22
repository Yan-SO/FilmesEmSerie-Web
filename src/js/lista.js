import itemLista from '../services/itemLista.js'
const addButton = document.getElementById('addButton');
const titulo = document.getElementById('titulo');
const lista = document.getElementById('lista');
const home = document.getElementById('home');
const tipo = localStorage.getItem('tipo');
const urlGetContedo = 'http://localhost:8080/item/tipo';

const data = {
    idUsuario: localStorage.getItem('id'),
    tipo:tipo
}
const options = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
} 

//eventos
home.addEventListener('click', ()=>{
    window.location.href='./home.html'
})
titulo.textContent = tipo+'S';
fetch(urlGetContedo, options).then(resp => resp.json()).then(data =>{
    if(data.empty){
        localStorage.setItem('listEmpty','true');
        alert('não tem '+tipo+'S cadastrados, por favor cadastre um');
        window.location.href='./addContent.html';
    }else{
        localStorage.setItem('listEmpty','false');
        console.log(data)
        data.content.forEach(e =>itemLista(e, lista));
    }
});

addButton.addEventListener('click',()=>{
    window.location.href='./addContent.html'
})