export default function getImage(element){
    if(element.imagem){
        const imagemBase64 =`data:image/png;base64,${element.imagem}`;
        const binaryString = atob(imagemBase64.split(",")[1]);
        const byteArray = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            byteArray[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([byteArray], { type: 'image/png' })
        const blobUrl = URL.createObjectURL(blob);
        
        return blobUrl;
    }else{
        return '../../assets/Item_sem_imagem.png';
    }
}