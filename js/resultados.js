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

  const data = JSON.parse(localStorage.getItem('cubiculoBusqueda'));
  for (const data_item of data) {
    console.log(data_item);
    const input = document.querySelector('[name="'+ data_item.name +'"]');
    if (input) {
      console.log(input);
      input.value = data_item.value;
    }
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
})