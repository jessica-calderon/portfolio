/** Shared profile identity + custom-layout copy. Presentation differs; data does not. */

export const PROFILE_IDENTITY = {
  displayName: 'Jessica Calderon',
  formalName: 'Jessica Calderon, MBA',
  title: 'Principal Software Engineer / Technical Lead',
  titleLine: 'PRINCIPAL SOFTWARE ENGINEER // TECHNICAL LEAD',
  location: 'San Antonio, Texas',
  pronouns: 'She/Her',
  status: 'Currently coding… (and occasionally breaking things)',
  tagline: 'BUILDING // BREAKING // FIXING // LEADING',
} as const;

export const CUSTOM_NAV_ITEMS = [
  { label: 'ABOUT', scrollToId: 'about', isModal: false },
  { label: 'WORK', scrollToId: 'projects', isModal: false },
  { label: 'STACK', scrollToId: 'tech', isModal: false },
  { label: 'LAB', scrollToId: 'lab', isModal: false },
  { label: 'EXPERIENCE', scrollToId: 'experience', isModal: false },
  { label: 'RESUME', scrollToId: 'resume', isModal: true },
  { label: 'CONTACT', scrollToId: 'contact', isModal: false },
] as const;

/** Compact “Currently” focus areas — high-level, no employer-sensitive detail. */
export const CURRENTLY_FOCUS = [
  'Technical leadership',
  'Application development',
  'Cloud infrastructure',
  'Architecture',
  'Releases',
  'Security remediation',
  'Production troubleshooting',
] as const;

import type { SpriteType } from '../components/shared/PixelSprite';

/** Homelab / self-hosting interests — OPSEC-safe labels only. */
export const LAB_INTERESTS: readonly { name: string; sprite: SpriteType }[] = [
  { name: 'Linux', sprite: 'penguin' },
  { name: 'Docker', sprite: 'docker' },
  { name: 'Self-Hosting', sprite: 'server' },
  { name: 'Networking', sprite: 'globe' },
  { name: 'Storage', sprite: 'floppy' },
  { name: 'Automation', sprite: 'gear' },
  { name: 'Monitoring', sprite: 'antenna' },
  { name: 'Jellyfin', sprite: 'film' },
  { name: 'Open Source', sprite: 'heart' },
] as const;
