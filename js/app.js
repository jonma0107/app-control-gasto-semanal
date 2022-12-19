// VARIABLES
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');


// EVENTOS
eventListeners();
function eventListeners() {
  document.addEventListener('DOMContentLoaded', preguntaPresupuesto);
  formulario.addEventListener('submit', agregarGasto);
}


// CLASES
class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gastos = [];
  }

  nuevoGasto(gasto) {
    this.gastos = [...this.gastos, gasto]; // Spreed Operator
    this.calcularRestante();
  }

  calcularRestante() {
    const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
    this.restante = this.presupuesto - gastado;
    // console.log(this.restante);
  }

  eliminarGasto(id) {
    this.gastos = this.gastos.filter(gasto => gasto.id !== id);
    // console.log(this.gastos);
    // vuelve a iterar sobre ek Objeto
    this.calcularRestante();
  };
};

/********************************************************************************/

class UI {
  insertarPresupuesto(cantidad) {
    const { presupuesto, restante } = cantidad;
    document.querySelector('#total').textContent = presupuesto;
    document.querySelector('#restante').textContent = restante;
  }

  imprimirAlerta(mensaje, tipo) {
    // Crear el Div
    const divAlerta = document.createElement('div');
    divAlerta.classList.add('text-center', 'alert');

    if (tipo === 'error') {
      divAlerta.classList.add('alert-danger')
    } else if (tipo === 'warning') {
      divAlerta.classList.add('alert-warning')
    } else {
      divAlerta.classList.add('alert-success')
    }

    // mensaje de error
    divAlerta.textContent = mensaje;

    // insertar en el HTML
    document.querySelector('.primario').insertBefore(divAlerta, formulario);

    setTimeout(() => {
      divAlerta.remove();
    }, 4000)

  };

  mostrarGastos(gastos) {

    this.limpiarHTMl(); // elimina el HTML previo

    // Iterar sobre los gastos
    gastos.forEach(gasto => {
      const { cantidad, nombre, id } = gasto;

      // Crear un Li
      const nuevoGasto = document.createElement('li');
      nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
      nuevoGasto.dataset.id = id;

      // Agregar el HTML del gasto
      nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill">$ ${cantidad}</span>`;

      // Botón para borrar el gasto
      const btnBorrar = document.createElement('button');
      btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
      btnBorrar.innerHTML = 'Borrar &times;';
      btnBorrar.onclick = () => {
        eliminarGasto(id);
      };
      nuevoGasto.appendChild(btnBorrar);

      // Agregar al HTML
      gastoListado.appendChild(nuevoGasto);

    });
  };

  // LIMPIAR HTML
  limpiarHTMl() {
    while (gastoListado.firstChild) {
      gastoListado.removeChild(gastoListado.firstChild);
    };
  };

  actualizarRestante(restante) {
    document.querySelector('#restante').textContent = restante;
  };

  comprobarPresupuesto(presupuestObj) {
    const { presupuesto, restante } = presupuestObj;
    const restanteDiv = document.querySelector('.restante');
    if (restante === 0) {
      // Comprobar el 100% gastado
      this.imprimirAlerta('Te has gastado todo el presupuesto', 'error')
      restanteDiv.classList.remove('alert-success');
      restanteDiv.classList.add('alert-danger');
      formulario.querySelector('button[type="submit"]').disabled = true;
      formulario.querySelector('button[type="submit"]').style.display = 'none';
      // Comprobar el ingreso de un valor que exceda el 100%
    } else if (restante < 0) {
      this.imprimirAlerta('No puedes hacer ese gasto, no te alcanza del presupuesto total. Debes borrar ese gasto.', 'error')
      restanteDiv.classList.remove('alert-success');
      restanteDiv.classList.add('alert-danger');
      formulario.querySelector('button[type="submit"]').disabled = true;
      formulario.querySelector('button[type="submit"]').style.display = 'none';
      // Comprobar el 75% gastado
    } else if ((presupuesto / 4) === restante) {
      this.imprimirAlerta('Te has gastado el 75% del presupuesto', 'error')
      restanteDiv.classList.remove('alert-success');
      restanteDiv.classList.add('alert-danger');
      formulario.querySelector('button[type="submit"]').disabled = false;
      formulario.querySelector('button[type="submit"]').style.display = 'inline-block';
    } else if ((presupuesto / 4) > restante) {
      this.imprimirAlerta('Te has gastado más del 75% del presupuesto', 'error')
      restanteDiv.classList.remove('alert-success');
      restanteDiv.classList.add('alert-danger');
      formulario.querySelector('button[type="submit"]').disabled = false;
      formulario.querySelector('button[type="submit"]').style.display = 'inline-block';
      // Comprobar el 50% gastado
    } else if ((presupuesto / 2) === restante) {
      this.imprimirAlerta('Te has gastado el 50% del presupuesto', 'warning')
      restanteDiv.classList.remove('alert-success', 'alert-danger');
      restanteDiv.classList.add('alert-warning');
      formulario.querySelector('button[type="submit"]').disabled = false;
      formulario.querySelector('button[type="submit"]').style.display = 'inline-block';
    } else if ((presupuesto / 2) > restante) {
      this.imprimirAlerta('Te has gastado mas del 50% del presupuesto', 'warning')
      restanteDiv.classList.remove('alert-success', 'alert-danger');
      restanteDiv.classList.add('alert-warning');
      formulario.querySelector('button[type="submit"]').disabled = false;
      formulario.querySelector('button[type="submit"]').style.display = 'inline-block';
    } else {
      restanteDiv.classList.remove('alert-danger', 'alert-warning');
      restanteDiv.classList.add('alert-success');
      formulario.querySelector('button[type="submit"]').disabled = false;
      formulario.querySelector('button[type="submit"]').style.display = 'inline-block';

    }

  };

};

//**********************************************************************************/

// INSTANCIAR
const ui = new UI();
let presupuesto;

// ************************************* FUNCIONES *******************************//
function preguntaPresupuesto() {
  const presupuestoUsuario = prompt('¿Cuál es tu presupuesto?');

  // console.log(Number(presupuestoUsuario));

  if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
    window.location.reload();
  }

  // Presupuesto Válido
  presupuesto = new Presupuesto(presupuestoUsuario)
  // console.log(presupuesto);

  // Insertar los valores de la clase Presupuesto en la clase UI
  ui.insertarPresupuesto(presupuesto);
}
/***********************************************************************************/

function agregarGasto(e) {
  e.preventDefault();
  // Leer los datos del formulario
  const nombre = document.querySelector('#gasto').value;
  const cantidad = Number(document.querySelector('#cantidad').value);

  if (nombre === '' || cantidad === '') {
    ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
    return;
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    ui.imprimirAlerta('Cantidad no válida', 'error')
    return;
  }

  // Generar un objeto de gasto
  const gasto = { nombre, cantidad, id: Date.now() };
  // console.log(gasto);

  // Añade un nuevo gasto
  presupuesto.nuevoGasto(gasto);

  // Mensaje de todo bien!
  ui.imprimirAlerta('Gasto agregado correctamente');

  // Imprimir los gastos
  const { gastos, restante } = presupuesto;
  ui.mostrarGastos(gastos);
  ui.actualizarRestante(restante);
  ui.comprobarPresupuesto(presupuesto);

  // Reinicia el formulario
  formulario.reset();
};

/***********************************************************************************/

function eliminarGasto(id) {
  // Elimina los gastos del Objeto
  presupuesto.eliminarGasto(id);
  // Elimina los gastos del HTML
  const { gastos, restante } = presupuesto;
  ui.mostrarGastos(gastos);
  // actualiza el Restante
  ui.actualizarRestante(restante);
  ui.comprobarPresupuesto(presupuesto);
}







