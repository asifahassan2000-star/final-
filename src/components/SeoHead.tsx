import React from 'react';
import { useSeoMetadata } from '../hooks/useSeoMetadata';
import { PageSeoConfig } from '../data/seoConfig';

export interface SeoHeadProps {
  pageId: string;
  overrides?: Partial<PageSeoConfig>;
}

/**
 * Declarative component for centralized SEO head tags.
 * Mount inside the App or route views to keep meta tags, titles,
 * OpenGraph, Twitter cards, and Schema.org in sync.
 */
export const SeoHead: React.FC<SeoHeadProps> = ({ pageId, overrides }) => {
  useSeoMetadata(pageId, overrides);
  return null;
};
