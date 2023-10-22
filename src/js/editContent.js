import imagemPreview from "../services/imagemPreview.js";
import {changeCampToInput} from '../services/changeCampForEdit.js'
const voltar = document.getElementById('Voltar');
const nomeConteiner = document.getElementById('nome');
const statusConteiner = document.getElementById('status');
const notaConteiner = document.getElementById('nota');
const imageConteiner = document.getElementById('image');
const inputImagem = document.getElementById('inputImagem');
const imagemView = document.getElementById('image');



nomeConteiner.textContent= localStorage.getItem('nomeEdit');
statusConteiner.textContent= 'Status: '+ localStorage.getItem('statusEdit');
notaConteiner.textContent= 'Nota: '+localStorage.getItem('notaEdit');
imageConteiner.src= localStorage.getItem('imgEdit');

imageConteiner.addEventListener('click',()=> inputImagem.click())

imagemPreview(inputImagem, imagemView);
nomeConteiner.addEventListener('click', ()=>{
    changeCampToInput(nomeConteiner, 'text');
})
notaConteiner.addEventListener('click', ()=>{
    changeCampToInput(notaConteiner, 'number');
})
voltar.addEventListener('click', ()=>{
    window.location.href= './lista.html';
})