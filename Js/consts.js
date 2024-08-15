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
  const hamburguesa = new Productos("Hamburguesa Clásica", 280, 8);
  const costillas = new Productos("Costillas de Cerdo BBQ", 400, 9);
  const pizza = new Productos("Pizza", 450, 10);
  const pollo = new Productos("Pollo a la Parrilla", 500,11);
  const ensalada = new Productos("Ensalada Mixta", 180, 12);
  const fritas = new Productos("Porción de Fritas", 200, 13);
  
  // CONTENIDO DE MERIENDA
  const yogur = new Productos("Yogur con Frutas", 80, 14);
  const tortaChoco = new Productos("Torta de chocolate", 120, 15);
  const tortaNar = new Productos("Torta de naranja y zanahorias", 120, 16);
  const cafeCortado = new Productos("Café cortado", 45, 17);
  
  // CONTENIDO DE CENA
  const pechuga = new Productos("Pechuga de Pollo al Horno", 340, 18);
  const tacos = new Productos("Tacos de Carne Asada", 240, 19);
  const mila = new Productos("Milanesa al pan", 300, 20);
  const choriPan = new Productos("Chorizo al pan", 200, 21);
  
  // MENU
  const menu = [
    {
      opcion: 1,
      categoriaMenu: "Desayuno",
      contenido: [cafe, capuchino, cafeLeche, te, tostada, mediaLuna],
    },
    {
      opcion: 2,
      categoriaMenu: "Almuerzo",
      contenido: [hamburguesa, costillas, pizza, pollo, ensalada, fritas],
    },
    {
      opcion: 3,
      categoriaMenu: "Merienda",
      contenido: [yogur, tortaChoco, tortaNar, cafeCortado, te, tostada],
    },
    {
      opcion: 4,
      categoriaMenu: "Cena",
      contenido: [pechuga, tacos, pizza, mila, choriPan, hamburguesa],
    },
  ];