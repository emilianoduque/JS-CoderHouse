// FUNCION para crear elementos por cada objeto del catalogo
function crearEnCatalogo(producto) {
  const carta = document.createElement("div");
  carta.className = "carta";

  const titulo = document.createElement("h3");
  titulo.innerText = producto.nombre;

  /* De momento no voy a usar imagen
  const imagen = document.createElement("IMG");
  imagen.src = producto.img;
  imagen.className = "img";
  */

  const precio = document.createElement("p");
  precio.innerText = "$ " + producto.precio;

  const boton = document.createElement("button");
  boton.className = "boton-carta";
  boton.innerText = "Agregar en carrito";
  boton.addEventListener("click", () => agregarAlCarrito(producto));

  carta.append(titulo);
  //carta.append(imagen);
  carta.append(precio);
  carta.append(boton);

  contenedor.append(carta);
}

// Creando las cards
let haySeleccionado = false;
function seleccion(opcionElegida) {
  if (haySeleccionado) {
    contenedor.innerHTML = ""; //Borraria en caso de tener contenido
  }
  opcionElegida--;
  menu[opcionElegida].contenido.forEach((producto) => {
    crearEnCatalogo(producto);
  });
  haySeleccionado = true;
}

function calcularTotal(array) {
  const totalCalculado = array.reduce((acc, producto) => {
    return acc + producto.precio * producto.cantidad;
  }, 0);
  return totalCalculado;
}

// Funcion que borra TODO el carrito y actualiza el carroBoard
function borrarCarrito() {
  carrito = [];
  carroBoard.innerHTML = " ";
  carroBotonera.innerHTML = " ";
  localStorage.removeItem("carritoProductos");
  botonComprar.remove();
  hayMostrado = false;
}

function ocultarCarrito() {
  carroBoard.innerHTML = " ";
  ocultarCarro.remove();
  hayMostrado = false;
  botonBorrar.remove();
  botonComprar.remove();
}

// Funcion para agregar al carrito
function agregarAlCarrito(producto) {
  if (carrito.some((el) => el.id === producto.id)) {
    const indexDelProducto = carrito.findIndex((el) => el.id === producto.id);
    carrito[indexDelProducto].cantidad++;
  } else {
    const nuevoProducto = {
      ...producto,
      cantidad: 1,
    };
    carrito.push(nuevoProducto);
  }

  botonComprar.remove();

  if (!hayMostrado) {
    document.body.append(carroBotonera);
    carroBotonera.append(verCarro);
  } else if (hayMostrado) {
    carroBoard.innerHTML = " ";
    ocultarCarro.remove();
    botonBorrar.remove();
    hayMostrado = false; //
  }

  const carritoString = JSON.stringify(carrito);
  localStorage.setItem("carritoProductos", carritoString);
}

function verCarrito() {
  if (hayMostrado) {
    carroBoard.innerHTML = " ";
  }
  carrito.forEach((eleccion) => {
    const cartaCarrito = document.createElement("div");
    cartaCarrito.className = "cartaCarrito";
    const titulo = document.createElement("h4");
    titulo.innerText = eleccion.nombre;
    const precio = document.createElement("p");
    precio.innerText = "Precio c/u: $" + eleccion.precio;
    const cantidad = document.createElement("p");
    cantidad.innerText = "Cantidad: " + eleccion.cantidad;

    const botonQuitar = document.createElement("button");
    botonQuitar.innerText = "Quitar";
    botonQuitar.addEventListener("click", () => {
      quitar(eleccion);
    });

    cartaCarrito.append(titulo);
    cartaCarrito.append(precio);
    cartaCarrito.append(cantidad);
    cartaCarrito.append(botonQuitar);

    carroBoard.append(cartaCarrito);
  });

  carroBotonera.append(botonBorrar);
  carroBotonera.append(ocultarCarro);
  document.body.append(botonComprar);
  hayMostrado = true;
};

function quitar(objeto) {
  if (objeto.cantidad > 1) {
    objeto.cantidad--;
    carroBoard.innerHTML = " ";
    //Borro el carrito guardado en local para actualizarlo
    localStorage.removeItem("carritoProductos");
    const carritoString = JSON.stringify(carrito);
    localStorage.setItem("carritoProductos", carritoString);

    verCarrito();
  } else if (objeto.cantidad === 1) {
    const index = carrito.findIndex((producto) => producto.id === objeto.id);
    carrito.splice(index, 1);

    //Borro y actualizo x2
    localStorage.removeItem("carritoProductos");
    const carritoString = JSON.stringify(carrito);
    localStorage.setItem("carritoProductos", carritoString);
    carroBoard.innerHTML = " ";
    if (carrito.length === 0) {
      carroBotonera.innerHTML = "";
      botonComprar.remove();
      hayMostrado = false;
    } else {
      verCarrito();
    }
  }
};

function realizarCompra() {
  Swal.fire({
    title: "Deseas concluir tu compra de $" + calcularTotal(carrito),
    showDenyButton: true,
    confirmButtonText: "Confirmar",
    denyButtonText: `No`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Saved!", "", "success");
      //Borra el carrito luego de la compra
      carrito = [];
      carroBoard.innerHTML = " ";
      carroBotonera.innerHTML = " ";
      localStorage.removeItem("carritoProductos");
      botonComprar.remove();
      hayMostrado = false;
    
    } else if (result.isDenied) {
      Swal.fire({
        icon: "error",
        title: "Compra cancelada",
      });
    }
  });
}

