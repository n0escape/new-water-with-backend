import { baseUrl } from "../../App";

function extractPrice(priceString) {
  // Используем регулярное выражение для поиска чисел в строке
  const match = priceString.match(/\d+(\s?\d{3})*/);
  // Если найдено совпадение, удаляем пробелы и возвращаем результат
  return match ? match[0].replace(/\s/g, '') : null;
}

const Product = ({serviceData, canonicalUrl}) => {
    const product = {
        "@context": "http://schema.org",
        "@type": "Product",
        "name": `${serviceData.title}`,
        "description": `${serviceData.description.join('').trim()}`,
        "image": `${baseUrl}${serviceData.photos[0].imageSrc}`,
        "offers": {
          "@type": "AggregateOffer",
          "availability": "http://schema.org/InStock",
          "lowPrice": `${extractPrice(serviceData.minPrice)}`, 
          "priceCurrency": "UAH",
          "url": `${canonicalUrl}`
        }
    }

    return <script type="application/ld+json">{JSON.stringify(product)}</script>;
}

export default Product;