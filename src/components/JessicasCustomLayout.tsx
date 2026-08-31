import React from 'react';
import profilePic from '../assets/8bitme.png';
import PixelSprite from './shared/PixelSprite';
import AboutMe from './AboutMe';
import Education from './Education';
import CaseStudiesGrid from './CaseStudiesGrid';
import LearningWall from './LearningWall';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useOsWindow } from '../contexts/OsWindowContext';
import { useProfileTheme } from '../contexts/ProfileThemeContext';
import { useLastLoginLabel } from '../hooks/useLastLoginLabel';
import { formatProfileViews, useProfileViews } from '../hooks/useProfileViews';
import { tryNativeShare } from './ShareProfileModal';
import { PROFILE_URL } from '../constants/urls';
import {
  CURRENTLY_FOCUS,
  CUSTOM_NAV_ITEMS,
  LAB_INTERESTS,
  PROFILE_IDENTITY,
} from '../data/profileMeta';
import { SKILL_CATEGORIES } from '../data/skills';
import type {
  LayoutTemplate,
  NavPlacement,
  SectionEmphasis,
} from '../themes/layoutSchema';

interface JessicasCustomLayoutProps {
  searchQuery: string;
  onNavScroll: (scrollToId: string) => void;
  /** Authored Jessica's Custom gets the flagship asymmetric DIV overlay. */
  authored: boolean;
  layoutTemplate?: LayoutTemplate;
  navPlacement?: NavPlacement;
  sectionEmphasis?: SectionEmphasis;
}

/**
 * DIV-overlay composition for Jessica's Custom (and visitor Advanced layouts).
 * Authored mode: asymmetric masthead + dense sidebar + dominant main column.
 * Visitor advanced: safer structural templates without overwriting Jessica's theme.
 */
const JessicasCustomLayout: React.FC<JessicasCustomLayoutProps> = ({
  searchQuery,
  onNavScroll,
  authored,
  layoutTemplate = 'full-div',
  navPlacement = 'top',
  sectionEmphasis = 'feature-first',
}) => {
  const { isDarkMode } = useDarkMode();
  const { open } = useOsWindow();
  const { openBuilder } = useProfileTheme();
  const lastLogin = useLastLoginLabel();
  const profileViews = useProfileViews();
  const handleShareClick = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : PROFILE_URL;
    const result = await tryNativeShare(url);
    if (result === 'shared' || result === 'aborted') return;
    open('share');
  };

  const handleNav = (item: (typeof CUSTOM_NAV_ITEMS)[number]) => {
    if (item.isModal) {
      open('resume');
      return;
    }
    onNavScroll(item.scrollToId);
  };

  const nav = (
    <nav className="jdiv-nav" aria-label="Custom profile navigation">
      {CUSTOM_NAV_ITEMS.map((item, i) => (
        <React.Fragment key={item.label}>
          {i > 0 && (
            <span className="jdiv-nav-sep" aria-hidden="true">
              {' '}
              //{' '}
            </span>
          )}
          <button type="button" className="jdiv-nav-link" onClick={() => handleNav(item)}>
            {item.label}
          </button>
        </React.Fragment>
      ))}
    </nav>
  );

  const masthead = (
    <header className="jdiv-masthead">
      <div className="jdiv-stars" aria-hidden="true">
        ★ · ✦ · ★ · ✧ · ★ · ✦ · ★
      </div>
      <h1 className="jdiv-name">{PROFILE_IDENTITY.displayName.toUpperCase()}</h1>
      <p className="jdiv-title">{PROFILE_IDENTITY.titleLine}</p>
      <p className="jdiv-tagline">{PROFILE_IDENTITY.tagline}</p>
      {nav}
      <p className="jdiv-masthead-remnant" aria-hidden="true">
        · custom CSS layout · tables optional · glitter not included ·
      </p>
    </header>
  );

  const sidebar = (
    <aside className="jdiv-sidebar" aria-label="Profile identity">
      <div className="jdiv-id-card">
        <img
          src={profilePic}
          alt="Jessica Calderon pixel avatar"
          className="jdiv-avatar jdiv-avatar--lg"
          role="button"
          tabIndex={0}
          title="Click for a surprise! 🦖"
          onClick={() => open('legacyIe')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              open('legacyIe');
            }
          }}
          aria-label="View legacy profile"
        />
        <p className="jdiv-meta-name">{PROFILE_IDENTITY.formalName}</p>
        <p className="jdiv-id-title">{PROFILE_IDENTITY.title}</p>
        <p className="jdiv-online">
          <span className="jdiv-online-dot" aria-hidden="true" /> Online
        </p>
        <p className="jdiv-id-line">
          <strong>Status:</strong> {PROFILE_IDENTITY.status}
        </p>
        <p className="jdiv-id-line">Last Login: {lastLogin || '...'}</p>
        {profileViews !== null && (
          <p className="jdiv-id-line">Profile Views: {formatProfileViews(profileViews)}</p>
        )}
        <p className="jdiv-id-line">{PROFILE_IDENTITY.location}</p>
        <button
          type="button"
          className="jdiv-text-link"
          onClick={() => open('legacyIe')}
          aria-haspopup="dialog"
        >
          View My: Legacy Profile
        </button>
      </div>

      <div className="jdiv-side-block jdiv-side-currently">
        <div className="jdiv-side-head">Currently</div>
        <ul className="jdiv-currently-list">
          {CURRENTLY_FOCUS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="jdiv-side-block jdiv-side-contact" id="contact">
        <div className="jdiv-side-head">Contacting Jessica</div>
        <div className="jdiv-contact-grid">
          <button
            type="button"
            className="jdiv-contact-action"
            onClick={() => open('aim')}
            aria-label="Send message to Jessica Calderon"
            aria-haspopup="dialog"
          >
            <span className="jdiv-contact-icon" aria-hidden="true">
              ✉
            </span>
            <span className="jdiv-contact-label">Send Message</span>
          </button>
          <button
            type="button"
            className="jdiv-contact-action"
            onClick={() => open('addNetwork')}
            aria-label="Add Jessica to professional network"
            aria-haspopup="dialog"
          >
            <span className="jdiv-contact-icon" aria-hidden="true">
              👥
            </span>
            <span className="jdiv-contact-label">Connect</span>
          </button>
          <button
            type="button"
            className="jdiv-contact-action"
            onClick={() => open('scheduleCall')}
            aria-label="Schedule a call"
            aria-haspopup="dialog"
          >
            <span className="jdiv-contact-icon" aria-hidden="true">
              💬
            </span>
            <span className="jdiv-contact-label">Schedule Call</span>
          </button>
          <button
            type="button"
            className="jdiv-contact-action"
            onClick={() => open('resume')}
            aria-label="View resume"
            aria-haspopup="dialog"
          >
            <span className="jdiv-contact-icon" aria-hidden="true">
              📄
            </span>
            <span className="jdiv-contact-label">View Resume</span>
          </button>
          <button
            type="button"
            className="jdiv-contact-action"
            onClick={handleShareClick}
            aria-label="Share profile"
            aria-haspopup="dialog"
          >
            <span className="jdiv-contact-icon" aria-hidden="true">
              ↗
            </span>
            <span className="jdiv-contact-label">Share Profile</span>
          </button>
          <button
            type="button"
            className="jdiv-contact-action"
            onClick={() => open('saveContact')}
            aria-label="Save contact as vCard"
            aria-haspopup="dialog"
          >
            <span className="jdiv-contact-icon" aria-hidden="true">
              📇
            </span>
            <span className="jdiv-contact-label">Save Contact</span>
          </button>
        </div>
        <div className="jdiv-contact-meta">
          <button
            type="button"
            className="jdiv-contact-action jdiv-contact-action--meta"
            onClick={() => openBuilder('jessicas-custom')}
            aria-label="Build your own layout"
          >
            <span className="jdiv-contact-icon" aria-hidden="true">
              🎨
            </span>
            <span className="jdiv-contact-label">Customize Profile</span>
          </button>
        </div>
      </div>

      <div className="jdiv-side-block jdiv-side-stack" id="tech">
        <div className="jdiv-side-head">Stack</div>
        <div className="jdiv-stack-dense">
          {SKILL_CATEGORIES.slice(0, 5).map((cat) => (
            <p key={cat.label} className="jdiv-stack-line">
              {cat.tokens.slice(0, 5).join(' // ')}
            </p>
          ))}
        </div>
      </div>

      <div className="jdiv-sidebar-deco" aria-hidden="true">
        ♥ · ★ · ♥ · ★ · ♥
      </div>
    </aside>
  );

  const networkBanner = (
    <div className="jdiv-network-banner" role="note">
      Jessica Calderon is in your extended professional network.
    </div>
  );

  const featured = (
    <section id="projects" className="jdiv-panel jdiv-featured">
      <div className="jdiv-featured-head">
        <span className="jdiv-featured-title">Jessica&apos;s Featured Work</span>
        <span className="jdiv-featured-sub">★ Top 8 Case Studies ★</span>
      </div>
      <CaseStudiesGrid isMyspaceMode embedded searchQuery={searchQuery} />
    </section>
  );

  const lab = (
    <section id="lab" className="jdiv-panel jdiv-lab">
      <div className="jdiv-lab-head">
        <span className="jdiv-lab-prompt" aria-hidden="true">
          ~/lab
        </span>
        <span>THE LAB</span>
        <span className="jdiv-lab-prompt" aria-hidden="true">
          self-hosted
        </span>
      </div>
      <p className="jdiv-lab-blurb">
        Homelab / self-hosting — Linux, containers, networking, storage, media, automation.
        No private IPs. No secrets. Just the tinkering side.
      </p>
      <div className="jdiv-lab-grid">
        {LAB_INTERESTS.map((item) => (
          <span key={item.name} className="jdiv-lab-chip">
            <span aria-hidden="true"><PixelSprite type={item.sprite} size={14} /></span> {item.name}
          </span>
        ))}
      </div>
      <button
        type="button"
        className="jdiv-lab-btn"
        onClick={() => open('networkPlaces')}
        aria-haspopup="dialog"
      >
        View Homelab → My Network Places
      </button>
    </section>
  );

  const about = (
    <section id="about" className="jdiv-panel jdiv-about">
      <div className="jdiv-about-head">About Me</div>
      <AboutMe isMyspaceMode embedded searchQuery={searchQuery} />
    </section>
  );

  const experienceEdu = (
    <section className="jdiv-panel jdiv-edu">
      <div className="jdiv-edu-head">Experience / Education</div>
      <Education searchQuery={searchQuery} isMyspaceMode embedded />
    </section>
  );

  const comments = (
    <section id="experience" className="jdiv-panel jdiv-comments">
      <LearningWall isMyspaceMode searchQuery={searchQuery} />
    </section>
  );

  const stackWide = (
    <section className="jdiv-panel jdiv-stack-wide">
      <div className="jdiv-side-head">Full Stack Dump</div>
      <div className="jdiv-stack-dense">
        {SKILL_CATEGORIES.map((cat) => (
          <p key={cat.label} className="jdiv-stack-line">
            <span className="jdiv-stack-label">{cat.label}:</span> {cat.tokens.join(' // ')}
          </p>
        ))}
      </div>
    </section>
  );

  // Authored Jessica's Custom: fixed asymmetric hierarchy
  if (authored) {
    return (
      <div
        className={`jessica-div-layout jessica-div-layout--authored${
          isDarkMode ? ' jessica-div-layout--dark' : ''
        }`}
        data-template="authored-div"
      >
        {masthead}
        <div className="jdiv-authored-grid">
          {sidebar}
          <main className="jdiv-main">
            {networkBanner}
            {featured}
            {lab}
            {about}
            {stackWide}
            {experienceEdu}
            {comments}
          </main>
        </div>

        {/* Mobile-only identity strip order helpers are CSS-driven; sidebar also appears in flow */}
      </div>
    );
  }

  // Visitor Advanced: structural templates (not Jessica's immutable Custom)
  const visitorMain =
    sectionEmphasis === 'lab-first'
      ? [lab, featured, about, stackWide, experienceEdu, comments]
      : sectionEmphasis === 'identity-first'
        ? [about, featured, lab, stackWide, experienceEdu, comments]
        : [featured, lab, about, stackWide, experienceEdu, comments];

  const showSideNav = navPlacement === 'sidebar' || layoutTemplate === 'sidebar';

  return (
    <div
      className={`jessica-div-layout jessica-div-layout--${layoutTemplate}`}
      data-template={layoutTemplate}
      data-nav={navPlacement}
    >
      {masthead}
      <div className={`jdiv-authored-grid${showSideNav ? '' : ' jdiv-authored-grid--single'}`}>
        {showSideNav ? sidebar : null}
        <main className="jdiv-main">
          {!showSideNav && (
            <div className="jdiv-visitor-meta-row">{networkBanner}</div>
          )}
          {visitorMain}
        </main>
      </div>
    </div>
  );
};

export default JessicasCustomLayout;
