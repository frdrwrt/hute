import { calculateDewPoint } from './calculations';

describe('calculateDewPoint', () => {
  it('should return right values', () => {
    expect(calculateDewPoint(20, 50)).toEqual(9.3);
    expect(calculateDewPoint(10, 60)).toEqual(2.6);
    expect(calculateDewPoint(10, 30)).toEqual(-6.8);
    expect(calculateDewPoint(-1, 30)).toEqual(-16.3);
  });
});
