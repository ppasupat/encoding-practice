export default function Semaphore({ value, setValue }) {
  const onPositions = [(value.codePointAt(0) >> 3) & 7, value.codePointAt(0) & 7],
    numOnPositions = (onPositions[0] !== 0) + (onPositions[1] !== 0);
  const toggleButtons = [1, 2, 3, 4, 5, 6, 7].map(position => {
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
  return <div className="semaphore-wrapper">{toggleButtons}</div>;
}
