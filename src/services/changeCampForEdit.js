export function changeCampToInput(nomeConteiner, type){
    localStorage.setItem('editing', true);

    const inputText = document.createElement('input')
    const botao = document.createElement('h1')
    
    const inputTextConteiner = document.createElement('div')
    
    inputText.type = type;
    if(type === 'text'){
        inputText.value = localStorage.getItem('nomeEdit');
    }else if(type ==='number'){
        inputText.value = localStorage.getItem('notaEdit');
    }
    inputText.className= 'nome';
    botao.textContent = 'Confirmar';
    botao.className = 'buttonConfirmar';
    inputTextConteiner.className= 'inputTextConteiner';

    
    inputTextConteiner.appendChild(inputText)
    inputTextConteiner.appendChild(botao)
    nomeConteiner.parentNode.replaceChild(inputTextConteiner, nomeConteiner);
    botao.addEventListener('click', ()=>{
        if(type === 'text'){
            localStorage.setItem('nomeEdit', inputText.value);
            location.reload();
        }else if(type ==='number'){
            if(inputText.value > 0 && inputText.value <=10){
                localStorage.setItem('notaEdit', inputText.value);
                location.reload();
            }else{ 
                const span = document.createElement('span');
                span.className = 'span';
                span.textContent = 'numero invalido, coloque um entre 0 e 10';
                inputTextConteiner.parentNode.appendChild(span);
            }
            
        }else{
            console.error('type na function changeCampToInput errado');
        }

    })
}