let qs = (element) => document.querySelector(element);
let qsa = (element) => document.querySelectorAll(element);

window.addEventListener("load", function () {
  let imagenes = qsa('#imagenes');
  
  let check = 0
  
  for(let i=0;i<imagenes.length;i++){
    let srcItera = imagenes[i].src
    let cantidadItera = srcItera.indexOf('images')
    let corteItera = srcItera.slice(cantidadItera + 7)
    if(corteItera == 'escritorio_select.png'){
      check = 1
    }
  }

  for (const imagen of imagenes) {
    imagen.addEventListener("click", (e) => {
      e.preventDefault();
      
      let src = imagen.src
      let cantidad = src.indexOf('images/desk/')
      let corte = src.slice(cantidad + 12)
      console.log(corte)
      
      switch (corte) {
        case '1.png':
          
          Swal.fire({
            title: 'Estas seguro de guardar esta Reserva?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Reservar`,
            denyButtonText: `Descartar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Reservado!', '', 'success')
              if(check == 1) {
                for(let i=0;i<imagenes.length;i++){
                  let srcItera = imagenes[i].src
                  let cantidadItera = srcItera.indexOf('images/desk/')
                  let corteItera = srcItera.slice(cantidadItera + 12)
                  if(corteItera == 'escritorio_select.png'){
                    console.log('encontro el seleccionado')
                    imagenes[i].setAttribute('src', '/images/desk/1.png')
                    check = 0
                  }
                }
              }
              imagen.setAttribute('src', '/images/desk/escritorio_select.png')
              check = 1

              console.log(imagen.alt)
              let data = {
                id: imagen.alt,
              }
              fetch('http://localhost:3000/tulugar/detalle/reservar',{
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json'
                }
              })

            } else if (result.isDenied) {
              imagen.setAttribute('src', '/images/desk/1.png')
              check = 0
            }
          })
          break;
        case '2.png':
        case '3.png':
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Escritorio ocupado! Selecciona otro...',
            showConfirmButton: false,
            timer: 1500
          })
          break;
        default:
          console.log('nada')
      }
      
      //location.reload();
    })
}
})

