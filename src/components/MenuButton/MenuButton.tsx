import React from 'react';

interface MenuButtonProps {
  onClick?: () => void;
  text: string;
  disabled?: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = (props) => {
  return (
    <button
      className="text-3xl font-bold text-white transition-colors md:text-4xl md:text-white/50 hover:text-white font-roboto disabled:text-white/20"
      onClick={props.onClick}
      disabled={props.disabled || !props.onClick}
    >
      {props.text.toUpperCase()}
    </button>
  );
};

export default MenuButton;