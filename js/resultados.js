// const { default: Swal } = require("sweetalert2");

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

  const container = document.querySelector('#results_container');
  const data = JSON.parse(localStorage.getItem('cubiculoBusqueda'));
  for (const data_item of data) {
    const input = document.querySelector('[name="'+ data_item.name +'"]');
    if (input) input.value = data_item.value;
  } 

  for (let i = 0; i < 3; i++) {
    container.innerHTML += `
      <div class="column is-full-tablet-only is-half-desktop">
        <div class="box">
          <p class="title is-4 has-text-black mb-3">askjdhnbasjhdbjas</p>
          <div class="mb-3">
            <p class="is-size-5 is-5">CAMPUS MONTERRICO</p>
            <p class="is-size-5 is-5">${FilterName(data, 'fecha_reserva')}</p>
            <p class="is-size-5 is-5">${FilterName(data, 'hora_reserva')} - --:--</p>
          </div>
          <button class="button is-black is-medium is-radiusless" style="width: 220px;">RESERVAR</button>
        </div>
      </div>
    `; 
  }
})

const FilterName = (data, nombre) => {
  return data.filter( e => 'name' in e && e.name == nombre)[0].value;
}