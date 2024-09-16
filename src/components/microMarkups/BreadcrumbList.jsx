import { useLocation, useParams } from "react-router-dom";
import { baseUrl } from "../../App";


const BreadcrumbList = () => {
    const location = useLocation();
    const params = useParams();
    const id = params.idFromUrl || params.idService;
    const currentPath = location.pathname;
  
    const itemListElement = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Буріння свердловин в Харкові та області",
        "item": `${baseUrl}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": currentPath === '/service' ? "Послуги" : "Замовлення послуги",
        "item": `${baseUrl}${currentPath}${id ? `/${id}` : ''}`
      }
    ];
  
    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElement
    };
  
    return <script type="application/ld+json">{JSON.stringify(breadcrumbList)}</script>;
}

export default BreadcrumbList;