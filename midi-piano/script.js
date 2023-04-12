const audio = new AudioContext();

const NOTE_DETAILS = [
  { note: "C", key: "Z", frequency: 261.626, active: false },
  { note: "Db", key: "S", frequency: 277.183, active: false },
  { note: "D", key: "X", frequency: 293.665, active: false },
  { note: "Eb", key: "D", frequency: 311.127, active: false },
  { note: "E", key: "C", frequency: 329.628, active: false },
  { note: "F", key: "V", frequency: 349.228, active: false },
  { note: "Gb", key: "G", frequency: 369.994, active: false },
  { note: "G", key: "B", frequency: 391.995, active: false },
  { note: "Ab", key: "H", frequency: 415.305, active: false },
  { note: "A", key: "N", frequency: 440, active: false },
  { note: "Bb", key: "J", frequency: 466.164, active: false },
  { note: "B", key: "M", frequency: 493.883, active: false },
];

document.addEventListener("keydown", function (e) {
  if (e.repeat) return;
  const key = e.code;
  const note = NOTE_DETAILS.find((note) => `Key${note.key}` === key);

  if (note) {
    note.active = true;
    playNotes();
  }
});

document.addEventListener("keyup", function (e) {
  const key = e.code;
  const note = NOTE_DETAILS.find((note) => `Key${note.key}` === key);

  if (note) {
    note.active = false;
    playNotes();
  }
});

function playNotes() {
  NOTE_DETAILS.forEach((note) => {
    const key = document.querySelector(`[data-note="${note.note}"]`);
    key.classList.toggle("active", note.active);
    if (note.oscillator) {
      note.oscillator.stop();
      note.oscillator.disconnect();
    }
  });

  const activeNotes = NOTE_DETAILS.filter((note) => note.active);
  const gain = 1 / activeNotes.length;
  activeNotes.forEach((note) => {
    startNote(note, gain);
  });
}

function startNote(note, gain) {
  const gainNode = audio.createGain();
  gainNode.gain.value = gain;
  const oscillator = audio.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = note.frequency;
  oscillator.connect(gainNode).connect(audio.destination);
  oscillator.start();
  note.oscillator = oscillator;
}
