import React from 'react';

interface MenuButtonProps {
  onClick: () => void;
  text: string;
}

const MenuButton: React.FC<MenuButtonProps> = (props) => {
  return (
    <button
      className="text-5xl font-bold md:text-4xl text-white/50 hover:text-white font-roboto"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default MenuButton;