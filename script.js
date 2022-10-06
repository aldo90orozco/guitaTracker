
const $tipoDeMovimiento=document.querySelector('.tipo-movimiento');
const $descripcionMovimiento=document.querySelector('.descripcion-movimiento');
const $importe=document.querySelector('.importe');
const $fechaMovimiento=document.querySelector('.fecha-movimiento');
const $botonMovimiento=document.querySelector('.boton-movimiento');
const tbody=document.querySelector('tbody')
const movimientos=[];
const finalAmount=document.querySelector('.importeFinal')

//evento click

const mostrarImporteFinal=()=>{
    let monto=0;
    movimientos.forEach(movimiento=>{
        if(movimiento.tipo==='ingreso'){
            monto+=movimiento.importe;

        }else{
            monto -=movimiento.importe
        }
    })
    const value=document.createTextNode(`$${monto}`);
    finalAmount.removeChild(finalAmount.firstChild)
    finalAmount.appendChild(value);
}

$botonMovimiento.addEventListener('click',(e)=>{



})

//obtener los valores del formulario
//funcion que retorna un objeto con los valores del formulario
const generarMovimiento=()=>{
    const objeto={
        tipo:$tipoDeMovimiento.value,
        descripcion:$descripcionMovimiento.value,
        importe:Number($importe.value),
        fecha:$fechaMovimiento.value.split('-').reverse().join('/'),//cambiar formato fecha
    }
    if(!objeto.descripcion.trim()|| !objeto.fecha || objeto.importe <=0){
        return null;
    }
    return objeto;
}

const imprimirColeccionMovimientos=(array,target)=>{

    array.forEach(movimiento=>{
        const row=document.createElement('tr');
        if(movimiento.tipo==='ingreso'){
            row.classList.add('ingreso')
        }
        else{
            row.classList.add('egreso')
        }
        const keys=Object.keys(movimiento)//arreglo que devuelve los keys tipo,descripcion,importe y fecha
        keys.forEach(key=>{
            const td=document.createElement('td')
            const text=document.createTextNode(key ==='importe'? `$ ${movimiento[key]}`:movimiento[key]);
            td.appendChild(text);

            row.appendChild(td);
        })

        target.appendChild(row);
    })

}

const limpiarTabla=()=>{
    while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild)
        
    }
}


const limpiarFormulario=()=>{
    [$descripcionMovimiento,$importe,$fechaMovimiento].forEach((input)=>{input.value='';})
}



$botonMovimiento.addEventListener('click',(e)=>{
    
    const nuevoMovimiento=generarMovimiento();
    if(!nuevoMovimiento) return alert('debes completar todos los datos')
    limpiarTabla();
    movimientos.push(nuevoMovimiento);
    imprimirColeccionMovimientos(movimientos,tbody)
    mostrarImporteFinal();
    limpiarFormulario();



})