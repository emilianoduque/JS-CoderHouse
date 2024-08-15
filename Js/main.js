//Variable para determinar cuando está abierto el carrito
let hayMostrado = false;

// CREANDO DOM:
const contenedor = document.createElement("div");
contenedor.className = "contenedor";
document.body.append(contenedor);

const botonera = document.createElement("div");
botonera.className = "botonera";
document.body.append(botonera);

let carrito = JSON.parse(localStorage.getItem("carritoProductos")) || [];

// Opciones de Menus:
menu.forEach((el) => {
  const boton = document.createElement("button");
  boton.innerText = el.categoriaMenu;
  boton.className = "botones-Menu";

  boton.addEventListener("click", () => seleccion(el.opcion));
  botonera.append(boton);
});

// Para cada reinicio de la pagina
if (carrito.length > 0) {
  document.body.append(carroBotonera);
  carroBotonera.append(verCarro);
};





