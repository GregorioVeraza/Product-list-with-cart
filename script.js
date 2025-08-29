const product = [
    { id:0 ,name: 'Waffle', price: 6.5, img: "./assets/images/image-waffle-desktop.jpg" },
    { id:1 ,name: 'Creme Brulee', price: 7.0, img:"./assets/images/image-creme-brulee-desktop.jpg" },
    { id:2 ,name: 'Macaron', price: 8.0, img:"./assets/images/image-macaron-desktop.jpg" },
    { id:3 ,name: 'Tiramisu', price: 5.5, img:"./assets/images/image-tiramisu-desktop.jpg" },
    { id:4 ,name: 'Baklava', price: 4.0, img:"./assets/images/image-baklava-desktop.jpg" },
    { id:5 ,name: 'Pie', price: 5.0, img:"./assets/images/image-meringue-desktop.jpg" },
    { id:6 ,name: 'Cake', price: 4.5, img:"./assets/images/image-cake-desktop.jpg" },
    { id:7 ,name: 'Brownie', price: 5.5, img:"./assets/images/image-brownie-desktop.jpg" },
    { id:8 ,name: 'Panna Cotta', price: 6.5, img:"./assets/images/image-panna-cotta-desktop.jpg"}
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
    document.getElementsByClassName("prices")[i].children[2].textContent = "$"+cart[i].quantity*product[id].price;
    document.getElementsByClassName("counter")[id].textContent = cart[i].quantity;
    modifarTotal();
}

function decrementFromCart(id) {
    const i = cart.indexOf(cart.find(o => o.id === id));
    if (cart[i].quantity === 0) return;
    cart[i].quantity -= 1;
    document.getElementsByClassName("prices")[i].children[0].textContent = cart[i].quantity+"x";
    document.getElementsByClassName("prices")[i].children[2].textContent = "$"+cart[i].quantity*product[id].price;
    document.getElementsByClassName("counter")[id].textContent = cart[i].quantity;
    modifarTotal();
}



function deleteProduct(pos) {
    const id = cart[pos].id;
    cart.splice(pos, 1);
    modifarTotal();
    const contextCart = document.getElementById("cart-container");
    contextCart.removeChild(contextCart.children[pos]);

    products[id].getElementsByTagName("button")[0].style.display = "flex";
    products[id].getElementsByClassName("quantity-controls")[0].classList.add("oculto");
    document.getElementsByClassName("counter")[id].textContent=0;
}

function divPrices(id, pos){
    const div = document.createElement("div");
    div.appendChild(addFirstParagraph(pos));
    div.appendChild(addSecondParagraph(id));
    div.classList.add("prices");
    return div;
}

function divParagraph(id, pos){
    const containerParagraph = document.createElement("div");
    containerParagraph.classList.add("paragraph-details");

    
    containerParagraph.appendChild(addTittle(id));

    const containerPrices = divPrices(id, pos);
    

    
    
    
    containerParagraph.appendChild(containerPrices);
    return containerParagraph;
}

function detailsProduct(id, pos) {
    const container = document.createElement("div");
    container.classList.add("details");

    const containerParagraph = divParagraph(id, pos);

    const thirdParagraph = document.createElement("p");
    thirdParagraph.textContent = "$"+cart[pos].quantity*product[id].price;
    containerParagraph.lastChild.appendChild(thirdParagraph);

    container.appendChild(containerParagraph);

    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("delete");
    buttonDelete.onclick = function() { deleteProduct(pos); };
    const imgDelete = document.createElement("img");
    imgDelete.src = "./assets/images/icon-remove-item.svg";
    imgDelete.alt = "delete product icon";
    buttonDelete.appendChild(imgDelete);
    container.appendChild(buttonDelete);

    return container;
}

function addTittle(id){
    const nameProduct = document.createElement("h4");
    nameProduct.textContent = product[id].name;
    nameProduct.style.marginBottom = "0px";
    return nameProduct;
}

function addFirstParagraph(pos){
    const firstParagraph = document.createElement("p");
    firstParagraph.textContent = cart[pos].quantity +"x";
    return firstParagraph;
}

function addSecondParagraph(id){
    const secondParagraph = document.createElement("p");
    secondParagraph.textContent = "@ "+product[id].price;
    return secondParagraph;
}

function addTotal(pos, id){
    const p = document.createElement("b");
    p.textContent = "$"+cart[pos].quantity*product[id].price;
    
    return p;
}
const $ = function(element){
    document.getElementById(element);
}
function confirmOrder(){
    const section = document.getElementsByClassName("ocult-confirm");
    const article = document.getElementById("food-details");
    
    for (let i = 0; i < cart.length; i++) {
        let div =document.createElement("div");
        div.appendChild(addImages(i));
        div.appendChild(divParagraph(cart[i].id, i));
        div.appendChild(addTotal(i, cart[i].id));
        div.classList.add("food-detail"); 
        article.appendChild(div);
    }
    
    
    for (let i = 0; i < section.length; i++) {
        section[i].style.display = "block";
    }
}

function addImages(i){
    
    const img = document.createElement("img");
    img.src = product[cart[i].id].img;
    return img;
}
function refresh(){
    location.reload();
}