import React, { useState } from 'react';

const TextToMusic: React.FC = () => {
  const [text, setText] = useState('');
  const [musicUrl, setMusicUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateMusic = async () => {
    setLoading(true);
    setError('');
    setMusicUrl(null);
    try {
      // Replace this with your actual API call
      // Example: const response = await fetch('/api/text-to-music', { ... })
      // For now, simulate with a timeout and a placeholder audio
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setMusicUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    } catch (e) {
      setError('Failed to generate music.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Text to Music Generator</h2>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={4}
        style={{ width: '100%', marginBottom: 16 }}
        placeholder="Enter your text here..."
      />
      <button onClick={handleGenerateMusic} disabled={loading || !text.trim()} style={{ padding: '8px 16px' }}>
        {loading ? 'Generating...' : 'Generate Music'}
      </button>
      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      {musicUrl && (
        <div style={{ marginTop: 24 }}>
          <audio controls src={musicUrl} style={{ width: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default TextToMusic;
