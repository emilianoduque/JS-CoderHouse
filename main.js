// Creacion de los objetos
class Productos {
  constructor(nombre, precio, id) {
    this.nombre = nombre;
    this.precio = precio;
    this.id = id;
  }
}

// CONTENIDO DE DESAYUNO
const cafe = new Productos("Café", 70, 1);
const capuchino = new Productos("Capuchino", 110, 2);
const cafeLeche = new Productos("Café con leche", 80, 3);
const te = new Productos("Té", 60, 4);
const tostada = new Productos("Tostada", 15, 5);
const sandwiche = new Productos("Sandwiche", 35, 6);
const mediaLuna = new Productos("Media Luna", 40, 7);

// CONTENIDO DE ALMUERZO
const hamburguesa = new Productos("Hamburguesa Clásica", 280, 1);
const costillas = new Productos("Costillas de Cerdo BBQ", 400, 2);
const pizza = new Productos("Pizza", 450, 3);
const pollo = new Productos("Pollo a la Parrilla", 500, 4);
const ensalada = new Productos("Ensalada Mixta", 180, 5);
const fritas = new Productos("Porción de Fritas", 200, 6);

// CONTENIDO DE MERIENDA
const yogur = new Productos("Yogur con Frutas", 80, 1);
const tortaChoco = new Productos("Torta de chocolate", 120, 2);
const tortaNar = new Productos("Torta de naranja y zanahorias", 120, 3);
const cafeCortado = new Productos("Café cortado", 45, 4);

// CONTENIDO DE CENA
const pechuga = new Productos("Pechuga de Pollo al Horno", 340, 1);
const tacos = new Productos("Tacos de Carne Asada", 240, 2);
const mila = new Productos("Milanesa al pan", 300, 3);
const choriPan = new Productos("Chorizo al pan", 200, 4);

// MENU
const menu = [
  {
    categoriaMenu: "Desayuno",
    contenido: [cafe, capuchino, cafeLeche, te, tostada, mediaLuna],
  },
  {
    categoriaMenu: "Almuerzo",
    contenido: [hamburguesa, costillas, pizza, pollo, ensalada, fritas],
  },
  {
    categoriaMenu: "Merienda",
    contenido: [yogur, tortaChoco, tortaNar, cafeCortado, te, tostada],
  },
  {
    categoriaMenu: "Cena",
    contenido: [pechuga, tacos, pizza, mila, choriPan, hamburguesa],
  },
];

// FUNCIONES

// PARAMETRO: el array "contenido" de cada opcion (desayuno, almuerzo, etc);
function iterarContenido(array) {
  //Muestra el nombre de cada elemento del array dentro del objeto determinado Ademas pone un numero correspondiente para cada opcion a elegir
  let listaContenido = "";
  let numeroOpcion = 1;
  array.forEach((el) => {
    listaContenido +=
      numeroOpcion + ": " + el.nombre + " : $" + el.precio + "\n";
    numeroOpcion++;
  });
  return listaContenido;
}

function seleccionarOpcion() {
  let opcion = parseInt(
    prompt(
      "Contamos con un variado menú, cuentenos que desea elegir:\n---Menú---\n1.Desayuno\n2.Almuerzo\n3.Merienda\n4.Cena\n0.Cerrar :("
    )
  );
  return opcion;
}

function mostrarMenu(opcionElegida) {
  opcionElegida--;
  let eleccion = parseInt(
    prompt(
      "---" +
        menu[opcionElegida].categoriaMenu +
        "---\n" +
        iterarContenido(menu[opcionElegida].contenido)
    )
  );
  if (eleccion >= 0 && eleccion <= menu[opcionElegida].contenido.length) {
    return eleccion;
  } else {
    alert("Opción inválida");
    return null;
  }
}

function quiereSeguir() {
  let seguir;
  do {
    seguir = parseInt(prompt("Deseas algo más?\n 1.Si\n0.No"));
    if (seguir != 1 && seguir != 0) {
      alert("Opcion Inválida");
    }
  } while (seguir != 1 && seguir != 0);
  return seguir;
}

// Mejorando la funcion anterior de desplegarMenu, para que no sea tan repetitiva
function desplegar(opcionElegida) {
  let carrito = [];
  let seguirSeleccionando = true;
  do {
    let opcionDelMenu = mostrarMenu(opcionElegida);
    if (opcionDelMenu != null) {
      let objetoAPushear = menu[opcionElegida - 1].contenido[opcionDelMenu - 1]; //Para solucionar el index del array me pongo el -1 (Tengo que buscar una mejor practica para esto tal vez)
      carrito.push(objetoAPushear);
      if (quiereSeguir() === 0) {
        seguirSeleccionando = false;
      }
    }
  } while (seguirSeleccionando);
  return carrito;
}

//ACTUALIZAR PARA QUE ALERTE UN TICKET CON EL PRECIO TOTAL Y CADA PRODUCTO
function realizarEntrega(carritoProductos) {
  const fecha = new Date();
  let productosDelCarrito = "";

  carritoProductos.forEach((el) => {
    productosDelCarrito += el.nombre + ": $" + el.precio + "\n";
  });

  let nombre = prompt("Podrías indicarnos tu nombre");
  while (nombre == "" || !isNaN(nombre)) {
    nombre = prompt("Ingresa carácteres válidos, porfavor");
  }

  alert(
    "---El Rincón Gourmet---\n!Muchas gracias por tu compra!\nCliente: " +
      nombre +
      "\nFecha: " +
      fecha +
      "\nProductos: \n" +
      productosDelCarrito + "Total: $" + calcularTotal(carritoProductos)
  );
}

function calcularTotal(arrayCompleto){
  let totalCalculado = arrayCompleto.reduce((valorAntiguo, valorNuevo) => {
    return valorAntiguo + valorNuevo.precio;
  }, 0);
  return totalCalculado;
}

// INICIO DEL PROGRAMA
alert("Bienvenido a El Rincón Gourmet");
let cerrar = false;

while (cerrar == false) {
  let opcion = seleccionarOpcion();
  let despliegue = desplegar(opcion);
  realizarEntrega(despliegue);
};
