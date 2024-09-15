import React, { useEffect, useRef } from "react";
import Button from "../Button";

type ConfirmDialogProps = {
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ title, description, onCancel, onConfirm }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div ref={dialogRef} className="p-2 bg-secondary max-h-[90dvh] shadow-lg">
        <div className="max-w-full m-0 h-full max-h-[85dvh] overflow-y-auto sm:m-2 md:m-0  md:max-w-[42rem] text-text scrollbar-modern">
          <div className="w-full md:w-[24rem] text-text">
            <div className="w-full p-2">
              <h2 className="text-lg font-semibold text-muted-foreground">{title}</h2>
              <p className="text-text-secondary">{description}</p>
            </div>
            <div className="flex justify-between w-full mt-2">
              <Button onClick={onCancel}>
                Cancel
              </Button>
              <Button
                onClick={onConfirm}
                type="cancel"
              >
                yes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;