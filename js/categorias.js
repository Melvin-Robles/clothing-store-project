document.addEventListener("DOMContentLoaded", function () {
  let clothesListComplete = JSON.parse(sessionStorage.getItem("clothesList"));

  const clothesContainer = document.getElementById("card-clothes");
  const searchInput = document.getElementById("searchInput");
  const modalContainerProducts = document.getElementById("product-details");
  const headerCart = document.getElementById("header_cart");
  const shopCartElement = document.querySelector(".shop-cart");
  const modal = document.getElementById("myModal");
  const textTotal = document.querySelector(".text-total");

  let ruta = window.location.pathname;

  // Determinar el identificador según la ruta
  let identificador;
  if (ruta.includes("hombres.html")) {
    identificador = "MAN";
  } else if (ruta.includes("mujeres.html")) {
    identificador = "WOMAN";
  } else if (ruta.includes("ninas.html")) {
    identificador = "GIRL";
  } else if (ruta.includes("ninos.html")) {
    identificador = "KIDS";
  }

  let clothesList = clothesListComplete.filter(function (producto) {
    return producto.identificador === identificador;
  });

  renderClothes(clothesList);

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
        cartNumberProducts(shopCart.length);
        sessionStorage.setItem("productsInCart", JSON.stringify(shopCart));
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
      sessionStorage.setItem("productsInCart", JSON.stringify(shopCart));
      exportToJson(product);
      cartNumberProducts(shopCart.length);
      closeModal();
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
    addToCart(data);
  }

  /* Logica para el carrito */

  let shopCart = JSON.parse(sessionStorage.getItem("productsInCart")) || [];
  cartNumberProducts(shopCart.length);
  showModal(shopCart);

  function addToCart(product) {
    const existingProduct = shopCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.cantidad++;
    } else {
      product.cantidad = 1;
      shopCart.push(product);
    }

    showModal(shopCart);
  }

  function showModal(products) {
    modalContainerProducts.innerHTML = "";
    products.forEach((p) => {
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

      const btnRemove = modalProducts.querySelector(".btn-remove");
      btnRemove.addEventListener("click", () => removeProduct(p.id));

      const btnDecrease = modalProducts.querySelector(".btn-decrease");
      btnDecrease.addEventListener("click", () => decreaseQuantity(p.id));
    });

    const buyButton = document.querySelector(".btn-buy");
    buyButton.addEventListener("click", () => buyProducts(products));
  }

  function removeProduct(productId) {
    shopCart = shopCart.filter((item) => item.id !== productId);
    showModal(shopCart);
    empetyProducts();
    cartNumberProducts(shopCart.length);
  }

  function decreaseQuantity(productId) {
    const existingProduct = shopCart.find((item) => item.id === productId);
    if (existingProduct) {
      existingProduct.cantidad--;
      if (existingProduct.cantidad <= 0) {
        removeProduct(productId);
      } else {
        showModal(shopCart);
      }
    }
    empetyProducts();
    cartNumberProducts(shopCart.length);
    sessionStorage.setItem("productsInCart", JSON.stringify(shopCart));
  }

  function buyProducts(products) {
    sessionStorage.setItem("productsInCart", JSON.stringify(products));
    window.location.href = "purchaseDetail.html";
  }

  modal.querySelector(".close").addEventListener("click", function () {
    modal.style.display = "none";
  });

  shopCartElement.addEventListener("mouseover", function (event) {
    empetyProducts();
    modal.style.display = "block";
  });

  function empetyProducts() {
    if (shopCart.length == 0) {
      modalContainerProducts.innerHTML = "";

      const modalEmpty = document.createElement("div");
      modalEmpty.innerHTML = `
        <div class="empety-content">
            Hola Aun no hay nada por aca
        </div>
        `;

      modalContainerProducts.appendChild(modalEmpty);
    }
  }

  function cartNumberProducts(quantityProducts) {
    const quantityDiv = document.createElement("div");

    quantityDiv.classList.add("number__cart");
    quantityDiv.innerHTML = `
    
    ${quantityProducts}
    
    `;

    headerCart.appendChild(quantityDiv);
  }

  /* Manejo de botones */

  let btnHome = document.getElementById("btnHome");
  let btnMan = document.getElementById("btnMan");
  let btnWoman = document.getElementById("btnWoman");
  let btnGirl = document.getElementById("btnGirl");
  let btnBoy = document.getElementById("btnBoy");

  btnMan.addEventListener("click", function () {
    window.location.href = "hombres.html";
  });

  btnWoman.addEventListener("click", function () {
    window.location.href = "mujeres.html";
  });

  btnGirl.addEventListener("click", function () {
    window.location.href = "ninas.html";
  });

  btnBoy.addEventListener("click", function () {
    window.location.href = "ninos.html";
  });

  btnHome.addEventListener("click", function () {
    window.location.href = "index.html";
  });
});
