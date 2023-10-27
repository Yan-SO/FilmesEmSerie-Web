export default async function editImage(id, inputImagem){
    if (inputImagem.files && inputImagem.files[0]) {
        const arquivo = inputImagem.files[0];

        if (arquivo.type === 'image/png') {
            const formData = new FormData();
            formData.append('image', arquivo);
            const urlAddImagem = `http://localhost:8080/item/imagem/add-${id}`;

            await fetch(urlAddImagem, {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.valor) {
                    console.log(data);
                } else {
                    console.log(data.Message);
                }
            })
            .catch(error => {
                console.error(error);
            });
        } else {
            alert('Selecione uma imagem PNG válida.');
            //inputImagem.value = '';
        }
    } else {
        console.log('imagem nao add');
    }
}