import editImage from "./editImage.js";

export default function imagemPreview(inputImagem, imagemPreView, saveLocalStorage){
    inputImagem.addEventListener('change',()=>{
        if (inputImagem.files && inputImagem.files[0]){
            const arquivo = inputImagem.files[0];
            if (arquivo.type === 'image/png') {
                const leitor = new FileReader();
                leitor.onload = (e)=>{
                    const urlImagem = e.target.result;
                    imagemPreView.src = urlImagem;
                    if(saveLocalStorage){
                        localStorage.setItem('imgEdit',urlImagem)
                        editImage(localStorage.getItem('idItem'),inputImagem);
                    }
                }
                leitor.readAsDataURL(arquivo);
            }else {
    
                alert('Selecione uma imagem PNG válida.');
                inputImagem.value = '';
                imagemPreView.src = '../../assets/Item_sem_imagem.png';
            }
        }
    })
}