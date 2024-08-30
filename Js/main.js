let productosDatos = {};
fetch("./json/productos.json")
  .then((resp) => resp.json())
  .then((data) => {
    data.forEach((producto) => {
      for (let objeto in producto) {
        productosDatos[objeto] = producto[objeto];
      }
    });
    
    const linkeoBase = "../img/"
    const linkeoFinal = ".png";

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

    // FUNCIONES
    function crearEnCatalogo(producto) {
      const carta = document.createElement("div");
      carta.className = "carta";

      const titulo = document.createElement("h3");
      titulo.innerText = producto.nombre;

      const imagen = document.createElement("IMG");
      imagen.src = linkeoBase + producto.img + linkeoFinal;
      imagen.className = "img";

      const precio = document.createElement("p");
      precio.innerText = "$ " + producto.precio;

      const boton = document.createElement("button");
      boton.className = "boton-carta";
      boton.innerText = "Agregar en carrito";
      boton.addEventListener("click", () => {
        agregarAlCarrito(producto);
        Toastify({

          text: "Se ha agregado: " + producto.nombre,
          
          duration: 2000
          
          }).showToast();
      });

      carta.append(titulo);
      carta.append(imagen);
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
        const indexDelProducto = carrito.findIndex(
          (el) => el.id === producto.id
        );
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
    }

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
        const index = carrito.findIndex(
          (producto) => producto.id === objeto.id
        );
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
    }

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
    
    let carrito = JSON.parse(localStorage.getItem("carritoProductos")) || [];

    //Variable para determinar cuando está abierto el carrito
    let hayMostrado = false;

    // CREANDO DOM:
    const contenedor = document.createElement("div");
    contenedor.className = "contenedor";
    document.body.append(contenedor);

    const botonera = document.createElement("div");
    botonera.className = "botonera";
    document.body.append(botonera);

    // Para cada reinicio de la pagina
    if (carrito.length > 0) {
      document.body.append(carroBotonera);
      carroBotonera.append(verCarro);
    }

    // MENU
    const menu = [
      {
        opcion: 1,
        categoriaMenu: "Desayuno",
        contenido: [
          productosDatos["cafe"],
          productosDatos["capuchino"],
          productosDatos["cafeLeche"],
          productosDatos["te"],
          productosDatos["tostada"],
          productosDatos["mediaLuna"],
        ],
      },
      {
        opcion: 2,
        categoriaMenu: "Almuerzo",
        contenido: [
          productosDatos["hamburguesa"],
          productosDatos["costillas"],
          productosDatos["pizza"],
          productosDatos["pollo"],
          productosDatos["ensalada"],
          productosDatos["fritas"],
        ],
      },
      {
        opcion: 3,
        categoriaMenu: "Merienda",
        contenido: [
          productosDatos["yogur"],
          productosDatos["tortaChoco"],
          productosDatos["tortaNar"],
          productosDatos["cafeCortado"],
          productosDatos["te"],
          productosDatos["tostada"],
        ],
      },
      {
        opcion: 4,
        categoriaMenu: "Cena",
        contenido: [
          productosDatos["pechuga"],
          productosDatos["tacos"],
          productosDatos["pizza"],
          productosDatos["mila"],
          productosDatos["choriPan"],
          productosDatos["hamburguesa"],
        ],
      },
    ];

    // Opciones de Menus:
    menu.forEach((el) => {
      const boton = document.createElement("button");
      boton.innerText = el.categoriaMenu;
      boton.className = "botones-Menu";

      boton.addEventListener("click", () => seleccion(el.opcion));
      botonera.append(boton);
    });
  })
  .catch((err) => {
    const errorMsj = document.createElement("h1");
    errorMsj.innerText = "Parece que tenemos un problema con nuestra sección de catálogo, porfavor prueba más tarde"
    errorMsj.className = "error"
    document.body.append(errorMsj);
  });
