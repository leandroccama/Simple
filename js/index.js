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
});