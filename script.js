const product = [
    { id:0 ,name: 'Waffle', price: 6.5 },
    { id:1 ,name: 'Creme Brulee', price: 7.0 },
    { id:2 ,name: 'Macaron', price: 8.0 },
    { id:3 ,name: 'Tiramisu', price: 5.5 },
    { id:4 ,name: 'Baklava', price: 4.0 },
    { id:5 ,name: 'Pie', price: 5.0 },
    { id:6 ,name: 'Cake', price: 4.5 },
    { id:7 ,name: 'Brownie', price: 5.5 },
    { id:8 ,name: 'Panna Cotta', price: 6.5 }
]

let cart = [];

let cakeVisible = true;

const products = document.getElementsByClassName("product");

function addToCart(id) {
    const element = products[id];
    console.log(element);
    const addButton = element.getElementsByTagName("button")[0];
    const quantityControls = element.getElementsByClassName("quantity-controls")[0];
    console.log(addButton);
    console.log(quantityControls);
    quantityControls.classList.remove("oculto");
    addButton.style.display = "none";
    let obj = {
        id: id,
        quantity: 0
    };
    cart.push(obj);
    const i = cart.indexOf(cart.find(o => o.id === id));
    const contextCart = document.getElementById("cart-container");
    console.log(contextCart.childNodes);
    
    
    if (cakeVisible){
        while (contextCart.firstChild) {
            contextCart.removeChild(contextCart.firstChild);
        }
        cakeVisible = false;
        const visible = document.getElementById("order-container");
        visible.style.display = "block";
    }
    const containerDetails = document.createElement("div");
    containerDetails.appendChild(detailsProduct(id, i));
    containerDetails.appendChild(document.createElement("hr"));
    contextCart.appendChild(containerDetails);
}

function modifarTotal() {
    document.getElementById("total").textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById("total-price").textContent = "$"+cart.reduce((acc, item) => acc + item.quantity*product[item.id].price, 0);
}

function incrementFromCart(id) {
    const i = cart.indexOf(cart.find(o => o.id === id));
    cart[i].quantity += 1;
    document.getElementsByClassName("prices")[i].children[0].textContent = cart[i].quantity+"x";
    document.getElementsByClassName("counter")[id].textContent = cart[i].quantity;
    modifarTotal();
}

function decrementFromCart(id) {
    const i = cart.indexOf(cart.find(o => o.id === id));
    if (cart[i].quantity === 0) return;
    cart[i].quantity -= 1;
    document.getElementsByClassName("prices")[i].children[0].textContent = cart[i].quantity+"x";
    document.getElementsByClassName("counter")[id].textContent = cart[i].quantity;
    modifarTotal();
}

function confirmOrder() {
    
}

function newOrder() {
    
}

function deleteProduct(pos) {
    const id = cart[pos].id;
    cart.splice(pos, 1);
    modifarTotal();
    const contextCart = document.getElementById("cart-container");
    contextCart.removeChild(contextCart.children[pos]);

    products[id].getElementsByTagName("button")[0].style.display = "flex";
    products[id].getElementsByClassName("quantity-controls")[0].classList.add("oculto");
}

function detailsProduct(id, pos) {
    const container = document.createElement("div");
    container.classList.add("details");
    const containerParagraph = document.createElement("div");

    const containerName = document.createElement("div");
    const nameProduct = document.createElement("h4");
    nameProduct.textContent = product[id].name;
    containerName.appendChild(nameProduct);
    containerParagraph.appendChild(containerName);

    const containerPrices = document.createElement("div");

    const firstParagraph = document.createElement("p");
    firstParagraph.textContent = cart[pos].quantity +"x";

    const secondParagraph = document.createElement("p");
    secondParagraph.textContent = "@ "+product[id].price;

    const thirdParagraph = document.createElement("p");
    thirdParagraph.textContent = "$"+cart[pos].quantity*product[id].price;

    containerPrices.appendChild(firstParagraph);
    containerPrices.appendChild(secondParagraph);
    containerPrices.appendChild(thirdParagraph);
    containerPrices.classList.add("prices");
    containerParagraph.appendChild(containerPrices);
    container.appendChild(containerParagraph);

    const buttonDelete = document.createElement("button");
    buttonDelete.onclick = function() { deleteProduct(pos); };
    const imgDelete = document.createElement("img");
    imgDelete.src = "./assets/images/icon-remove-item.svg";
    imgDelete.alt = "delete product icon";
    buttonDelete.appendChild(imgDelete);
    container.appendChild(buttonDelete);

    return container;
}