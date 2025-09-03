export const playNotificationSound = () => {
  // Use a Web Audio API oscillator as a fallback sound
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.2);
};