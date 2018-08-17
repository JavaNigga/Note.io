import React, { Component } from 'react';
import Elementos from './Elementos'

export default class Cartas extends Component
{
    //Calcular el posicionamiento de cada carta
    posicionamiento = (array)=>
    {
        setInterval(()=>{

            var matriz = [];// matriz
            var altos = [];
            var elementos = [];

            var fin = false;//saber cuando dejar de contar
            var filas = 0;//filas de la matriz
            let columnas = 0;//columnas de la matriz
            var pantalla = window.innerWidth;//tamaño de pantalla
            var sumatoriaWidth = 0;//Sumatoria de los anchos de cada carta en la fila
            var contador = 0;//contador para saber cuando parar el bucle
            var marginPantalla = 0;
            if(pantalla >= 1224)
            {
                marginPantalla = (pantalla * 0.10)
            }else if(pantalla < 1224 && pantalla >= 1000)
            {
                marginPantalla = (pantalla * 0.2)
            }else if(pantalla < 1000 && pantalla >= 320)
            {
                marginPantalla = (pantalla * 0.2)
            }
            //console.log(pantalla)

            while(fin == false)
            {
                if(contador < array.length)
                {
                    for(columnas; columnas < array.length; columnas++)
                    {
                        
                        if(sumatoriaWidth >= (pantalla - marginPantalla))//si la sumatoria de anchos es mayor o igual al de la pantalla pasamos a otra fila
                        {
                            filas++;
                            columnas = 0;
                            sumatoriaWidth = 0;
                            break;
                            
                        }else
                        {
                            if(altos[columnas] == undefined)
                            {
                                //console.log('altos nada')
                                if(filas > 0)
                                {
                                    altos[columnas] = altos[altos.length - 2];
                                }
                                else
                                {
                                    altos[columnas] = 0;
                                }
                                
                            }
                            //agregamos la carta a la matriz
                            if(contador < array.length)
                            {
                                matriz[[filas, columnas]] = {
                                    id:array[contador]['props']['id'],
                                    left: sumatoriaWidth,
                                    top: altos[columnas]
                                }
                            }

                            if(contador < array.length)
                            {
                                altos[columnas] += document.getElementById(array[contador]['props']['id']).offsetHeight;
                                /*console.log('FILA: ' + filas + "  ALTOS: " + altos + "  COLUMNAS: " + columnas + "  CONTADOR: " + 
                                contador + "  HEIGTH: " + document.getElementById(array[contador]['props']['id']).offsetHeight)*/
                            }
                            
                            
                            
                        }
                        if(contador < array.length)
                        {
                            //Sumamos el ancho de la carta
                            //console.log(array[contador]['props']['id'])
                            var elemento = <Elementos Titulo={array[contador]['props']['Titulo']}
                            Escritura={array[contador]['props']['Escritura']} id={array[contador]['props']['id']}
                            top={matriz[[filas, columnas]]['top']} left={matriz[[filas, columnas]]['left']}/>
                            elementos.push(elemento);
                            sumatoriaWidth+= document.getElementById(array[contador]['props']['id']).offsetWidth;
                        }
                        
                        
                        contador++;
                    }
                }else
                {
                    fin = true;
                }
                
            }
            //console.log(matriz);
            this.setState({lasCartas: elementos})
        }, 1000)

    }

    formarCartas = (objeto)=>{
        var array = [];
        var contador = 0;
        for(var cartas in objeto)
        {
            var elemento = <Elementos Titulo={objeto[cartas]['Titulo']}
            Escritura={objeto[cartas]['Escritura']} id={'carta' + contador}/>
            array.push(elemento);
            contador++;
        }

        this.setState({lasCartas: array.reverse()});
        this.posicionamiento(array);
    }

    traerCartas = ()=>{
        var url = 'http://localhost:8080/traerCartas'
        var connexion = new XMLHttpRequest();
        connexion.open('POST', url, true);
        connexion.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        connexion.send();
    
        connexion.onreadystatechange = ()=>{
          if(connexion.readyState == 4 && connexion.status !== 404)
          {
            this.formarCartas(JSON.parse(connexion.responseText))
          }
        }
      }
    
      constructor(props)
      {
        super(props)
        this.traerCartas = this.traerCartas.bind(this);
        this.formarCartas = this.formarCartas.bind(this);
        this.posicionamiento = this.posicionamiento.bind(this);
        this.state = {lasCartas: ""}
        
      }

      render()
      {
          return(
              <ul id='contenedorCartas'>
                {this.state.lasCartas}
              </ul>
          )
      }
      componentDidMount()
      {
          this.traerCartas();
      }
}