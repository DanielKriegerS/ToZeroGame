document.addEventListener('DOMContentLoaded', () => {
   // Carga dos elementos do DOM   
   const checkbox = document.getElementById('tempo');
   const clock = document.getElementById('clock');

   // Adiciona evento de mudança ao checkbox
   checkbox.addEventListener('change', () => {
       if (checkbox.checked) {
           clock.classList.add('active');
       } else {
           clock.classList.remove('active');
       }
   });

});