import React from 'react';

const ThanksPage: React.FC<{ onBack?: () => void }> = ({ onBack }) => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#18181b' }}>
    <h2 style={{ color: '#fff', marginBottom: 24 }}>Thank you for using our service!</h2>
    <button
      style={{ padding: '12px 32px', fontSize: 18, background: 'linear-gradient(90deg, #a78bfa, #06b6d4)', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
      onClick={onBack}
    >
      Thanks
    </button>
  </div>
);

export default ThanksPage;
