const fs = require('fs');
const axios = require('axios');
const endOfLine = require('os').EOL;

const categoriesDataPath = 'http://www.jilanov.com:3200/api/categories';
const productsDataPath = 'http://www.jilanov.com:3200/api/products';
const routesFile = './dist/sitemap.xml';

let categories = [];
let products = [];

const xmlBuilder = () => {
    let date = (new Date()).toISOString();
    let starter = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
        <url>
            <loc>http://www.jilanov.com/</loc>
            <image:image>
                <image:loc>http://www.jilanov.com/assets/logo.jpg</image:loc>
                <image:caption>Jilanov logo</image:caption>
            </image:image>
            <priority>1</priority>
            <lastmod>${date}</lastmod>
        </url>
    `;
    let ender = `
    </urlset> 
    `
    let categoriesMiddle = categories.map((el) => {
        return `
        <url>
            <loc>http://www.jilanov.com/${el.route}</loc>
            <priority>0.9</priority>
            <lastmod>${date}</lastmod>
        </url>
        `
    }).join(endOfLine);
    let productsMiddle = products.map((el) => {
        let cat = categories.filter((cat) => cat.products === el.category)[0];
        if(!cat) {
            return '';
        }
        return `
            <url>
                <loc>http://www.jilanov.com/${cat.route}/product/${el.url}</loc>
                ${el.images ? el.images.map((img) => {
                    return `
                        <image:image>
                            <image:loc>http://www.jilanov.com/${cat.route}/product/${el.url}/${img}</image:loc>
                            <image:caption>${el.model.bg}</image:caption>
                        </image:image>
                    `
                }).join(endOfLine) : ''}
                <priority>${0.9 - (el.promotion ? 0 : 0.1) - (el.newProduct ? 0 : 0.1)}</priority>
                <lastmod>${date}</lastmod>
            </url>
        `
    }).join(endOfLine);
    fs.writeFileSync(routesFile, starter + categoriesMiddle + productsMiddle + ender, 'utf8');
}

axios.get(categoriesDataPath).then(res => {
  categories = res.data;
  console.log('categories: ', categories)
  if(products.length && categories.length) {
    xmlBuilder();
  }
}).catch(e => console.log(e));

axios.get(productsDataPath).then(res => {
  products = res.data;
  if(products.length && categories.length) {
    xmlBuilder();
  }
}).catch(e => console.log(e));

