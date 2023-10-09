interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string
}

/* Home page functionality */
function displayProducts(products: Product[]) {
    const productContainer = document.getElementById('product-list');
    productContainer?.classList.add('d-flex', 'flex-wrap');
    
    products.forEach((product) => {
        const card = document.createElement('div');
        // card.href = `product-details.html?id=${product.id}`;
        card.classList.add('card', 'mb-3', 'mx-auto', 'shadow');
        card.style.width = '280px';
        card.style.height = '350px';
        card.style.padding = '20px';
        card.style.color = 'black';
        card.style.textDecoration = 'none';

        const truncatedTitle = product?.title.substring(0, 40); + "...";
        
        card.innerHTML = `
        <a href=product-details.html?id=${product.id} class="card" style="color: black; text-decoration: none;">
            <img src="${product.image}" class="card-img-top" alt="${truncatedTitle}" style="height: 150px; width: 180px; margin: auto">
            <div class="card-body">
                <h6 class="card-title mb-3 mt-3">${truncatedTitle}</h6>
                <h6 class="card-text">Price: $${product.price}</h6>
            </div>
        </a>
        <button type="button" class="btn btn-warning cart-btn" onclick="addToCart('${product.id}')">Add to cart</button>
        `;
        
        productContainer?.appendChild(card);
    });
}

//get products of specific category
async function getAllProducts(categoryName: string) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${categoryName}`); 
        if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      return data as Product[];
    } catch (error) {
        throw new Error(`Error fetching products`);
    }
}

/* ---------------Categories-----------------*/ 
async function getAllCategories(){
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching products`);
    }
}


/* ------------Product Details--------------*/
async function getProductDetails(productId: any){
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);

    const data = await response.json();
    return data;
}

function displayProductDetails(productDetails: any){
    const details = document.querySelector('.details');
    if(details !== null){

        details.innerHTML = `
        <div class="card mb-3" style="max-width: 80%; margin: auto;">
            <div class="row g-0">
            <div class="col-md-4">
                <img src=${productDetails?.image} class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">${productDetails?.title}</h5>
                <br>
                <p class="card-text" style="font-weight: 400; font-size: 15px">${productDetails.description}</p>
                <p class="card-text"><small class="text-muted">Ratings: ${productDetails.rating.rate}⭐</small></p>
                <p class="card-text">$${productDetails.price}</p>
                <button type="button" class="btn btn-warning" onclick="addToCart('${productDetails.id}')">Add to cart</button>
                </div>
            </div>
            </div>
        </div>
        `;
    }
}


/* -------------------Cart Functionality----------------- */

async function getCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (cart.length === 0) {
        // console.log('Cart is empty.');
        return;
    }
    
    for (const productId of cart) {
        try {
            const productDetails = await getProductDetails(productId);
            displayCartProduct(productDetails);
        } catch (error) {
            console.error(`Error fetching product with ID ${productId}:`, error);
        }
    }
}

function displayCartProduct(productDetails: any){
    const cart = document.querySelector('.cart');

    const item = document.createElement('div');
    if(cart !== null){

        item.innerHTML =  `
        <div class="card mb-3" style="max-width: 80%; margin: auto; max-height: '200px';">
            <div class="row g-0">
            <div class="col-md-4">
                <img src=${productDetails?.image} class="img-fluid rounded-start" alt="..." style="width: 150px; height: 180px">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">${productDetails?.title}</h5>
                <p class="card-text"><small class="text-muted">Ratings: ${productDetails.rating.rate}</small></p>
                <p class="card-text">$${productDetails.price}</p>
                <button type="button" class="btn btn-warning" onclick="removeFromCart('${productDetails.id}')">Remove</button>
                </div>
            </div>
            </div>
        </div>
        `;

        cart.appendChild(item);
        // location.reload();
    }
}

function addToCart(id: number) {
    const existingCart = JSON.parse(localStorage.getItem('cart') as string) || [];

    existingCart.push(id);

    localStorage.setItem('cart', JSON.stringify(existingCart));

    // console.log('Updated Cart:', existingCart);
    calculateAndStoreTotalPrice();
    alert('Item added to cart');
}

function removeFromCart(id: number){
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const updatedCart = existingCart.filter((productId: number) => productId !== id);
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    location.reload();
    calculateAndStoreTotalPrice();
}

// Function to calculate the sum of prices in the cart and store it in local storage

async function calculateAndStoreTotalPrice() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let totalPrice = 0;
    for (const productId of cart) {
      try {
        const productDetails = await getProductDetails(productId);
        totalPrice += productDetails.price;
      } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
      }
    }
  
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
}
  


// Utility function to get 'id' from the params

function getParameterByName(name: string, url: string) {
    // console.log('fetching product details');
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


//Checkout functionality

const payButton = document.getElementById('pay-button');

const paymentPage = document.querySelector('.paymentPage') as HTMLDivElement;

const nameInput = document.getElementById('text') as HTMLInputElement;
const cardNumberInput = document.getElementById('card-number') as HTMLInputElement;
const expirationDateInput = document.getElementById('expiration-date') as HTMLInputElement;
const cvvInput = document.getElementById('cvv') as HTMLInputElement;

if (payButton) {
    payButton.addEventListener('click', (e) => {
        if (nameInput.value.trim() !== '' && cardNumberInput.value.trim() !== '' && expirationDateInput.value.trim() !== '' && cvvInput.value.trim() !== '') {
            e.preventDefault();
            // alert('Payment successful!');

            paymentPage.innerHTML = `
                <div class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true" style="display: block; position: absolute; top: 10px; right: 35%; height: 3rem;">
                    <div class="d-flex">
                    <div class="toast-body">
                        Payment Successfull
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            `;

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
        else{
            alert('Please fill in all the required fields.');
        }
    });
}



async function handlePageChange() {
    const currentPageUrl = window.location.pathname;
  
    // console.log(currentPageUrl);

   if(currentPageUrl === '/index.html'){
        const categories = await getAllCategories();

        let products;

        categories?.forEach(async (category: string) => {
            products = await getAllProducts(category);

            products && displayProducts(products);
        });
   } 
   else if(currentPageUrl.startsWith('/product-details.html')){

        const productId = getParameterByName('id', window.location.href);
        // console.log(productId);

        const productDetails = await getProductDetails(productId);
        // console.log('Product Details:', productDetails);
        displayProductDetails(productDetails);
 
    } 
    else{
        // console.log('Cart Page');
        calculateAndStoreTotalPrice();
        getCartItems();

        // location.reload();
        const totalElement = document.querySelector('.total');
        if(totalElement !== null){
            totalElement.textContent = 'Total: $' + localStorage.getItem('totalPrice');
        }

        const bill = document.getElementById('bill');
        if(bill != null){
            bill.textContent = '$' + localStorage.getItem('totalPrice');
        }
    }
  }
  
  window.addEventListener('popstate', handlePageChange);
  handlePageChange();
  
  