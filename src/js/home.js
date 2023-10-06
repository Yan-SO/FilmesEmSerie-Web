const filme = document.getElementById('filme');
const serie = document.getElementById('serie');
const desenhos = document.getElementById('desenhos');
const anime = document.getElementById('anime');
const usernameTitulo = document.getElementById('username');
const nome = localStorage.getItem('nome');
const idUser = localStorage.getItem('id');

usernameTitulo.textContent = nome;
console.log(`id: ${idUser}, nome: ${nome}`)

localStorage.setItem('tipo','')

//eventos

filme.addEventListener('click',()=>{
    localStorage.setItem('tipo','FILME')
    window.location.href='./itensList.html'
});
serie.addEventListener('click',()=>{
    localStorage.setItem('tipo','SERIE')
    window.location.href='./itensList.html'
});
desenhos.addEventListener('click',()=>{
    localStorage.setItem('tipo','DESENHO')
    window.location.href='./itensList.html'
});
anime.addEventListener('click',()=>{
    localStorage.setItem('tipo','ANIME')
    window.location.href='./itensList.html'
});