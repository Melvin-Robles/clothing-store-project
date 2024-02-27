document.addEventListener('DOMContentLoaded', function() {

const clothesContainer = document.getElementById("card-clothes");
const searchInput = document.getElementById("searchInput");
const modalContainerProducts = document.getElementById("product-details");
const headerCart = document.getElementById("header_cart");
const shopCartElement = document.querySelector('.shop-cart');
const modal = document.getElementById('myModal');
const textTotal = document.querySelector('.text-total');
let totalPrice = 0;

  
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
    },
    {
      "id": 5,
      "nombreProducto": "Camisa manga larga de color",
      "descripcion": "Camisa de algodon Manga Larga De Color Solido",
      "categoria": "Camisas Formales",
      "precio": 67.65,
      "tallasDisponibles": ["S", "M", "L", "XL"],
      "coloresDisponibles": ["Blanco", "Negro", "Gris", "Azul"],
      "material": "Algodón",
      "imagen": "assets/clothes-boy/img_boy1.png",
      "cantidadEnStock": 3,
      "identificador": "KIDS"
    },
    {
      "id": 6,
      "nombreProducto": "Camisa manga larga casual cuadriculada",
      "descripcion": "Camisa de vestir casual manga larga cuadriculada ",
      "categoria": "Camisas Formales",
      "precio": 67.65,
      "tallasDisponibles": ["S"],
      "coloresDisponibles": ["Rojo"],
      "material": "Algodón",
      "imagen": "assets/clothes-boy/img_boy2.png",
      "cantidadEnStock": 5,
      "identificador": "KIDS"
    },
    {
      "id": 7,
      "nombreProducto": "Pijama de superheroe de los Vengadores",
      "descripcion": "Pijama completa de tus superheroes favoritos",
      "categoria": "Pijama",
      "precio": 30.25,
      "tallasDisponibles": ["S"],
      "coloresDisponibles": ["Capitan America, IronMan, Hulk, Batman"],
      "material": "Algodón",
      "imagen": "assets/clothes-boy/img_boy3.png",
      "cantidadEnStock": 3,
      "identificador": "KIDS"
    },
    {
      "id": 8,
      "nombreProducto": "Zapatillas de Paw Patrol para niños",
      "descripcion": "Zapatillas super comodas con diseño de PawPatrol",
      "categoria": "Zapatos",
      "precio": 25.99,
      "tallasDisponibles": ["S"],
      "coloresDisponibles": ["Blanco"],
      "material": "Cuerina",
      "imagen": "assets/clothes-boy/img_boy4.png",
      "cantidadEnStock": 10,
      "identificador": "KIDS"
    },
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
  
      const moreBtn = cardClothesElement.querySelector(".more-btn");
      moreBtn.addEventListener("click", () => {
        openModalWithDetails(response);
      });

    const exportBtn = cardClothesElement.querySelector(".export-btn");
    exportBtn.addEventListener("click", () => {
      exportToJson(response);
      cartNumberProducts(shopCart.length)
      sessionStorage.setItem('productsInCart', JSON.stringify(shopCart))
      goUp()
      });
  
      clothesContainer.appendChild(cardClothesElement);
    });
  }
  
  function openModalWithDetails(product) {
    const modal = document.getElementById("ModalDetails");
    modal.innerHTML = `
      <div>
        <span class="close">&times;</span>
        <h2>${product.nombreProducto}</h2>
        <p>${product.descripcion}</p>
        <p>Precio: $${product.precio}</p>
        <p>Stock: ${product.cantidadEnStock}</p>
        <div>
        <button class="export-btn btnAdd">Agregar</button>
      </div>
      </div>
    `;

    const btnAdd = modal.querySelector(".btnAdd");
    btnAdd.addEventListener("click", () => {
      sessionStorage.setItem('productsInCart', JSON.stringify(shopCart))
      exportToJson(product);
      cartNumberProducts(shopCart.length)
      closeModal()
      goUp()
      });
  
    const closeModalBtn = modal.querySelector(".close");
    closeModalBtn.addEventListener("click", closeModal);
  
    modal.style.display = "block";
  }
  
  function closeModal() {
    const modal = document.getElementById("ModalDetails");
    modal.style.display = "none";
  }
  
  // Cierra el modal haciendo clic fuera del contenido
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("ModalDetails");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

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
cartNumberProducts(0)


/* Logica para el carrito */
let shopCart = [];
const dataSession = JSON.parse(sessionStorage.getItem('productsInCart'));
if(dataSession != null){
  shopCart = dataSession
  showModal(shopCart);
  cartNumberProducts(shopCart.length)
} 


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
        <p>Total: ${p.cantidad * p.precio}</p>
        <button class="btn-remove">Eliminar</button>
        <button class="btn-decrease">-1</button>
        </div>
        `;

        modalContainerProducts.appendChild(modalProducts);
        totalPrice += p.cantidad * p.precio;

        const btnRemove = modalProducts.querySelector('.btn-remove');
        btnRemove.addEventListener('click', () => removeProduct(p.id));

        const btnDecrease = modalProducts.querySelector('.btn-decrease');
        btnDecrease.addEventListener('click', () => decreaseQuantity(p.id));
        
        
        textTotal.innerHTML = `
          <strong>Total: $ ${shopCart.length > 0 ? totalPrice.toFixed(2) : 0} </strong>
        `;
    });

    const buyButton = document.querySelector('.btn-buy');
    buyButton.addEventListener('click', () => buyProducts(products));

  
}

//inicializar
textTotal.innerHTML = `
<strong>Total: $ ${shopCart.length > 0 ? totalPrice.toFixed(2) : 0} </strong>
`;

function removeProduct(productId) {
    shopCart = shopCart.filter(item => item.id !== productId);
    sessionStorage.setItem('productsInCart', JSON.stringify(shopCart))
    showModal(shopCart);
    empetyProducts()
    cartNumberProducts(shopCart.length)
    
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
    cartNumberProducts(shopCart.length)
    sessionStorage.setItem('productsInCart', JSON.stringify(shopCart))
}


function buyProducts(products) {
    sessionStorage.setItem('productsInCart', JSON.stringify(products))
    window.location.href = 'purchaseDetail.html';
}



modal.querySelector('.close').addEventListener('click', function() {
    modal.style.display = "none";
});

shopCartElement.addEventListener('mouseover', function(event) {
    
    empetyProducts()
    modal.style.display = "block";
});


function empetyProducts() {
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

    textTotal.innerHTML = `
<strong>Total: $ ${shopCart.length > 0 ? totalPrice.toFixed(2) : 0} </strong>
`;
    
}

function cartNumberProducts(quantityProducts) {

  const quantityDiv = document.createElement("div");
    
    quantityDiv.classList.add('number__cart')
    quantityDiv.innerHTML = `
    
    ${quantityProducts}
    
    `;
    
    headerCart.appendChild(quantityDiv);    
  
    }

/* Manejo de botones */

let btnMan = document.getElementById('btnMan');
  

btnMan.addEventListener('click', function() {
  window.location.href = 'hombres.html';
});

function goUp(){
  window.scrollTo({
    top: 0,
    behavior: 'smooth' 
});
}

});
