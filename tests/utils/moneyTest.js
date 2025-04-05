import { formatCurrency } from "../../scripts/utils/money.js";
describe('test suite :  formatCurrency', () => {
  it('Converts cents to dollers', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });
  it('Works with zero(0)', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('Round up to the nearest value', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
});
