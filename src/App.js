import React, { Component } from 'react';
import './App.css';
import Cartas from './componentes/Cartas'
import swal from 'sweetalert'

class App extends Component {

  render() {
    return (
      <div id='contenedor'>
        <Cartas/>
        <div onClick={()=>{
          document.getElementById('bg-dialogo').style.display = 'block'
        }} id='btn_agregar'>
          <img src={require('./plus.png')}/>
        </div>
        <div id='bg-dialogo' className='dialogo'>
          <div id='carta-agregar'>
            <img onClick={()=>{
              document.getElementById('bg-dialogo').style.display = 'none';
            }} src={require('./close.png')}/>
            <div style={{width: '100%'}}>
              <input id='titulo' maxLength={35} placeholder='TITULO(35 max)'/>
            </div>
            
            <textarea id='escritura' maxLength={500} placeholder='ESCRIBE LO QUE QUIERAS!'/>
            <div onClick={()=>{
              
              var titulo = document.getElementById('titulo').value;
              var escritura = document.getElementById('escritura').value;

              if(titulo.length >= 4 && escritura.length >= 10){

                swal({
                  title: "SEGURO QUE DESEA AGREGAR ESTA  NOTA?",
                  text: "Una vez agregada esta nota no hay manera de borrarla",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                })
                .then((willDelete) => {
                  if (willDelete) {
                    var arrayTitulo = titulo.split(' ');
                  var arraEscritura = escritura.split(' ');
                  arrayTitulo = arrayTitulo.filter(function(item){
                    return item !== ''
                  })
                  arraEscritura = arraEscritura.filter(function(item){
                    return item !== ''
                  })
                  titulo = arrayTitulo.join(' ')
                  escritura = arraEscritura.join(' ')

                  //console.log(titulo + "\n" + escritura)
                  var datos = {
                    'escritura': escritura,
                    'titulo': titulo
                  }

                  
                  var url = 'https://noteio.tk/CC?losDatos=' + encodeURIComponent(JSON.stringify(datos))
                  var connexion = new XMLHttpRequest();
                  connexion.open('POST', url, true);
                  connexion.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                  connexion.send();
              
                  connexion.onreadystatechange = ()=>{
                    if(connexion.readyState == 4 && connexion.status !== 404)
                    {
                      document.getElementById('bg-dialogo').style.display = 'none';
                      var titulo = document.getElementById('titulo').value = "";
                      var escritura = document.getElementById('escritura').value = "";
                    }else
                    {
                      if(connexion.status == 429 && connexion.response == 'Losiento, demasiadas request')
                      {
                        alert('TE ESTAS DIVIRTIENDO MUCHISIMO NO?\nHAS ESCRITO MUCHAS CARTAS EN UNA CANTIDAD MUY CORTA DE TIEMPO, ESPERA UN POCO HASTA QUE PUEDAS ESCRIBIR OTRA CARTA :)')
                      }
                    }
                  }
                  }
                });
                
              }else
              {
                alert('POR FAVOR, ESCRIBE ALGO MAS LARGO')
              }

            }} id='btn-aceptar'>
              <img src={require('./check.png')}/>
            </div>
          </div>
        </div>
        <p id='parrafo'><strong>VERSION: BETA-0.1.0<br/>
        GITHUB: https://github.com/MerliMejia/Note.io</strong></p>
      </div>
      
    );
  }
}

export default App;
