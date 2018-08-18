import React, { Component } from 'react';

export default class Elementos extends Component
{
    render()
    {
        return(
            <li id={this.props.id} className='cartas' style={{top: this.props.top, 
            left: this.props.left, opacity: this.props.opacity}}>
                <div className={this.props.divClass}>
                    <h1>{this.props.Titulo}</h1>
                    <p>{this.props.Escritura}</p>
                </div>
            </li>
        )
    }
}