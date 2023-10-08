var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* Home page functionality */
function displayProducts(products) {
    var productContainer = document.getElementById('product-list');
    productContainer === null || productContainer === void 0 ? void 0 : productContainer.classList.add('d-flex', 'flex-wrap');
    products.forEach(function (product) {
        var card = document.createElement('div');
        // card.href = `product-details.html?id=${product.id}`;
        card.classList.add('card', 'mb-3', 'mx-auto', 'shadow');
        card.style.width = '280px';
        card.style.height = '350px';
        card.style.padding = '20px';
        card.style.color = 'black';
        card.style.textDecoration = 'none';
        var truncatedTitle = product === null || product === void 0 ? void 0 : product.title.substring(0, 40);
        +"...";
        card.innerHTML = "\n        <a href=product-details.html?id=".concat(product.id, " class=\"card\" style=\"color: black; text-decoration: none;\">\n            <img src=\"").concat(product.image, "\" class=\"card-img-top\" alt=\"").concat(truncatedTitle, "\" style=\"height: 150px; width: 180px; margin: auto\">\n            <div class=\"card-body\">\n                <h6 class=\"card-title mb-3 mt-3\">").concat(truncatedTitle, "</h6>\n                <h6 class=\"card-text\">Price: $").concat(product.price, "</h6>\n            </div>\n        </a>\n        <button type=\"button\" class=\"btn btn-warning\" onclick=\"addToCart('").concat(product.id, "')\">Add to cart</button>\n        ");
        productContainer === null || productContainer === void 0 ? void 0 : productContainer.appendChild(card);
    });
}
//get products of specific category
function getAllProducts(categoryName) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://fakestoreapi.com/products/category/".concat(categoryName))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Request failed with status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    error_1 = _a.sent();
                    throw new Error("Error fetching products");
                case 4: return [2 /*return*/];
            }
        });
    });
}
/* ---------------Categories-----------------*/
function getAllCategories() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('https://fakestoreapi.com/products/categories')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    error_2 = _a.sent();
                    throw new Error("Error fetching products");
                case 4: return [2 /*return*/];
            }
        });
    });
}
/* ------------Product Details--------------*/
function getProductDetails(productId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://fakestoreapi.com/products/".concat(productId))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
function displayProductDetails(productDetails) {
    var details = document.querySelector('.details');
    if (details !== null) {
        details.innerHTML = "\n        <div class=\"card mb-3\" style=\"max-width: 80%; margin: auto;\">\n            <div class=\"row g-0\">\n            <div class=\"col-md-4\">\n                <img src=".concat(productDetails === null || productDetails === void 0 ? void 0 : productDetails.image, " class=\"img-fluid rounded-start\" alt=\"...\">\n            </div>\n            <div class=\"col-md-8\">\n                <div class=\"card-body\">\n                <h5 class=\"card-title\">").concat(productDetails === null || productDetails === void 0 ? void 0 : productDetails.title, "</h5>\n                <br>\n                <p class=\"card-text\" style=\"font-weight: 400; font-size: 15px\">").concat(productDetails.description, "</p>\n                <p class=\"card-text\"><small class=\"text-muted\">Ratings: ").concat(productDetails.rating.rate, "\u2B50</small></p>\n                <p class=\"card-text\">$").concat(productDetails.price, "</p>\n                <button type=\"button\" class=\"btn btn-warning\" onclick=\"addToCart('").concat(productDetails.id, "')\">Add to cart</button>\n                </div>\n            </div>\n            </div>\n        </div>\n        ");
    }
}
/* -------------------Cart Functionality----------------- */
function getCartItems() {
    return __awaiter(this, void 0, void 0, function () {
        var cart, _i, cart_1, productId, productDetails, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cart = JSON.parse(localStorage.getItem('cart') || '[]');
                    if (cart.length === 0) {
                        console.log('Cart is empty.');
                        return [2 /*return*/];
                    }
                    _i = 0, cart_1 = cart;
                    _a.label = 1;
                case 1:
                    if (!(_i < cart_1.length)) return [3 /*break*/, 6];
                    productId = cart_1[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, getProductDetails(productId)];
                case 3:
                    productDetails = _a.sent();
                    displayCartProduct(productDetails);
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.error("Error fetching product with ID ".concat(productId, ":"), error_3);
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function displayCartProduct(productDetails) {
    var cart = document.querySelector('.cart');
    var item = document.createElement('div');
    if (cart !== null) {
        item.innerHTML = "\n        <div class=\"card mb-3\" style=\"max-width: 80%; margin: auto; max-height: '200px';\">\n            <div class=\"row g-0\">\n            <div class=\"col-md-4\">\n                <img src=".concat(productDetails === null || productDetails === void 0 ? void 0 : productDetails.image, " class=\"img-fluid rounded-start\" alt=\"...\" style=\"width: 150px; height: 180px\">\n            </div>\n            <div class=\"col-md-8\">\n                <div class=\"card-body\">\n                <h5 class=\"card-title\">").concat(productDetails === null || productDetails === void 0 ? void 0 : productDetails.title, "</h5>\n                <p class=\"card-text\"><small class=\"text-muted\">Ratings: ").concat(productDetails.rating.rate, "</small></p>\n                <p class=\"card-text\">$").concat(productDetails.price, "</p>\n                <button type=\"button\" class=\"btn btn-warning\" onclick=\"removeFromCart('").concat(productDetails.id, "')\">Remove</button>\n                </div>\n            </div>\n            </div>\n        </div>\n        ");
        cart.appendChild(item);
        // location.reload();
    }
}
function addToCart(id) {
    var existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    existingCart.push(id);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    console.log('Updated Cart:', existingCart);
    calculateAndStoreTotalPrice();
    alert('Item added to cart');
}
function removeFromCart(id) {
    var existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    var updatedCart = existingCart.filter(function (productId) { return productId !== id; });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    location.reload();
    calculateAndStoreTotalPrice();
}
// Function to calculate the sum of prices in the cart and store it in local storage
function calculateAndStoreTotalPrice() {
    return __awaiter(this, void 0, void 0, function () {
        var cart, totalPrice, _i, cart_2, productId, productDetails, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cart = JSON.parse(localStorage.getItem('cart') || '[]');
                    totalPrice = 0;
                    _i = 0, cart_2 = cart;
                    _a.label = 1;
                case 1:
                    if (!(_i < cart_2.length)) return [3 /*break*/, 6];
                    productId = cart_2[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, getProductDetails(productId)];
                case 3:
                    productDetails = _a.sent();
                    totalPrice += productDetails.price;
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error("Error fetching product with ID ".concat(productId, ":"), error_4);
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
                    return [2 /*return*/];
            }
        });
    });
}
// Utility function to get 'id' from the params
function getParameterByName(name, url) {
    console.log('fetching product details');
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
//Checkout functionality
var payButton = document.getElementById('pay-button');
if (payButton) {
    payButton.addEventListener('click', function (e) {
        e.preventDefault();
        alert('Payment Successfull!');
        window.location.href = 'index.html';
    });
}
function handlePageChange() {
    return __awaiter(this, void 0, void 0, function () {
        var currentPageUrl, categories, products_1, productId, productDetails, totalElement, bill;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentPageUrl = window.location.pathname;
                    console.log(currentPageUrl);
                    if (!(currentPageUrl === '/index.html')) return [3 /*break*/, 2];
                    return [4 /*yield*/, getAllCategories()];
                case 1:
                    categories = _a.sent();
                    categories === null || categories === void 0 ? void 0 : categories.forEach(function (category) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, getAllProducts(category)];
                                case 1:
                                    products_1 = _a.sent();
                                    products_1 && displayProducts(products_1);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 5];
                case 2:
                    if (!currentPageUrl.startsWith('/product-details.html')) return [3 /*break*/, 4];
                    productId = getParameterByName('id', window.location.href);
                    console.log(productId);
                    return [4 /*yield*/, getProductDetails(productId)];
                case 3:
                    productDetails = _a.sent();
                    console.log('Product Details:', productDetails);
                    displayProductDetails(productDetails);
                    return [3 /*break*/, 5];
                case 4:
                    console.log('Cart Page');
                    calculateAndStoreTotalPrice();
                    getCartItems();
                    totalElement = document.querySelector('.total');
                    if (totalElement !== null) {
                        totalElement.textContent = 'Total: $' + localStorage.getItem('totalPrice');
                    }
                    bill = document.getElementById('bill');
                    if (bill != null) {
                        bill.textContent = '$' + localStorage.getItem('totalPrice');
                    }
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
window.addEventListener('popstate', handlePageChange);
handlePageChange();
