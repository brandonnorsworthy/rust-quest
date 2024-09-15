import React from "react";
import Button from "../Button";

type ConfirmDialogProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ onCancel, onConfirm }) => {
  return (
    <div>
      ConfirmDialog
      <div>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          type="confirm"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDialog;