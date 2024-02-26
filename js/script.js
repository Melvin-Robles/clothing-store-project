document.addEventListener('DOMContentLoaded', function() {

const clothesContainer = document.getElementById("card-clothes");
const searchInput = document.getElementById("searchInput");
const modalContainerProducts = document.getElementById("product-details");
const shopCartElement = document.querySelector('.shop-cart');
const modal = document.getElementById('myModal');

  
  const clothesList = [
    {
      "id": 1,
      "nombreProducto": "Camiseta Deportiva",
      "descripcion": "Camiseta de algodón de manga corta Nike",
      "categoria": "Camisetas",
      "precio": 15.99,
      "tallasDisponibles": ["S", "M", "L", "XL"],
      "coloresDisponibles": ["Blanco", "Negro", "Gris", "Azul"],
      "material": "Algodón",
      "imagen": "assets/clothes-man/img_man1.png",
      "cantidadEnStock": 28,
      "identificador": "MAN"
    },
    {
      "id": 2,
      "nombreProducto": "Pantalones",
      "descripcion": "Pantalones holgados de estilo deportivo",
      "categoria": "Pantalones",
      "precio": 29.99,
      "tallasDisponibles": ["28", "30", "32", "34"],
      "coloresDisponibles": ["Azul oscuro", "Azul claro", "Negro"],
      "material": "Denim",
      "imagen": "assets/clothes-man/img_man2.png",
      "cantidadEnStock": 40,
      "identificador": "MAN"
    },
    {
      "id": 3,
      "nombreProducto": "Camisa Wear",
      "descripcion": "Easy Wear celeste manga corta para dama",
      "categoria": "Blusas",
      "precio": 39.99,
      "tallasDisponibles": ["S", "M", "L", "XL"],
      "coloresDisponibles": ["Blanco", "Negro", "Gris", "Azul"],
      "material": "Lana",
      "imagen": "assets/clothes-women/img_women1.png",
      "cantidadEnStock": 23,
      "identificador": "WOMAN"
    },
    {
      "id": 4,
      "nombreProducto": "Vestido Mini",
      "descripcion": "mini vestido sin espalda damas costumbre sin tirantes",
      "categoria": "Vestidos",
      "precio": 39.99,
      "tallasDisponibles": ["S", "M", "L", "XL"],
      "coloresDisponibles": ["Blanco", "Negro", "Gris", "Azul"],
      "material": "Lana",
      "imagen": "assets/clothes-women/img_women2.png",
      "cantidadEnStock": 21,
      "identificador": "WOMAN"
    }
  ]


sessionStorage.setItem('clothesList', JSON.stringify(clothesList))



function renderClothes(clothes) {
  clothesContainer.innerHTML = "";
  clothes.forEach((response) => {
    const cardClothesElement = document.createElement("div");
    cardClothesElement.innerHTML = `
            <div class="card">
                <div class="img-clothes">
                    <img src="${response.imagen}" alt="img-clothes">
                </div>
                <h2>${response.nombreProducto}</h2>
                <p class="truncate-text">${response.descripcion}</p>
                <div class="card-clothes-buttons">
                    <div>
                        <button class="export-btn">Agregar</button>
                    </div>
                    <div class="more">
                        <button class="more-btn">
                            <span class="circle" aria-hidden="true">
                                <span class="icon arrow"></span>
                            </span>
                            <span class="button-text">Ver más</span>
                        </button>
                    </div>
                    
                <div class="data-product">
                <div class="price"> $ ${response.precio}</div>
                <div class="stock-product">Stock: ${response.cantidadEnStock}</div>
                </div>
                </div>
            </div>
        `;

    const exportBtn = cardClothesElement.querySelector(".export-btn");
    exportBtn.addEventListener("click", () => {
      exportToJson(response);
    });

    clothesContainer.appendChild(cardClothesElement);
  
  });
}

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredClothes = clothesList.filter((response) => {
    const nombreProducto = response.nombreProducto.toLowerCase();
    const categoria = response.categoria.toLowerCase();
    return (
      nombreProducto.includes(searchTerm) || categoria.includes(searchTerm)
    );
  });
  renderClothes(filteredClothes);
});


function exportToJson(data) {
  const jsonData = JSON.stringify(data);
  addToCart(data)
}

//Para inicializar la pagina
renderClothes(clothesList);


/* Logica para el carrito */
let shopCart = [];

function addToCart(product) {
    const existingProduct = shopCart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.cantidad++;
    } else {
        product.cantidad = 1;
        shopCart.push(product);
    }

    showModal(shopCart);
}

function showModal(products) {
    modalContainerProducts.innerHTML = '';

    products.forEach(p => {
        const modalProducts = document.createElement("div");
        modalProducts.innerHTML = `
        <div id="product-details">
        <img src="${p.imagen}" alt="Product Image" class="product-image">
        <h2 class="product-name">${p.nombreProducto}</h2>
        <p class="product-price">Precio: ${p.precio}</p>
        <p>Cantidad: ${p.cantidad}</p>
        <button class="btn-remove">Eliminar</button>
        <button class="btn-decrease">-1</button>
        </div>
        `;

        modalContainerProducts.appendChild(modalProducts);

        const btnRemove = modalProducts.querySelector('.btn-remove');
        btnRemove.addEventListener('click', () => removeProduct(p.id));

        const btnDecrease = modalProducts.querySelector('.btn-decrease');
        btnDecrease.addEventListener('click', () => decreaseQuantity(p.id));
    });

    const buyButton = document.querySelector('.btn-buy');
    buyButton.addEventListener('click', () => buyProducts(products));

}

function removeProduct(productId) {
    shopCart = shopCart.filter(item => item.id !== productId);
    showModal(shopCart);
    empetyProducts()
}

function decreaseQuantity(productId) {
    const existingProduct = shopCart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.cantidad--;
        if (existingProduct.cantidad <= 0) {
            removeProduct(productId);
        } else {
            showModal(shopCart);
        }
    }
    empetyProducts()
}

// Función para imprimir el array con los productos a comprar
function buyProducts(products) {
    console.log('Productos a comprar:');
    console.log(products);
    products.forEach(p => {
        console.log(`${p.nombreProducto} - Cantidad: ${p.cantidad}`);
    });
}



modal.querySelector('.close').addEventListener('click', function() {
    modal.style.display = "none";
});

shopCartElement.addEventListener('mouseover', function(event) {
    
    empetyProducts()
    modal.style.display = "block";
});


function empetyProducts() {
    console.log(shopCart);
    if(shopCart.length == 0){
        modalContainerProducts.innerHTML = '';

        const modalEmpty = document.createElement("div");
        modalEmpty.innerHTML = `
        <div class="empety-content">
            Hola Aun no hay nada por aca
        </div>
        `;

        modalContainerProducts.appendChild(modalEmpty);
    }
    

}

/* Manejo de botones */

let btnMan = document.getElementById('btnMan');
  

btnMan.addEventListener('click', function() {
  window.location.href = 'hombres.html';
});


});
