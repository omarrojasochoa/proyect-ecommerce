const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById("carrito-tab");
const procesarCompraBtn = document.getElementById("procesar-compra");
const cliente = document.getElementById("cliente");
const correo = document.getElementById("correo");
const telefono = document.querySelector("#telefono");
const direccion = document.querySelector("#direccion");

cargarEventos();

function cargarEventos() {
  //Al cargar que aparezcan los productos
  document.addEventListener(
    "DOMContentLoaded",
    compra.leerLocalStorageCompra()
  );
  //Eliminar productos del carrito
  carrito.addEventListener("click", (e) => {
    compra.eliminarProducto(e);
  });

  compra.calcularTotal();

  //cuando se selecciona procesar Compra
  procesarCompraBtn.addEventListener("click" /*submit*/, (e) => {
    procesarCompra(e);
  });

  carrito.addEventListener("change", (e) => {
    compra.obtenerEvento(e);
  });
  carrito.addEventListener("keyup", (e) => {
    compra.obtenerEvento(e);
  });
}

function procesarCompra(e) {
  //e.preventDefault();
  if (compra.obtenerProductosLocalStorage().length === 0) {
    Swal.fire({
      type: "error",
      title: "Ups...",
      text: "No hay productos, selecciona alguno",
      showConfirmButton: false,
      timer: 2000,
    }).then(function () {
      window.location = "ecommerce.html";
    });
  } else if (
    cliente.value === "" ||
    correo.value === "" ||
    telefono.value === "" ||
    direccion.value === ""
  ) {
    Swal.fire({
      type: "error",
      title: "Ups...",
      text: "Ingrese todos los campos requeridos",
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    //e.preventDefault(); //No se envia el form, carga lo demas
    //alert("hola");
    const cargandoGif = document.querySelector("#cargando");
    cargandoGif.style.width = "150px";
    cargandoGif.style.display = "block";

    const enviado = document.createElement("img");
    enviado.src = "images/mail1.gif";
    enviado.style.display = "block";
    enviado.style.width = "150px";

    setTimeout(() => {
      cargandoGif.style.display = "none";
      document.querySelector("#loaders").appendChild(enviado);
      setTimeout(() => {
        compra.vaciarLocalStorage();
        enviado.remove();
        window.location = "ecommerce.html";
      }, 3000);
    }, 3000);
  }
}
/*hay un prevent default al enviar el formulario, no se envio alerta */
