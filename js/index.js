document.addEventListener("DOMContentLoaded", () => {
  flatpickr('#date', {
    onChange: (selectedDates, dateStr, instance) => {
      console.log(dateStr);
      console.log(selectedDates);
      console.log(instance);
    }
  });

  flatpickr('#time', {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    onChange: (selectedDates, dateStr, instance) => {
      console.log(dateStr);
      console.log(selectedDates);
      console.log(instance);
    }
  });
  
  const form = document.forms.namedItem('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
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
      let CubiloBusqueda = [];
      for (const element of formElements) {
        CubiloBusqueda.push({
          name: element.name,
          value: element.value
        })
      }
      return CubiloBusqueda;
    })
    .then( data => localStorage.setItem('cubiculoBusqueda', JSON.stringify(data)))
    .then( () => location.href = "resultados.html")
    .catch( () => false);
  });
})

function getElementsForm(elements) {
  let formElementsValid = [];
  for (const element of elements) {
    element.hasAttribute('name') ? formElementsValid.push(element) : false;
  }
  return formElementsValid;
}