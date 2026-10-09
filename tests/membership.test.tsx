// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { MembershipExperience } from '../components/obrien/membership-experience';
import { annualMembershipTotal, membershipPricing, membershipRecipient } from '../lib/membership';

afterEach(cleanup);

describe('Elite Comfort membership', () => {
  it('keeps residential pricing centralized and calculates additional systems', () => {
    expect(membershipPricing.firstSystem).toBe(350);
    expect(membershipPricing.additionalSystem).toBe(100);
    expect([1, 2, 3, 4, 5].map(annualMembershipTotal)).toEqual([350, 450, 550, 650, 750]);
  });

  it('switches between residential and commercial offers without public commercial pricing', () => {
    render(<MembershipExperience />);
    expect(screen.getAllByText('$350').length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('tab', { name: 'Commercial' }));
    expect(screen.getByText('CUSTOM RATE')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'REQUEST COMMERCIAL PLAN' })).toBeTruthy();
  });

  it('routes static form delivery only to the approved recipient', () => {
    expect(membershipRecipient).toBe('chad@obrienac.com');
    const component = readFileSync('components/obrien/membership-experience.tsx', 'utf8');
    expect(component).toContain('formsubmit.co/ajax/${membershipRecipient}');
    expect(component).not.toContain('fetch("/api/membership"');
    expect(component).not.toContain('RESEND_API_KEY');
  });
});
