export default function imagemPreview(inputImagem, imagemPreView){
    inputImagem.addEventListener('change',()=>{
        if (inputImagem.files && inputImagem.files[0]){
            const arquivo = inputImagem.files[0];
            if (arquivo.type === 'image/png') {
                const leitor = new FileReader();
                leitor.onload = (e)=>{
                    const urlImagem = e.target.result;
                    imagemPreView.src = urlImagem;
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