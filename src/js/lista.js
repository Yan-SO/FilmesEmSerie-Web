import itemLista from '../services/itemLista.js'
const addButton = document.getElementById('addButton');
const titulo = document.getElementById('titulo');
const lista = document.getElementById('lista');
const home = document.getElementById('home');
const voltar = document.getElementById('voltar');
const numPage = document.getElementById('numPage');
const proximo = document.getElementById('proximo');
const tipo = localStorage.getItem('tipo');
const itensPorPagina = 10;
let paginaAtual = 0;
const urlGetContedo = `http://localhost:8080/item/tipo?page=${paginaAtual}&size=${itensPorPagina}`;

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
proximo.addEventListener('click',()=>{
    if((paginaAtual+1) === parseInt(localStorage.getItem('totalPages'))){
        alert('Ultima pagina')
    }else{
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }
        paginaAtual++;
        localStorage.setItem('paginaAtual', paginaAtual);
        console.log(paginaAtual)
        numPage.textContent= `${paginaAtual+1} de ${localStorage.getItem('totalPages')}`;
        console.log(' volor'+paginaAtual)
        let novaURL =`http://localhost:8080/item/tipo?page=${localStorage.getItem('paginaAtual')}&size=${itensPorPagina}`;
        fetch(novaURL, options).then(resp => resp.json()).then(data =>{
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
    }
});
voltar.addEventListener('click',()=>{
    if(paginaAtual <= 0){
        alert('Primeira pagina')
    }else{
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }
        paginaAtual--;
        localStorage.setItem('paginaAtual', paginaAtual);
        numPage.textContent= `${paginaAtual+1} de ${localStorage.getItem('totalPages')}`;
        let novaURL =`http://localhost:8080/item/tipo?page=${localStorage.getItem('paginaAtual')}&size=${itensPorPagina}`;
        fetch(novaURL, options).then(resp => resp.json()).then(data =>{
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
    }
});

home.addEventListener('click', ()=>{
    window.location.href='./home.html'
})

function numeroDePaginas(){if(localStorage.getItem('totalPages')){
    return localStorage.getItem('totalPages');
}else{
    return "0";
}}
titulo.textContent = tipo+'S';
fetch(urlGetContedo, options).then(resp => resp.json()).then(data =>{
    if(data.empty){
        localStorage.setItem('listEmpty','true');
        alert('não tem '+tipo+'S cadastrados, por favor cadastre um');
        window.location.href='./addContent.html';
    }else{
        localStorage.setItem('listEmpty','false');
        localStorage.setItem('totalPages', data.totalPages);
        console.log(data)
        data.content.forEach(e =>itemLista(e, lista));
        numPage.textContent= `${paginaAtual+1} de ${numeroDePaginas()}`;
    }
});


addButton.addEventListener('click',()=>{
    window.location.href='./addContent.html'
})