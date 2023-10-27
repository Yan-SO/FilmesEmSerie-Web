import imagemPreview from "../services/imagemPreview.js";
import {changeCampToInput} from '../services/changeCampForEdit.js'
const voltar = document.getElementById('Voltar');
const nomeConteiner = document.getElementById('nome');
const notaConteiner = document.getElementById('nota');
const imageConteiner = document.getElementById('image');
const inputImagem = document.getElementById('inputImagem');
const imagemView = document.getElementById('image');
const dropdownSelect = document.getElementById('dropdownSelect');
const dropdownOptions = document.querySelector('.dropdown-options');
const deletar = document.getElementById('deletar');
const cancelarBotao = document.getElementById('cancelarBotao');
const popupBackground = document.getElementById('popup-background');
const popup = document.getElementById('popup');
const deletarBotao = document.getElementById('deletarBotao');
const textoPopUp = document.getElementById('textoPopUp');
const salvar = document.getElementById('salvar');
const urlUpdate= 'http://localhost:8080/item';

localStorage.setItem('editing', '');


nomeConteiner.textContent= localStorage.getItem('nomeEdit');
notaConteiner.textContent= 'Nota: '+localStorage.getItem('notaEdit');
imageConteiner.src= localStorage.getItem('imgEdit');

imageConteiner.addEventListener('click',()=> inputImagem.click())


nomeConteiner.addEventListener('click', ()=>{
    changeCampToInput(nomeConteiner, 'text');
})
notaConteiner.addEventListener('click', ()=>{
    changeCampToInput(notaConteiner, 'number');
})
voltar.addEventListener('click', ()=>{
    window.location.href= './lista.html';
})

dropdownSelect.textContent= localStorage.getItem('statusEdit');
dropdownSelect.addEventListener('click', () => {
  dropdownOptions.classList.toggle('active');
});


const dropdownOptionElements = document.querySelectorAll('.dropdown-option');
dropdownOptionElements.forEach((option) => {
  option.addEventListener('click', () => {
    localStorage.setItem('statusEdit', option.textContent);
    dropdownSelect.textContent = localStorage.getItem('statusEdit');
    dropdownOptions.classList.remove('active');
  });
});

document.addEventListener('click', (event) => {
  if (!dropdownSelect.contains(event.target) && !dropdownOptions.contains(event.target)) {
    dropdownOptions.classList.remove('active');
  }
});

imagemPreview(inputImagem, imagemView, 'true');
salvar.addEventListener('click',()=>{
  
  if(!localStorage.getItem('editing')){
    const data = {
      id:localStorage.getItem('idItem'),
      nomeItem:localStorage.getItem('nomeEdit'),
      status:localStorage.getItem('statusEdit'),
      nota:localStorage.getItem('notaEdit')
    }
    const options = {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch(urlUpdate, options).then(resp => resp.json()).then(resp => {
      window.location.href = './lista.html';
    })
  
  }else{
    const mensageError = document.getElementById('mensageError');
    mensageError.textContent= 'Confirme as mudansas antes de salvar';
  }

})


deletarBotao.addEventListener('click',()=>{
  fetch(`http://localhost:8080/item/id=${localStorage.getItem('idItem')}`,{
    method: 'DELETE',
  }).then(response => response.json())
  .then(data => {
    textoPopUp.textContent='Item apagado'
    cancelarBotao.style.display= 'none';
    deletarBotao.style.display= 'none';
    setTimeout(function() {
      window.location.href = './lista.html';
    }, 5000);
  }).catch((error) => console.error('Erro:', error));
})

deletar.addEventListener("click", function() {
  popup.style.display = "block";
  popupBackground.style.display = "block";
});

cancelarBotao.addEventListener("click", function() {
  popup.style.display = "none";
  popupBackground.style.display = "none";
});

popupBackground.addEventListener("click", function() {
  popup.style.display = "none";
  popupBackground.style.display = "none";
});