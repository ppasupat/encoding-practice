export default function Braille({ value, setValue }) {
  const toggleButtons = [1, 8, 2, 16, 4, 32].map(position => {
    const isOn = (value.codePointAt(0) - 0x2800) & position,
      valueIfToggled = String.fromCodePoint(
        value.codePointAt(0) + (isOn ? -position : position)
      );
    return (
      <button
        key={position}
        className={isOn ? 'on' : 'off'}
        onClick={() => setValue(valueIfToggled)}
      ></button>
    );
  });
  return <div className="braille-wrapper">{toggleButtons}</div>;
}
