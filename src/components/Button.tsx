import React from 'react';
import '../App.css';

export const Button: React.FC<{
  children: React.ReactNode,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  isLoading: boolean
}> = ({children, onClick, isLoading}) => {
  return isLoading ?
    <button className="Button-loading">
      <span className="Hidden">{children}</span>
    </button> :
    <button onClick={onClick}>
      {children}
    </button>
}