import React from 'react';

const WheelSegment = ({ gift, index, segmentAngle, total }) => {
  // Calculate rotation for this segment to position it correctly
  const rotation = index * segmentAngle;
  
  // Calculate gradient direction based on position
  const gradientDirection = `from-${rotation}deg`;
  
  // Extract colors from the gift object
  const { colors } = gift;
  const boxColor = colors.box.split(' ')[1]; // Get the second color from "from-color-X to-color-Y"
  
  // Calculate skew for segments
  const skew = 90 - segmentAngle;
  
  // Create segment style
  const segmentStyle = {
    position: 'absolute',
    width: '50%',
    height: '50%',
    top: '0',
    right: '0',
    transformOrigin: 'bottom left',
    transform: `rotate(${rotation}deg) skew(${skew}deg)`,
    backgroundColor: `var(--tw-${boxColor})`,
    borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
  };
  
  // Style for the text
  const textStyle = {
    position: 'absolute',
    left: '25%',
    top: '25%',
    transform: `rotate(${rotation + segmentAngle/2}deg) translate(-50%, -50%)`,
    transformOrigin: 'right bottom',
    color: 'white',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
    fontSize: segmentAngle < 45 ? '10px' : '12px',
    maxWidth: '60px',
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  return (
    <>
      <div style={segmentStyle} className={`${colors.box}`}>
        <div className="w-full h-full bg-white/10" />
      </div>
      <div style={textStyle} className="pointer-events-none">
        {gift.name}
      </div>
    </>
  );
};

export default WheelSegment;