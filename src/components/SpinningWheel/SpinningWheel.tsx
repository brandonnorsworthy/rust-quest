import React, { useEffect, useRef } from "react";

// interface Wedge {
//   label: string;
//   color: string;
// }

interface SpinningWheelProps {
  // wedges: Wedge[];
  size?: number; // Optional size of the wheel
  onDoneSpinning: () => void;
  onClick?: () => void;
}

const wedges = [
  { label: "raid", color: "red" },
  { label: "monument", color: "yellow" },
  { label: "pvp", color: "green" },
  { label: "monument", color: "yellow" },
  { label: "pve", color: "blue" },
  { label: "monument", color: "yellow" },
  { label: "pvp", color: "green" },
  { label: "monument", color: "yellow" },
  { label: "roleplay", color: "purple" },
  { label: "monument", color: "yellow" },
  { label: "pvp", color: "green" },
  { label: "monument", color: "yellow" },
  { label: "pve", color: "blue" },
  { label: "monument", color: "yellow" },
  { label: "pve", color: "blue" },
  { label: "pvp", color: "green" },
  { label: "monument", color: "yellow" },
  { label: "roleplay", color: "purple" },
  { label: "monument", color: "yellow" },
  { label: "pvp", color: "green" },
  { label: "monument", color: "yellow" },
  { label: "pve", color: "blue" },
  { label: "monument", color: "yellow" },
  { label: "pvp", color: "green" },
  { label: "monument", color: "yellow" },
]

const SpinningWheel: React.FC<SpinningWheelProps> = ({ size = 500, onDoneSpinning, onClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let rotation = 0;
    let velocity = 0;  // Spin velocity
    const maxVelocity = 0.025;  // Maximum spin velocity
    const acceleration = 1.000 + (Math.random() * 0.001);  // How fast the wheel ramps up
    const deceleration = 0.999;  // How fast the wheel slows down
    let spinning = false;  // Whether the wheel is currently spinning
    let phase = 'stopped';

    // Draw the wheel
    const drawWheel = (ctx: CanvasRenderingContext2D) => {
      const numWedges = wedges.length;
      const arcSize = (2 * Math.PI) / numWedges;
      const borderWidth = 5;

      wedges.forEach((wedge, i) => {
        const angle = i * arcSize;

        // Draw wedge
        ctx.beginPath();
        ctx.moveTo(size / 2, size / 2);
        ctx.arc(size / 2, size / 2, size / 2, angle, angle + arcSize, false);
        ctx.fillStyle = wedge.color;
        ctx.fill();

        // Add border around each wedge
        ctx.lineWidth = 3; // Adjust the thickness of the wedge border
        ctx.strokeStyle = "black"; // Set the border color for wedges
        ctx.stroke(); // Draw the border

        // Draw text
        ctx.save();
        ctx.translate(size / 2, size / 2);
        ctx.rotate(angle + arcSize / 2);
        ctx.textAlign = "center";
        ctx.fillStyle = "black"; // Text color
        ctx.font = "16px Arial";
        ctx.fillText(wedge.label, size / 2.5, 10);
        ctx.restore();
      });

      // Add a border around the wheel
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI, false);
      ctx.lineWidth = borderWidth; // Set the border thickness (adjust this as needed)
      ctx.strokeStyle = "black"; // Set the border color
      ctx.stroke(); // Draw the border

      // Draw the middle circle
      const centerX = size / 2;
      const centerY = size / 2;
      const centerRadius = size / 4; // Adjust the size of the middle circle

      ctx.beginPath();
      ctx.arc(centerX, centerY, centerRadius, 0, 2 * Math.PI, false);
      ctx.fillStyle = "gray"; // Color of the middle circle
      ctx.fill();
    };

    // Animation frame to handle spinning
    const updateRotation = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Clear the canvas and re-draw the wheel
          ctx.clearRect(0, 0, size, size);
          ctx.save();
          ctx.translate(size / 2, size / 2);
          ctx.rotate(rotation);  // Apply current rotation
          ctx.translate(-size / 2, -size / 2);
          drawWheel(ctx);
          ctx.restore();
        }
      }

      if (phase === 'accelerating') {
        if (velocity < maxVelocity) {
          if (velocity === 0) {
            velocity = velocity + 0.02;
          }
          velocity = velocity * acceleration;
        } else {
          phase = 'decelerating';
        }
      }

      if (phase === 'decelerating') {
        if (velocity > 0.02) {
          velocity = velocity * deceleration;
        } else if (velocity > 0.001) {
          const fastDeceleration = 3;
          velocity = velocity * (1 - ((1 - deceleration) * fastDeceleration));
        } else {
          phase = 'stopped';
          spinning = false;
          velocity = 0;
          setTimeout(() => onDoneSpinning(), 2000);
        }
      }

      if (spinning) {
        rotation = rotation + (velocity);
        requestAnimationFrame(updateRotation);  // Continue the animation loop
      }
    };

    spinning = true;
    phase = 'accelerating';
    updateRotation();
  }, [onDoneSpinning, size]);

  return (
    <div className="text-white" onClick={onClick}>
      <canvas ref={canvasRef} width={size} height={size} />
    </div>
  );
};

export default SpinningWheel;
