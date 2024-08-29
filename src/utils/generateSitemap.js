import { baseUrl } from './../App';

function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const generateSitemapData = (pagesData) => {
    let currDate = getCurrentDate();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    `;

    xml += `<url>
        <loc>${baseUrl}</loc>
        <lastmod>${currDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1</priority>
    </url>
    `;

    pagesData.forEach(page => {
        xml += `<url>
        <loc>${baseUrl}/service/${page.id}</loc>
        <lastmod>${currDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>
    `;
    });
    pagesData.forEach(page => {
        xml += `<url>
        <loc>${baseUrl}/order/${page.id}</loc>
        <lastmod>${currDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
`;
    });

    xml += `</urlset>`;

    return xml;
}

const generateSitemap = (pagesData) => {
    const sitemap = generateSitemapData(pagesData);

    // Создаем содержимое файла XML
    const blob = new Blob([sitemap], { type: 'text/xml' });

    // Создаем ссылку для загрузки файла
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Очищаем ссылку после завершения загрузки
    window.URL.revokeObjectURL(url);
}


export default generateSitemap;
