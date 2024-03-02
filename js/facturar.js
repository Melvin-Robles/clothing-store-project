document.addEventListener("DOMContentLoaded", function () {

    const product = JSON.parse(sessionStorage.getItem('productsInCart'));

    const invoiceBody = document.getElementById('invoiceBody');
    let totalAmount = 0;
    const ivaRate = 0.13; // Tasa de IVA del 13% en el pais

    product.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        const iva = subtotal * ivaRate;
        const totalConIva = subtotal + iva;
        totalAmount += totalConIva;
    
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.nombreProducto}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>${subtotal.toFixed(2)}</td>
            <td>${iva.toFixed(2)}</td>
            <td>${totalConIva.toFixed(2)}</td>
        `;
        invoiceBody.appendChild(row);
    });

    document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);

    document.getElementById('exportButton').addEventListener('click', function() {
    var invoiceHtml = document.getElementById('invoiceDiv').innerHTML;

    var newWindow = window.open('', '');
    newWindow.document.head.innerHTML = `
    <script src="js/facturar.js"></script>
    <link rel="stylesheet" href="css/general.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@422&display=swap" rel="stylesheet">

    `;
    newWindow.document.body.innerHTML = invoiceHtml;
    setTimeout(() => {
        newWindow.print();
    }, 200);
    setTimeout(() => {
    
        newWindow.close();
    }, 300);

});

    document.getElementById("returnButton").addEventListener("click", function() {
  window.history.back();
});

document.getElementById('buyButton').addEventListener('click', function() {
    window.location.href = "exitoso.html";
  });

});
