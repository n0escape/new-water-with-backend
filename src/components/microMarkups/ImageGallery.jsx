import { useEffect, useState } from "react";
import { baseUrl } from './../../App';

const ImageGallery = ({context, photoList}) => {
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect( () => {
        switch (context) {
            case 'works':
                setName('Приклади робот виконаних компаниєю New Water');
                setDescription('Перегляньте роботи виконані компанією New Water, на прикладі ілюстрації');
                break;
            case 'service':
                setName('Послуги компанії New Water');
                setDescription('Ілюстрації послуг, що надаються компанією New Water');
                break;
            default:
                setName(null);
                setDescription(null);
        }
    },[context])

    const image = [photoList.map( photo => (
        {
            "@type": "ImageObject",
            "url": baseUrl + photo.imageSrc,
            "description": photo.title
        }
    ))]
    const imageGallery = {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": `${name}`,
        "description": `${description}`,
        "image": image
    }

    return <script type="application/ld+json">{JSON.stringify(imageGallery)}</script>
}

export default ImageGallery;