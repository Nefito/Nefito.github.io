import React from 'react';
import './TestButtonComponent.css';

function TestButton({label}){
    return (
        <div>
            <button data-testid="test-buttonID" className="test-button">{label}</button>
        </div>
        );
}
export default TestButton;
