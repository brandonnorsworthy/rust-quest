import React from 'react';

interface MenuButtonProps {
  onClick?: () => void;
  text: string;
}

const MenuButton: React.FC<MenuButtonProps> = (props) => {
  return (
    <button
      className="text-5xl font-bold md:text-4xl text-white/50 hover:text-white font-roboto disabled:text-white/20"
      onClick={props.onClick}
      disabled={!props.onClick}
    >
      {props.text.toUpperCase()}
    </button>
  );
};

export default MenuButton;