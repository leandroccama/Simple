document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.length == 0) {
    Swal.fire({
      icon: 'warning',
      text: 'Necesita reserva un cubiculo',
      willClose: () => {
        location.href = '/buscar.html';
      }
    })
  }

  const container = document.querySelector('#results_container');
  const data = JSON.parse(localStorage.getItem('cubiculoBusqueda'));
  const form = document.forms.namedItem('VerDisponibilidad');

  RenderResults(container, data, getRandomInt(1, 5));
  for (const data_item of data) {
    const input = document.querySelector('[name="'+ data_item.name +'"]');
    if (input) input.value = data_item.value;
  }

  flatpickr('#time', {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    onChange: (selectedDates, dateStr, instance) => {
      // console.log(dateStr);
      // console.log(selectedDates);
      // console.log(instance);
    }
  });
  
  form.addEventListener('submit', event => {
    event.preventDefault()
    const formElements = getElementsForm(form.elements);
    
    new Promise( (resolve, reject) => {
      for (const element of formElements) {
        if (element.value == "0" || element.value == "") {
          Swal.fire({
            icon: 'info',
            text: 'Complete el formulario',
          });
          reject();
          break;
        }
      }
      resolve();
    })
    .then( () => {
      for (const element of formElements) {
        data.filter( e => {
          if ('name' in e && e.name == element.name) {
            e.value = element.value;
          }
        })
      }
      localStorage.setItem('cubiculoBusqueda', JSON.stringify(data));
      new Promise( resolve => {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        resolve()
      })
      .then( () => {
        RenderResults(container, data, getRandomInt(1, 5))
      })
    })
    .catch( () => false);
  })

  container.addEventListener('click', event => {
    for (const btn of container.querySelectorAll('.btnReservar')) {
      if (btn.contains(event.target)) {
        const cubiculo = btn.closest('.column');
        new Promise( resolve => {
          const reservas = {
            id: uuid.v4(),
            data: String,
            local: String,
            fecha: String,
            hora: String,
          };
          for (const rol of cubiculo.querySelectorAll('[rol]')) {
            console.log(rol);
            switch (rol.getAttribute('rol')) {
              case 'data': reservas.data = rol.textContent; break;
              case 'local': reservas.local = rol.textContent; break;
              case 'fecha': reservas.fecha = rol.textContent; break;
              case 'hora': reservas.hora = rol.textContent; break;
            }
          }
          console.log(reservas);
          resolve(reservas);
        })
        .then( cubiculoData => {
          if (localStorage.getItem('reservas')) {
            let reservas = JSON.parse(localStorage.getItem('reservas'));
            reservas.push(cubiculoData);
            localStorage.setItem('reservas', JSON.stringify(reservas));
          } else {
            localStorage.setItem('reservas', JSON.stringify([cubiculoData]));
          }
        })
        .then( () => {
          Swal.fire({
            icon: 'success',
            text: 'Se reservo correctamente',
            willClose: () => {
              container.removeChild(cubiculo);
            }
          })
        });
      }
    }
  })
})

const FilterName = (data, nombre) => data.filter( e => 'name' in e && e.name == nombre)[0].value;
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const hrs = (hora, numHrs) => {
  const hrsArray = hora.split(':');
  const hrsInt = parseInt(hrsArray[0]);
  // hrsArray[0] = getRandomInt(hrsInt, hrsInt + 5);
  hrsArray[0] = hrsInt + parseInt(numHrs);
  return hrsArray.join(':');
}
const getElementsForm = (elements) => {
  let formElementsValid = [];
  for (const element of elements) {
    element.hasAttribute('name') ? formElementsValid.push(element) : false;
  }
  return formElementsValid;
}
const RenderResults = (container, data, num) => {
  for (let i = 0; i < num; i++) {
    container.innerHTML += 
    `<div class="column is-full-tablet-only is-half-desktop">
      <div class="box">
        <p class="title is-4 has-text-black mb-3" rol="data">CUB. 0${i + 1} PAB.${FilterName(data, 'pabellon')}-PISO4 - AFORO ${getRandomInt(1, 20)} - ${FilterName(data, 'tipo_recurso')}</p>
        <div class="mb-3">
          <p class="is-size-5 is-5" rol="local">${FilterName(data, 'local')}</p>
          <p class="is-size-5 is-5" rol="fecha">${FilterName(data, 'fecha_reserva')}</p>
          <p class="is-size-5 is-5" rol="hora">${FilterName(data, 'hora_reserva')} - ${hrs(FilterName(data, 'hora_reserva'), FilterName(data, 'horas'))}</p>
        </div>
        <button class="button is-black is-medium is-radiusless btnReservar" style="width: 220px;">RESERVAR</button>
      </div>
    </div>`
  }
}