import React, { Children } from 'react'
import './card.css'
import { useNavigate } from 'react-router-dom';

export default function Card({ id, name, type, ability, height, weight, img, children }) {
    const navigate = useNavigate();

    function goTo() {
        navigate(`../pokemon/${id}`);
    }

    return (
        <div className='card-container'>
            <img src={img} alt={`Imagem do ${name}`} />

            <div className='card-content'>
                <h2  onClick={() => { goTo() }}>{name}, Nº{id}</h2>
                <div>
                    <p><strong>Tipo:</strong> {type}</p>
                    <p><strong>Habilidade:</strong> {ability}</p>
                    <p><strong>Altura:</strong> {height} m</p>
                    <p><strong>Peso:</strong> {weight} kg</p>
                </div>

                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}
