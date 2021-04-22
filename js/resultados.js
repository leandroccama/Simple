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
})