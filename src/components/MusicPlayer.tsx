import React from 'react';

interface MusicPlayerProps {
  headerColor: string;
  isMyspaceMode?: boolean;
  isDarkMode?: boolean;
}

/**
 * Decorative non-playing mid-2000s MySpace/Flash music widget.
 * Intentionally cramped and obsolete-looking. No audio.
 */
const MusicPlayer: React.FC<MusicPlayerProps> = ({
  headerColor,
  isMyspaceMode = false,
  isDarkMode = false,
}) => {
  const skinClass = [
    'myspace-flash-player',
    isMyspaceMode ? 'myspace-flash-player--custom' : '',
    isDarkMode ? 'myspace-flash-player--dark' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="myspace-flash-player-wrap">
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
        className={skinClass}
        role="img"
        aria-label="Decorative MySpace-style music player. No audio is playing. Track: Jessica.exe — deploy_final_v7_REAL_final."
      >
        {/* Entire chrome is decorative */}
        <div className="myspace-flash-player__chrome" aria-hidden="true">
          <div className="myspace-flash-player__lcd">
            <div className="myspace-flash-player__lcd-label">Now Playing</div>
            <div className="myspace-flash-player__artist">Jessica.exe</div>
            <div className="myspace-flash-player__track">deploy_final_v7_REAL_final</div>
          </div>

          <div className="myspace-flash-player__controls">
            <span className="myspace-flash-player__btn">◀</span>
            <span className="myspace-flash-player__btn myspace-flash-player__btn--play">▶</span>
            <span className="myspace-flash-player__btn">❚❚</span>
            <span className="myspace-flash-player__btn">■</span>
            <div className="myspace-flash-player__progress">
              <div className="myspace-flash-player__progress-fill" />
            </div>
            <span className="myspace-flash-player__time">1:47 / 3:33</span>
          </div>

          <div className="myspace-flash-player__links">
            <span>Add</span>
            <span>|</span>
            <span>Playlist</span>
            <span>|</span>
            <span>Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
