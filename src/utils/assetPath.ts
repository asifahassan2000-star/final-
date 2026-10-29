/**
 * Resolves static asset paths (e.g. '/assets/...' or '/images/...')
 * with the application base URL so they resolve correctly on subpath
 * deployments like GitHub Pages (/final/) as well as local development (/).
 */
export function assetUrl(path: string): string {
  if (!path || typeof path !== 'string') return path;
  
  // External URLs or data/blob URLs are returned as-is
  if (
    path.startsWith('http://') || 
    path.startsWith('https://') || 
    path.startsWith('data:') || 
    path.startsWith('blob:')
  ) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const prefix = base !== '/' ? base.replace(/\/$/, '') : '';
  
  if (!prefix) return path;

  // If path already starts with the prefix, do not duplicate
  if (path.startsWith(prefix + '/')) {
    return path;
  }

  if (path.startsWith('/')) {
    return `${prefix}${path}`;
  }

  return `${prefix}/${path}`;
}
