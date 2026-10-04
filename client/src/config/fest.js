// Single source of truth for the fest year/edition. Bump these once per rollover.
// NOTE: index.html carries the year too (static HTML, outside the bundle, so it
// cannot import from here) - update its title/description/keywords as well.
export const FEST_YEAR = 2027;
export const FEST_EDITION = 68; // edition N = 1959 + N

const ordinalSuffix = (n) => {
  const rem100 = n % 100;
  if (rem100 >= 11 && rem100 <= 13) return 'th';
  return { 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] ?? 'th';
};

export const FEST_EDITION_LABEL = `${FEST_EDITION}${ordinalSuffix(FEST_EDITION)} edition`;
