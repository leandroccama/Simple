document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('#results_container')
  const data = JSON.parse(localStorage.getItem('reservas'))

  if (data.length > 0) {
    for (const reserva of data) {
      container.innerHTML += 
      `<div class="column is-full-mobile is-half-tablet is-half-desktop">
        <div class="box">
          <p class="title is-4 has-text-black mb-3">${reserva.data}</p>
          <div class="mb-3">
            <p class="is-size-5 is-5">${reserva.local}</p>
            <p class="is-size-5 is-5">${reserva.fecha}</p>
            <p class="is-size-5 is-5">${reserva.hora}</p>
          </div>
          <div class="buttons">
            <button data-id="${reserva.id}" class="button is-black is-medium is-radiusless btnActivar">ACTIVAR</button>
            <button data-id="${reserva.id}" class="button is-black is-medium is-radiusless btnCancelar">CANCELAR</button>
          </div>
        </div>
      </div>` 
    }
  } else {
    SinReservas(container);
  }


  container.addEventListener('click', event => {
    for (const btn of container.querySelectorAll('.btnActivar')) {
      if (btn.contains(event.target)) {
        Swal.fire({
          icon: 'success',
          text: 'Se activo correctamente la reserva',
        })
        break
      }
    }

    for (const btn of container.querySelectorAll('.btnCancelar')) {
      if (btn.contains(event.target)) {
        const cubiculo = btn.closest('.column');
        const cubiculos = container.querySelectorAll('.column')
        data.filter( e => {
          if ('id' in e && e.id == btn.dataset.id) {
            data.splice((data.indexOf(e)), 1);
          }
        })
        localStorage.setItem('reservas', JSON.stringify(data));

        Swal.fire({
          icon: 'info',
          text: 'Se cancelo su reserva correctamente',
          willClose: () => {
            container.removeChild(cubiculo);
            if (container.childElementCount == 0) {
              SinReservas(container);
            }
            console.log(JSON.parse(localStorage.getItem('reservas')));
          }
        })
        break
      }
    }
  })
})

function SinReservas(container) {
  container.innerHTML =
  `<div class="column has-text-centered">
    <p class="title">Sin reservaciones</p>
    <p class="subtitle">Realice su reserva <a href="buscar.html">aqui</a></p>
  </div>`
}