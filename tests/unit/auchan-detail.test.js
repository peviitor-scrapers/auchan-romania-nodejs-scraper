import { describe, it, expect, beforeAll } from '@jest/globals';

const PAGE = `
<div class="job-title block text-[40px]">Operator vânzări polivalent</div>
<div class="custom-fields-section">
  <div class="custom-field inline-block">Constanța</div>
  <div class="custom-field inline-block">Constanța Sud</div>
  <div class="custom-field inline-block">Vânzări și Comerț</div>
  <div class="custom-field inline-block">Full-time</div>
</div>`;

describe('Auchan job detail parser', () => {
  let index;
  beforeAll(async () => { index = await import('../../scraper/index.js'); });

  it('reads title and city (first custom-field)', () => {
    expect(index.parseJobDetail(PAGE)).toEqual({ title: 'Operator vânzări polivalent', city: 'Constanța' });
  });

  it('returns nulls on a page without the markup (404/changed layout)', () => {
    expect(index.parseJobDetail('<html><body>gone</body></html>')).toEqual({ title: null, city: null });
  });
});