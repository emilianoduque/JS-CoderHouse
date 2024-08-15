// BOTONES
const carroBoard = document.createElement("div");
carroBoard.className = "carrito-board";
document.body.append(carroBoard);

const verCarro = document.createElement("button");
verCarro.innerText = "Ver Carrito";
verCarro.addEventListener("click", () => {
  verCarrito();
});

const carroBotonera = document.createElement("div");
carroBotonera.className = "carro-botonera";

const botonBorrar = document.createElement("button");
botonBorrar.innerText = "Borrar Carrito";
botonBorrar.addEventListener("click", () => {
  borrarCarrito();
});

const ocultarCarro = document.createElement("button");
ocultarCarro.innerText = "Ocultar";
ocultarCarro.addEventListener("click", () => {
  ocultarCarrito();
});

const botonComprar = document.createElement("button");
botonComprar.className = "boton-comprar";
botonComprar.innerText = "Pedir";
botonComprar.addEventListener("click", () => {
  realizarCompra();
});