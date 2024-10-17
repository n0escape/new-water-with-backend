import { baseUrl } from "../../App";

function extractPrice(priceString) {
  // Используем регулярное выражение для поиска чисел в строке
  const match = priceString.match(/\d+(\s?\d{3})*/);
  // Если найдено совпадение, удаляем пробелы и возвращаем результат
  return match[0].replace(/\s/g, '');
}

const Product = ({serviceData, canonicalUrl}) => {
    const product = {
        "@context": "http://schema.org",
        "@type": "Product",
        "name": `${serviceData.title}`,
        "description": `${serviceData.description.join('').trim()}`,
        "image": `${baseUrl}${serviceData.photos[0].imageSrc}`,
        ...(serviceData.minPrice 
          ? { "offers": {
            "@type": "AggregateOffer",
            "availability": "http://schema.org/InStock",
            "lowPrice": `${extractPrice(serviceData.minPrice)}`, 
            "priceCurrency": "UAH",
            "url": `${canonicalUrl}`
          }}
          : null
        )
    }

    return <script type="application/ld+json">{JSON.stringify(product)}</script>;
}

export default Product;