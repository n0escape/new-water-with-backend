import { useLocation, useParams } from "react-router-dom";
import { baseUrl } from "../../App";


const BreadcrumbList = () => {
    const location = useLocation();
    // const params = useParams();
    // const id = params.idFromUrl || params.idService;
    const currentPath = location.pathname;
    let id = null;
    
    if (currentPath.includes('/service')) {
      id = currentPath.split('/service')[1]
    } else if (currentPath.includes('/order')) {
      id = currentPath.split('/order')[1]
    }
    console.log(baseUrl)
  
    const itemListElement = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Головна",
        "item": `${baseUrl}`
      },
      ...(id !== null
        ? [{
            "@type": "ListItem",
            "position": 2,
            "name": "Послуга",
            "item": `${baseUrl}/service${id}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Замовити послугу",
            "item": `${baseUrl}/order${id}`
          }]
        : [])
    ];
  
    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElement
    };
  
    return <script type="application/ld+json">{JSON.stringify(breadcrumbList)}</script>;
}

export default BreadcrumbList;