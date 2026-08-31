import React, { useState } from 'react';
import { useXpWindowBehavior } from '../hooks/useXpWindowBehavior';
import PixelSprite, { SpriteType } from './shared/PixelSprite';

interface NetworkPlace {
  id: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  sprite: SpriteType;
}

const NETWORK_PLACES: NetworkPlace[] = [
  {
    id: 'media',
    name: 'Media Server',
    category: 'Media',
    description: 'Jellyfin and related media services for personal streaming and library management.',
    technologies: ['Jellyfin', 'Tdarr', 'Radarr', 'Sonarr', 'Prowlarr'],
    sprite: 'film',
  },
  {
    id: 'docker',
    name: 'Docker Services',
    category: 'Containers',
    description: 'Containerized self-hosted applications orchestrated for learning and day-to-day use.',
    technologies: ['Docker', 'Docker Compose', 'Portainer'],
    sprite: 'docker',
  },
  {
    id: 'monitoring',
    name: 'Monitoring',
    category: 'Observability',
    description: 'Service availability checks and lightweight monitoring of the homelab stack.',
    technologies: ['Uptime Kuma'],
    sprite: 'antenna',
  },
  {
    id: 'automation',
    name: 'Automation',
    category: 'Automation',
    description: 'Media and service automation that keeps the lab tidy without babysitting every job.',
    technologies: ['Radarr', 'Sonarr', 'Prowlarr', 'Tdarr'],
    sprite: 'gear',
  },
  {
    id: 'storage',
    name: 'Storage',
    category: 'Storage',
    description: 'Linux storage and pooled volumes for media and application data.',
    technologies: ['Linux', 'MergerFS'],
    sprite: 'floppy',
  },
  {
    id: 'network',
    name: 'Network Services',
    category: 'Networking',
    description: 'Reverse proxying and internal service routing for self-hosted apps.',
    technologies: ['Traefik', 'Linux'],
    sprite: 'globe',
  },
];

interface MyNetworkPlacesWindowProps {
  onClose: () => void;
}

/**
 * Conceptual Homelab explorer — no real hosts, IPs, ports, or secrets.
 */
const MyNetworkPlacesWindow: React.FC<MyNetworkPlacesWindowProps> = ({ onClose }) => {
  const { dialogRef, handleBackdropClick } = useXpWindowBehavior({ onClose });
  const [selectedId, setSelectedId] = useState<string>(NETWORK_PLACES[0].id);
  const selected = NETWORK_PLACES.find((p) => p.id === selectedId) ?? NETWORK_PLACES[0];

  return (
    <div
      className="xp-window net-window modal-overlay z-[60] bg-black bg-opacity-50 animate-fadeIn motion-reduce:animate-none"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="net-window-title"
      id="my-network-places-window"
      ref={dialogRef}
      tabIndex={-1}
    >
      <div
        className="xp-shell net-shell modal-window--app animate-modalAppear motion-reduce:animate-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="xp-titlebar modal-window__chrome flex items-center justify-between px-2 py-1.5 select-none">
          <div className="flex min-w-0 items-center gap-1.5">
            <span aria-hidden="true"><PixelSprite type="server" size={16} /></span>
            <span id="net-window-title" className="xp-titlebar-text truncate text-xs font-bold sm:text-sm">
              My Network Places
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="xp-close flex h-6 w-6 shrink-0 items-center justify-center text-xs font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#1a4aa5]"
            aria-label="Close My Network Places"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="net-toolbar modal-window__chrome" aria-hidden="true">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Favorites</span>
          <span>Tools</span>
          <span>Help</span>
        </div>

        <div className="net-body modal-window__body">
          <aside className="net-pane" aria-label="Network Places tasks">
            <p className="net-pane-heading">Network Tasks</p>
            <ul className="net-pane-list">
              <li>View network connections</li>
              <li>Add a network place</li>
              <li>View workgroup computers</li>
            </ul>
            <p className="net-pane-heading mt-3">Other Places</p>
            <ul className="net-pane-list">
              <li>Jessica&apos;s Homelab</li>
              <li>My Documents</li>
              <li>My Computer</li>
            </ul>
            <p className="net-pane-note">
              Conceptual map only — no live hosts, IPs, ports, or credentials are exposed.
            </p>
          </aside>

          <div className="net-main">
            <p className="net-path">Homelab \ Self-Hosted Infrastructure</p>
            <ul className="net-grid" role="listbox" aria-label="Homelab places">
              {NETWORK_PLACES.map((place) => (
                <li key={place.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={place.id === selectedId}
                    className={`net-icon-btn${place.id === selectedId ? ' net-icon-btn--selected' : ''}`}
                    onClick={() => setSelectedId(place.id)}
                  >
                    <span className="net-icon" aria-hidden="true">
                      <PixelSprite type={place.sprite} size={24} />
                    </span>
                    <span className="net-icon-label">{place.name}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="net-details" aria-live="polite">
              <h3 className="net-details-title">{selected.name}</h3>
              <p className="net-details-cat">{selected.category}</p>
              <p className="net-details-desc">{selected.description}</p>
              <p className="net-details-tech">
                <span className="font-bold">Technologies: </span>
                {selected.technologies.join(', ')}
              </p>
            </div>
          </div>
        </div>

        <div className="xp-statusbar modal-window__chrome" role="status">
          <span>{NETWORK_PLACES.length} objects</span>
          <span className="xp-muted">My Network Places</span>
        </div>
      </div>
    </div>
  );
};

export default MyNetworkPlacesWindow;
