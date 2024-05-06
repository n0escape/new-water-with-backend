import { baseUrl } from "../../App";

const Product = ({serviceData, canonicalUrl}) => {
    const product = {
        "@context": "http://schema.org",
        "@type": "Product",
        "name": `${serviceData.title}`,
        "description": `${serviceData.shortDescription}`,
        "image": `${baseUrl}${serviceData.photos[0]}`,
        "offers": {
          "@type": "AggregateOffer",
          "availability": "http://schema.org/InStock",
          "lowPrice": `${serviceData.minPrice}`, 
          "priceCurrency": "UAH",
          "url": `${canonicalUrl}`
        }
    }

    return <script type="application/ld+json">{JSON.stringify(product)}</script>;
}

export default Product;