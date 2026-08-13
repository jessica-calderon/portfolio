import React from 'react';

interface MusicPlayerProps {
  headerColor: string;
  textColor: string;
  mutedColor: string;
  borderColor: string;
}

/**
 * Decorative non-playing MySpace-era music embed.
 * No audio, no interactive controls — pure visual Easter egg.
 */
const MusicPlayer: React.FC<MusicPlayerProps> = ({
  headerColor,
  textColor,
  mutedColor,
  borderColor,
}) => {
  return (
    <div style={{ marginTop: '10px', marginBottom: '12px' }}>
      <h4
        className="font-bold custom-font"
        style={{
          fontSize: '13px',
          marginTop: '10px',
          marginBottom: '6px',
          color: headerColor,
        }}
      >
        Jessica's Music
      </h4>

      <div
        className="custom-font"
        style={{
          border: `1px solid ${borderColor}`,
          background: 'transparent',
          padding: '8px 10px',
          fontSize: '11px',
          color: textColor,
          lineHeight: 1.4,
        }}
        aria-label="Decorative music player. No audio is playing."
      >
        <p style={{ margin: '0 0 4px 0', color: mutedColor }}>Now Playing:</p>
        <p
          className="font-bold"
          style={{
            margin: '0 0 8px 0',
            color: textColor,
            wordBreak: 'break-word',
          }}
        >
          deploy_final_v7_REAL_final.mp3
        </p>

        {/* Decorative controls — hidden from assistive tech */}
        <div
          aria-hidden="true"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: mutedColor,
            fontSize: '12px',
            userSelect: 'none',
          }}
        >
          <span>◀</span>
          <span>▶</span>
          <span>❚❚</span>
          <span>■</span>
          <span
            style={{
              flex: 1,
              height: '8px',
              border: `1px solid ${borderColor}`,
              background: `linear-gradient(to right, ${borderColor} 35%, transparent 35%)`,
              minWidth: '60px',
            }}
          />
          <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>1:47 / 3:33</span>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
