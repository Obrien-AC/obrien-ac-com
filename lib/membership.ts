export const membershipPricing = {
  firstSystem: 350,
  additionalSystem: 100,
  visitsPerYear: 2,
  repairDiscountPercent: 10,
} as const;

export const membershipRecipient = "chad@obrienac.com";

export function annualMembershipTotal(systems: number) {
  const count = Math.max(1, Math.floor(systems || 1));
  return membershipPricing.firstSystem + (count - 1) * membershipPricing.additionalSystem;
}
