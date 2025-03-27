import React from 'react'
import './button.css'







export const Input = (props) => {
    return (
        <label className='label'>
            <span className='language'>en-US</span>
            <input className='toggle-input'
                {...props}
            />
            <div className='slider'>
                <button className='toggle-button' />
            </div>
            <span className='language'>pt-BR</span>
        </label>
    )
}