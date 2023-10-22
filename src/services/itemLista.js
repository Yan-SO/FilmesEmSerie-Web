import getImage from './getImage.js';
export default function itemLista(element, lista){
    const li = document.createElement('li');
            const imgConteiner = document.createElement('div');
            const img = document.createElement('img');
            const itemConteudo = document.createElement('div');
            const nome = document.createElement('h2');
            const status = document.createElement('h4');
            const nota = document.createElement('h3');

            li.id = element.id;
            li.className = 'itemConteiner';
            imgConteiner.className = 'imgConteiner';
            itemConteudo.className = 'itemConteudo';
            nome.className = 'nome';
            status.className = 'status';
            nota.className= 'nota';

            nome.textContent = element.nomeItem;
            status.textContent = "Status: "+element.status;
            nota.textContent = "Nota: "+element.nota;
            
            const imgSrc =getImage(element);
            img.src = imgSrc;


            li.appendChild(imgConteiner);
            li.appendChild(itemConteudo);
            imgConteiner.appendChild(img);
            itemConteudo.appendChild(nome);
            itemConteudo.appendChild(status);
            itemConteudo.appendChild(nota);

            lista.appendChild(li);

            li.addEventListener('click', ()=>{
                localStorage.setItem('nomeEdit', element.nomeItem);
                localStorage.setItem('statusEdit', element.status);
                localStorage.setItem('notaEdit', element.nota);
                localStorage.setItem('imgEdit', imgSrc);
                localStorage.setItem('idItem', element.id);
                window.location.href= '../screens/editContent.html'
            })
}