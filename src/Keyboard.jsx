const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function Keyboard({ keyType, handleKey }) {
  const keyboardElements = ALPHABETS.split('').map(x => (
    <button key={x} onClick={() => handleKey(x)}>
      {x}
    </button>
  ));
  return (
    <div className="keyboard">
      {keyboardElements}
    </div>
  );
}
