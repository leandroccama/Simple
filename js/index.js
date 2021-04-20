document.addEventListener("DOMContentLoaded", () => {

  $('#date').datetimepicker({
    ownerDocument: document,
    contentWindow: window,
    timepicker: false,
    value:'',
    mask:false,

  });

  $('#time').datetimepicker({
    datepicker: false,
  });

});