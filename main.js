alert("Bienvenido a El Rincón Gourmet");

let cerrar = false; // Tuve que usar este tipo de metodo porque se me generó problema con el dowhile cuando probaba cerrar de una el programa

function seleccionarOpcion() {
  let opcion = parseInt(
    prompt(
      "Contamos con un variado menú, cuentenos que desea elegir:\n---Menú---\n1.Desayuno\n2.Almuerzo\n3.Merienda\n4.Cena\n0.Cerrar :("
    )
  );
  return opcion;
}

function desplegarOpcionMenu(opcionElegida) {
  //acá le pasaria como parametro la opcion de la funcion seleccionarOpcion
  if (opcionElegida === 1) {
    let eleccion = parseInt(
      prompt(
        "---Desayuno---\n1.Café($70)\n2.Capuchino($110)\n3.Café con leche($80)\n4.Té($60)\n5.Tostadas($15 c/u)\n6.Sandwiches($35 c/u)\n7.Media Luna($40 c/u)"
      )
    );
    if (eleccion <= 7 && eleccion != 0) {
      switch (eleccion) {
        case 1:
          realizarEntrega("Café");
          break;
        case 2:
          realizarEntrega("Capuchino");
          break;
        case 3:
          realizarEntrega("Café con leche");
          break;
        case 4:
          realizarEntrega("Té");
          break;
        case 5:
          realizarEntrega("Tostada");
          break;
        case 6:
          realizarEntrega("Sandwiche");
          break;
        case 7:
          realizarEntrega("Media Luna");
          break;
      }
    } else {
      alert("Opción no válida");
    }
  } else if (opcionElegida === 2) {
    let eleccion = parseInt(
      prompt(
        "---Almuerzo---\n1.Hamburguesa Clásica($280)\n2.Costillas de Cerdo BBQ($400)\n3.Pizza($450)\n4.Pollo a la Parrilla($500)\n5.Ensalada Mixta($3)\n6.Porción de fritas($200)"
      )
    );
    if (eleccion <= 6 && eleccion != 0) {
      switch (eleccion) {
        case 1:
          realizarEntrega("Hamburguesa Clásica");
          break;
        case 2:
          realizarEntrega("Costillas de Cerdo BBQ");
          break;
        case 3:
          realizarEntrega("Pizza");
          break;
        case 4:
          realizarEntrega("Pollo a la Parrilla");
          break;
        case 5:
          realizarEntrega("Ensalada Mixta");
          break;
        case 6:
          realizarEntrega("Porción de fritas");
          break;
      }
    } else {
      alert("Opción no válida");
    }
  } else if (opcionElegida === 3) {
    let eleccion = parseInt(
      prompt(
        "---Merienda---\n1.Yogur con Frutas($90)\n2.Tostadas($15 c/u)\n3.Torta de chocolate($150)\n4.Torta de naranja y zanahorias($170)\n5.Té($60)\n6.Café cortado($75)"
      )
    );
    if (eleccion <= 6 && eleccion != 0) {
      switch (eleccion) {
        case 1:
          realizarEntrega("Yogur con Frutas");
          break;
        case 2:
          realizarEntrega("Tostada");
          break;
        case 3:
          realizarEntrega("Torta de chocolate");
          break;
        case 4:
          realizarEntrega("Torta de naranja y zanahorias");
          break;
        case 5:
          realizarEntrega("Té");
          break;
        case 6:
          realizarEntrega("Café cortado");
          break;
      }
    } else {
      alert("Opción no válida");
    }
  } else if (opcionElegida === 4) {
    let eleccion = parseInt(
      prompt(
        "---Cena---\n1.Pechuga de Pollo al Horno($560)\n2.Tacos de Carne Asada($370 c/u)\n3.Pizza($450)\n4.Milanesa al pan\n5.Chorizo al pan($300)\n6.Hamburguesa Clásica($280)"
      )
    );
    if (eleccion <= 6 && eleccion != 0) {
      switch (eleccion) {
        case 1:
          realizarEntrega("Pechuga de Pollo al Horno");
          break;
        case 2:
          realizarEntrega("Tacos de Carne Asada");
          break;
        case 3:
          realizarEntrega("Pizza");
          break;
        case 4:
          realizarEntrega("Milanesa al pan");
          break;
        case 5:
          realizarEntrega("Chorizo al pan");
          break;
        case 6:
          realizarEntrega("Hamburguesa Clásica");
          break;
      }
    } else {
      alert("Opción no válida");
    }
  } else if (opcionElegida === 0) {
    alert("Adios :(");
    cerrar = true;
  } else {
    alert("Por favor ingrese un valor válido");
  }
}

function realizarEntrega(subEleccion) {
  let nombre = prompt("Podrías indicarnos tu nombre");
  while (nombre == "" || !isNaN(nombre)) {
    nombre = prompt("Ingresa carácteres válidos, porfavor");
  }
  alert(
    "Tu pedido será enviado a tu domicilio a la brevedad.\n!Muchas gracias por tu compra " +
      nombre +
      ", disfruta tu " +
      subEleccion +
      "!"
  );
}

do {
  desplegarOpcionMenu(seleccionarOpcion());
} while (cerrar == false);
