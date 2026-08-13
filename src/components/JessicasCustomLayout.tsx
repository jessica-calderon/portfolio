import React, { useMemo } from 'react';
import profilePic from '../assets/8bitme.png';
import AboutMe from './AboutMe';
import Education from './Education';
import CaseStudiesGrid from './CaseStudiesGrid';
import LearningWall from './LearningWall';
import ContactSection from './ContactSection';
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
  /** When true, use authored myspace pink/purple; visitor advanced uses token styling. */
  authored: boolean;
  layoutTemplate?: LayoutTemplate;
  navPlacement?: NavPlacement;
  sectionEmphasis?: SectionEmphasis;
}

/**
 * DIV-overlay composition for Jessica's Custom (and visitor Advanced layouts).
 * Shares the same content components/data as Default — different presentation only.
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

  const sections = useMemo(() => {
    const featured = (
      <section key="featured" id="projects" className="jdiv-section jdiv-featured">
        <div className="jdiv-section-head">★ FEATURED WORK ★</div>
        <p className="jdiv-blurb">Jessica&apos;s Top 8 — Featured Case Studies</p>
        <CaseStudiesGrid isMyspaceMode searchQuery={searchQuery} />
      </section>
    );

    const currently = (
      <section key="currently" className="jdiv-section jdiv-currently">
        <div className="jdiv-section-head">CURRENTLY</div>
        <ul className="jdiv-currently-list">
          {CURRENTLY_FOCUS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    );

    const lab = (
      <section key="lab" id="lab" className="jdiv-section jdiv-lab">
        <div className="jdiv-section-head">THE LAB</div>
        <p className="jdiv-blurb">Homelab / self-hosting — tinkering without the private IPs.</p>
        <div className="jdiv-lab-grid">
          {LAB_INTERESTS.map((item) => (
            <span key={item.name} className="jdiv-lab-chip">
              <span aria-hidden="true">{item.icon}</span> {item.name}
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

    const stack = (
      <section key="stack" id="tech" className="jdiv-section jdiv-stack">
        <div className="jdiv-section-head">STACK</div>
        <div className="jdiv-stack-dense">
          {SKILL_CATEGORIES.map((cat) => (
            <p key={cat.label} className="jdiv-stack-line">
              {cat.tokens.join(' // ')}
            </p>
          ))}
        </div>
      </section>
    );

    const about = (
      <section key="about" id="about" className="jdiv-section">
        <div className="jdiv-section-head">ABOUT</div>
        <AboutMe isMyspaceMode searchQuery={searchQuery} />
      </section>
    );

    const experience = (
      <section key="edu" className="jdiv-section">
        <div className="jdiv-section-head">EXPERIENCE / EDUCATION</div>
        <Education searchQuery={searchQuery} isMyspaceMode />
      </section>
    );

    const comments = (
      <section key="comments" id="experience" className="jdiv-section">
        <div className="jdiv-section-head">COMMENTS / LEARNING</div>
        <LearningWall isMyspaceMode searchQuery={searchQuery} />
      </section>
    );

    const contact = (
      <section key="contact" className="jdiv-section jdiv-contact">
        <div className="jdiv-section-head">CONTACT</div>
        <ContactSection
          onSendMessageClick={() => open('aim')}
          onResumeClick={() => open('resume')}
          onShareClick={handleShareClick}
          onFavoritesClick={() => open('favorites')}
          onRatingClick={() => open('rating')}
          onCustomizeClick={() => openBuilder('jessicas-custom')}
        />
      </section>
    );

    const ordered: React.ReactNode[] = [];
    if (sectionEmphasis === 'lab-first') {
      ordered.push(currently, lab, featured, stack, about, experience, comments, contact);
    } else if (sectionEmphasis === 'identity-first') {
      ordered.push(currently, about, featured, stack, lab, experience, comments, contact);
    } else {
      ordered.push(currently, featured, lab, stack, about, experience, comments, contact);
    }
    return ordered;
  }, [searchQuery, sectionEmphasis, open, openBuilder]);

  const nav = (
    <nav className="jdiv-nav" aria-label="Custom profile navigation">
      {CUSTOM_NAV_ITEMS.map((item, i) => (
        <React.Fragment key={item.label}>
          {i > 0 && <span className="jdiv-nav-sep" aria-hidden="true"> // </span>}
          <button type="button" className="jdiv-nav-link" onClick={() => handleNav(item)}>
            {item.label}
          </button>
        </React.Fragment>
      ))}
    </nav>
  );

  const metaBlock = (
    <div className="jdiv-meta">
      <img
        src={profilePic}
        alt="Jessica Calderon pixel avatar"
        className="jdiv-avatar"
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
      <div className="jdiv-meta-text">
        <p className="jdiv-meta-name">{PROFILE_IDENTITY.formalName}</p>
        <p>{PROFILE_IDENTITY.title}</p>
        <p>{PROFILE_IDENTITY.location}</p>
        <p>Status: {PROFILE_IDENTITY.status}</p>
        <p>Last Login: {lastLogin || '...'}</p>
        {profileViews !== null && (
          <p>Profile Views: {formatProfileViews(profileViews)}</p>
        )}
      </div>
    </div>
  );

  const masthead = (
    <header className={`jdiv-masthead jdiv-masthead--${layoutTemplate}`}>
      <div className="jdiv-stars" aria-hidden="true">
        ★ · ✦ · ★ · ✧ · ★
      </div>
      <h1 className="jdiv-name">{PROFILE_IDENTITY.displayName.toUpperCase()}</h1>
      <p className="jdiv-title">{PROFILE_IDENTITY.titleLine}</p>
      <p className="jdiv-tagline">{PROFILE_IDENTITY.tagline}</p>
      {layoutTemplate !== 'sidebar' && navPlacement === 'top' && nav}
      {layoutTemplate === 'graphic-header' && (
        <div className="jdiv-graphic-bar" aria-hidden="true">
          ▓▒░ CUSTOM LAYOUT ░▒▓
        </div>
      )}
      {(layoutTemplate === 'full-div' || layoutTemplate === 'graphic-header') && metaBlock}
    </header>
  );

  const sidebarIdentity =
    navPlacement === 'sidebar' || layoutTemplate === 'sidebar' ? (
      <aside className="jdiv-sidebar">
        {metaBlock}
        {nav}
        <div className="jdiv-sidebar-deco" aria-hidden="true">
          ♥ · ★ · ♥
        </div>
      </aside>
    ) : null;

  return (
    <div
      className={`jessica-div-layout jessica-div-layout--${layoutTemplate}${
        isDarkMode && authored ? ' jessica-div-layout--dark' : ''
      }`}
      data-template={layoutTemplate}
      data-nav={navPlacement}
    >
      {layoutTemplate === 'classic-override' ? (
        <div className="jdiv-classic">
          {masthead}
          <div className="jdiv-classic-grid">
            <div className="jdiv-classic-side">
              {metaBlock}
              {navPlacement === 'sidebar' ? nav : null}
            </div>
            <div className="jdiv-classic-main">{sections}</div>
          </div>
        </div>
      ) : (
        <div className={`jdiv-shell${sidebarIdentity ? ' jdiv-shell--with-sidebar' : ''}`}>
          {layoutTemplate !== 'sidebar' && masthead}
          {layoutTemplate === 'sidebar' && (
            <header className="jdiv-masthead jdiv-masthead--compact">
              <h1 className="jdiv-name">{PROFILE_IDENTITY.displayName.toUpperCase()}</h1>
              <p className="jdiv-title">{PROFILE_IDENTITY.titleLine}</p>
            </header>
          )}
          <div className="jdiv-body">
            {sidebarIdentity}
            <main className="jdiv-main">{sections}</main>
          </div>
        </div>
      )}
    </div>
  );
};

export default JessicasCustomLayout;
