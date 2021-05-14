tinymce.init({
    selector: '#descripcion-txta',
    height: 500,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });


const carta = [];
const horarios = ["desayuno","almuerzo","once","cena"];

let hor = document.querySelector("#horario-select");
for(let i=0; i<horarios.length; ++i){
    const op = document.createElement('option');
    op.value=horarios[i];
    op.text=horarios[i];
    hor.appendChild(op);
}

const cargarTabla = ()=>{
    const tbody = document.querySelector("#tabla-tbody");
    tbody.innerHTML = "";
    for(let i=0; i<carta.length;++i){
        let c = carta[i];
        let fila = document.createElement("tr");
        let celdaNombre = document.createElement("td");
        celdaNombre.innerText = c.nombre;
        let celdaHorario = document.createElement("td");
        celdaHorario.innerText = c.horario;
        let celdaValor = document.createElement("td");
        celdaValor.innerText = c.valor;
        let celdaDescripcion = document.createElement("td");
        celdaDescripcion.innerHTML = c.descripcion;
        let celdaOferta = document.createElement("td");
        celdaOferta.innerText = c.oferta
        /* No logre que mostrara el icono
        let icono = document.createElement("i");
        if(c.oferta){
            icono.classList.add("fas","fa-check-square");
        }else{
            icono.classList.add("fas","fa-times-circle");
        };
        celdaOferta.appendChild(icono);
        */
        
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaHorario);
        fila.appendChild(celdaValor);
        fila.appendChild(celdaDescripcion);
        fila.appendChild(celdaOferta);

        tbody.appendChild(fila);
    }
  };

  document.querySelector("#registrar-btn").addEventListener("click", ()=>{
    let nombre = document.querySelector("#nombre-txt").value;
    let horario = document.querySelector("#horario-select").value;
    let valor = document.querySelector("#valor-number").value;
    let descripcion = tinymce.get("descripcion-txta").getContent();
    let oferta = false;    

    if((horario == "desayuno" && valor < 1000) || (horario == "desayuno" && valor > 10000)){
        swal.fire("Horario y valor no corresponden");
        return;
    }else if((horario == "almuerzo" && valor < 10000) || (horario == "almuerzo" && valor > 20000)){
        swal.fire("Horario y valor no corresponden");
        return;
    }else if((horario == "once" && valor < 5000) || (horario == "once" && valor > 15000)){
        swal.fire("Horario y valor no corresponden");
        return;
    }else if((horario == "cena" && valor < 15000)){
        swal.fire("Horario y valor no corresponden");
        return;
    };

    if((horario == "desayuno" && valor < 5000)){
        oferta = true;
    }else if(horario == "almuerzo" && valor < 15000){
        oferta = true;
    }else if(horario == "once" && valor < 10000){
        oferta = true;
    }else if(horario == "cena" && valor < 20000){
        oferta = true;
    };

    let temp = [];

    temp.nombre = nombre;
    temp.horario = horario;
    temp.valor = valor;
    temp.descripcion = descripcion;
    temp.oferta = oferta;
    carta.push(temp);
    cargarTabla();
    swal.fire("Registro de menu realizado");
    
  });