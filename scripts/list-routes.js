const fs = require('fs');
const axios = require('axios');
const endOfLine = require('os').EOL;

const categoriesDataPath = 'http://www.jilanov.com:3200/api/categories';
const productsDataPath = 'http://www.jilanov.com:3200/api/products';
const routesFile = './routes.txt';

let categories = [];
let products = [];

axios.get(categoriesDataPath).then(res => {
  res.data.forEach(category => {
    categories.push(category.route);
  });
  console.log('Categories: ', categories)
  if(products.length && categories.length) {
    fs.writeFileSync(routesFile, categories.join(endOfLine) + products.join(endOfLine), 'utf8');
  }
}).catch(e => console.log(e));

axios.get(productsDataPath).then(res => {
  res.data.forEach(product => {
    products.push(`category/${product.category}/product/${product.url}`);
  });
  console.log('Products: ', products)
  if(products.length && categories.length) {
    fs.writeFileSync(routesFile, categories.join(endOfLine) + products.join(endOfLine), 'utf8');
  }
}).catch(e => console.log(e));
