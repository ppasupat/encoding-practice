const SWAPPED_HAND_VALUES = [
  '01', '02', '03', '04', '12', '67'
].map(x => String.fromCodePoint(64 + parseInt(x, 8)));

export default function Semaphore({ value, setValue = null }) {
  const onPositions = [(value.codePointAt(0) >> 3) & 7, value.codePointAt(0) & 7],
    numOnPositions = (onPositions[0] !== 0) + (onPositions[1] !== 0);

  function genSemaphoreImage() {
    const [leftHandPos, rightHandPos] = (
      SWAPPED_HAND_VALUES.includes(value) ?
      [onPositions[1], onPositions[0]]: onPositions),
      leftHandFlip = [0,1,2,3,4].includes(leftHandPos),
      rightHandFlip = [1,2,3].includes(rightHandPos);
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="130" height="120">
        <g transform="translate(65, 45)">
          <circle cx="0" cy="0" r="6" className="person" />
          <rect x="-7" y="8" width="14" height="32" rx="5" className="person" />
        </g>
        <g transform={`translate(54, 57) rotate(${45 * leftHandPos}) scale(${leftHandFlip ? 1 : -1},1)`}>
          <polygon points="1,55 1,35 21,55" fill="red" />
          <polygon points="21,35 1,35 21,55" fill="gold" />
          <rect x="-1" y="0" width="2" height="55" />
          <rect x="-2.5" y="-2.5" width="5" height="20" rx="2" className="person" />
        </g>
        <g transform={`translate(76, 57) rotate(${45 * rightHandPos}) scale(${rightHandFlip ? 1 : -1},1)`}>
          <polygon points="1,55 1,35 21,55" fill="red" />
          <polygon points="21,35 1,35 21,55" fill="gold" />
          <rect x="-1" y="0" width="2" height="55" />
          <rect x="-2.5" y="-2.5" width="5" height="20" rx="2" className="person" />
        </g>
      </svg>
    );
  }

  function genToggleButtons() {
    return [1, 2, 3, 4, 5, 6, 7].map(position => {
      const isOn = (position === onPositions[0] || position === onPositions[1]);
      if (numOnPositions === 2 && !isOn) return null;
      let positionsIfToggled;
      if (isOn) {
        positionsIfToggled = [
          position === onPositions[0] ? 0 : onPositions[0],
          position === onPositions[1] ? 0 : onPositions[1],
        ]
      } else {
        positionsIfToggled = [position, onPositions[1]];
      }
      if (positionsIfToggled[0] > positionsIfToggled[1])
        positionsIfToggled = [positionsIfToggled[1], positionsIfToggled[0]];
      const valueIfToggled = String.fromCodePoint(
        64 + positionsIfToggled[0] * 8 + positionsIfToggled[1]);
      return (
        <button
          key={position}
          className={['flag-' + position, isOn ? 'on' : 'off'].join(' ')}
          onClick={() => setValue(valueIfToggled)}
        ></button>
      );
    });
  }

  return (
    <div className="semaphore-wrapper">
      {genSemaphoreImage()}
      {setValue !== null && genToggleButtons()}
    </div>
  );
}
