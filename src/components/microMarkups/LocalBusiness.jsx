import { baseUrl } from "../../App";

const LocalBusiness = ({data}) => {
    // const location = data.contacts.offices.map(office => (
    //     {
    //         "name": office.title,
    //         "address": {
    //             "@type": "PostalAddress",
    //             "streetAddress": office.address.match(/,\s*(.*)/)?.[1],
    //             "addressLocality": office.address.match(/м\.\s*(.*?)(?=,)/)?.[1],
    //             "addressCountry": "Україна"
    //         },
    //         "geo": {
    //             "@type": "GeoCoordinates",
    //             "latitude": office.location[0],
    //             "longitude": office.location[1]
    //         },
    //         "openingHoursSpecification": {
    //             "@type": "OpeningHoursSpecification",
    //             "dayOfWeek": [
    //                 "Monday",
    //                 "Tuesday",
    //                 "Wednesday",
    //                 "Thursday",
    //                 "Friday",
    //                 "Saturday",
    //                 "Sunday"
    //             ],
    //             "opens": data.contacts.schedule.match(/\d{1,2}:\d{2}/g)[0],
    //             "closes": data.contacts.schedule.match(/\d{1,2}:\d{2}/g)[1]
    //         }
    //     }
    // ))
    const localBusiness = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `${data.aboutUs.companyName}`,
        "description": `${data.aboutUs.companyDescription.join(' ').replace(/\s*\n\s*/g, ' ').trim()}`,
        "currenciesAccepted": "UAH",
        "url": `${baseUrl}`,
        "logo": `${baseUrl}${data.generalIcons.logo}`,
        "sameAs": data.contacts.socialMedias.map(sb => sb.url),
        "telephone": data.contacts.phoneNumbers.map( nb => nb),
        // "location": location
    }

    return <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>;
}

export default LocalBusiness