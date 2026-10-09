// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { ProjectHighlights } from '../components/obrien/project-highlights';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

afterEach(cleanup);

describe('Project Highlights', () => {
  it('ships the fingerprinted high-quality Marriott derivative', () => {
    const bytes = readFileSync('public/project-highlights/properties/marriott-biscayne-q90-b2006ba393.webp');
    expect(createHash('sha256').update(bytes).digest('hex').slice(0, 10)).toBe('b2006ba393');
  });
  it('renders the corrected and added properties', () => {
    const { container } = render(<ProjectHighlights />);
    expect(container.querySelectorAll('article')).toHaveLength(15);
    const h = (name: string) => screen.getByRole('heading', { name });
    h('The Ritz-Carlton Residences, Miami Beach');
    h('Four Seasons Hotel and Residences Fort Lauderdale');
    h('Fort Lauderdale Marriott Harbor Beach Resort & Spa');
    h('Hilton Fort Lauderdale Marina');
    h('Riverside Hotel');
    h('Amazon Fulfillment Center ACY1');
    h('Amazon — Fort Pierce, FL');
    expect(screen.getByText('4701 Meridian Avenue · Miami Beach, Florida')).toBeTruthy();
    expect(screen.getByText('525 North Fort Lauderdale Beach Boulevard · Fort Lauderdale, Florida')).toBeTruthy();
    expect(screen.getByText('240 Mantua Grove Road · West Deptford, New Jersey')).toBeTruthy();
    // Unverified identities stay generic with no invented street address.
    expect(screen.getByText('Cary, North Carolina')).toBeTruthy();
    expect(screen.getByText('Bethesda, Maryland')).toBeTruthy();
    expect(screen.getByText('Fort Pierce, Florida')).toBeTruthy();
    const html = container.innerHTML;
    for (const stale of ['Coconut Grove', 'Four Seasons Hotel Miami', 'four-seasons-miami', 'ritz-reference', 'commercial-replacement-v1', 'Pooks Hill']) {
      expect(html).not.toContain(stale);
    }
    expect(container.querySelectorAll('.has-photo')).toHaveLength(15);
    expect(container.querySelectorAll('.project-logo')).toHaveLength(15);
    expect(container.querySelectorAll('.project-logo img')).toHaveLength(11);
    expect(container.querySelectorAll('.project-wordmark')).toHaveLength(4);
    expect(container.querySelectorAll('.project-editorial-mark')).toHaveLength(0);
    expect(screen.getAllByText('Rendering, not a photograph of the property')).toHaveLength(6);
    expect(container.querySelector('.card-seasons img')?.getAttribute('src')).toContain('four-seasons-fort-lauderdale-');
    expect(container.querySelector('.card-riverside img')?.getAttribute('src')).toContain('riverside-hotel-las-olas-');
    const strip = container.querySelector('.major-brands')!;
    for (const brand of ['Four Seasons', 'Kimpton Surfcomber', 'Marriott']) expect(strip.querySelector(`img[alt="${brand}"]`)).toBeTruthy();
    expect(strip.textContent).toContain('THE RITZ-CARLTON');
    expect(strip.textContent).toContain('AMAZON');
    expect(container.querySelectorAll('.major-badge').length).toBe(7);
    expect(screen.getByText('PROJECT REACH')).toBeTruthy();
    expect(screen.getByText('Experience beyond South Florida.')).toBeTruthy();
  });

  it.each([['Hospitality', 8], ['Luxury Residential', 2], ['Automotive', 3], ['Commercial', 6], ['Industrial / Logistics', 2], ['All', 15]])('filters %s cards', (name, count) => {
    const { container } = render(<ProjectHighlights />);
    const button = screen.getByRole('button', { name });
    fireEvent.click(button);
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(container.querySelectorAll('article')).toHaveLength(count);
  });
});
