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
        window.location.href='./addContent.html'
    }else{
        console.log(data)
        data.content.forEach(element => {
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
            

            if(element.imagem){
                const imagemBase64 =`data:image/png;base64,${element.imagem}`;
                const binaryString = atob(imagemBase64.split(",")[1]);
                const byteArray = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    byteArray[i] = binaryString.charCodeAt(i);
                }
                const blob = new Blob([byteArray], { type: 'image/png' })
                const blobUrl = URL.createObjectURL(blob);
                
                img.src = blobUrl;
            }else{
                img.src = '../../assets/Item_sem_imagem.png';
            }


            li.appendChild(imgConteiner);
            li.appendChild(itemConteudo);
            imgConteiner.appendChild(img);
            itemConteudo.appendChild(nome);
            itemConteudo.appendChild(status);
            itemConteudo.appendChild(nota);

            lista.appendChild(li);
        });
    }
});

addButton.addEventListener('click',()=>{
    window.location.href='./addContent.html'
})