const TYPE_KEYS = {
  'alphabet': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'index': '0123456789|',
  'binary': '01|',
  'ternary': '012|',
  'morse': '.-|',
}

export default function Keyboard({ type, handleKey }) {
  if (!(type in TYPE_KEYS)) return null;
  const keyboardElements = TYPE_KEYS[type].split('').map(x => (
    <button key={x} onClick={() => handleKey(x)}>
      {x}
    </button>
  ));
  return (
    <div className={`keyboard ${type}`}>
      {keyboardElements}
    </div>
  );
}
