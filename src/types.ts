export interface Program {
  id: string;
  name: string;
  degree: 'Undergraduate' | 'Postgraduate' | 'PhD' | 'ADP';
  duration: string;
  creditHours: number;
  facultyId: string;
  description: string;
  eligibility: string;
  careerOutcomes: string[];
}

export interface Faculty {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  dean: string;
  description: string;
  image: string;
  accentColor: string;
  programsCount: {
    undergraduate: number;
    postgraduate: number;
    phd: number;
    adp: number;
  };
  highlights: string[];
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  suffix?: string;
  prefix?: string;
  iconName: string;
  category: 'academics' | 'faculty' | 'diversity' | 'rankings' | 'aid';
  description: string;
}

export interface NewsEventItem {
  id: string;
  title: string;
  category: 'News' | 'Event' | 'Symposium' | 'Workshop' | 'Announcement';
  date: string;
  formattedDate: { day: string; month: string; year: string };
  time?: string;
  venue?: string;
  image: string;
  summary: string;
  author?: string;
  featured?: boolean;
}

export interface HeroSlide {
  id: string;
  theme?: string;
  preheader?: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  fallbackImage?: string;
  primaryCta: { label: string; action: string };
  secondaryCta?: { label: string; action: string };
  highlights?: string[];
}

export interface CampusFacility {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  features: string[];
}

export interface StudentClub {
  id: string;
  name: string;
  category: 'Academic' | 'Culture & Arts' | 'Sports' | 'Social Work' | 'Media';
  description: string;
  lead: string;
}
