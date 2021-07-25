import { isHoliday } from './is-holiday';

const fixedHolidays = [
  '1 January 2021',
  '1 January 2022',
  '1 January 2023',
  '1 January 2024',
  '2 January 2021',
  '2 January 2022',
  '2 January 2023',
  '2 January 2024',
  '1 May 2021',
  '1 May 2022',
  '1 May 2023',
  '1 May 2024',
  '23 June 2021',
  '23 June 2022',
  '23 June 2023',
  '23 June 2024',
  '29 June 2021',
  '29 June 2022',
  '29 June 2023',
  '29 June 2024',
  '1 August 2021',
  '1 August 2022',
  '1 August 2023',
  '1 August 2024',
  '25 December 2021',
  '25 December 2022',
  '25 December 2023',
  '25 December 2024',
];

const movableHolidays = [
  // '27 April 2008',
  '1 May 2016',
  // Sunday Easter
  '4 April 2021',
  '17 April 2022',
  '9 April 2023',
  '31 March 2024',
  '20 April 2025',
  '5 April 2026',
  '28 March 2027',
  '16 April 2028',
  '1 April 2029',
  '21 April 2030',
  '13 April 2031',

  // EASTER
  '2 April 2021',
  '15 April 2022',
  '7 April 2023',
  '29 March 2024',
  '5 April 2021',
  '18 April 2022',
  '10 April 2023',
  '1 April 2024',
  '13 May 2021',
  '26 May 2022',
  '18 May 2023',
  '9 May 2024',
  '24 May 2021',
  '6 June 2022',
  '29 May 2023',
  '20 May 2024',

  // Lundi du Jeune
  '20 September 2021',
  '19 September 2022',
  '18 September 2023',
  '16 September 2024',
];

describe('isHoliday()', () => {
  it('8th July is not a holiday', () => {
    const randomDate = new Date('8 July 2021');
    expect(isHoliday(randomDate)).toBe(false);
  });

  it('31st December is not a holiday in Switzerland (Vaud)', () => {
    const lastDayOfYear = new Date('31 December 2021');
    expect(isHoliday(lastDayOfYear)).toBe(false);
  });

  describe('fixed holidays', () => {
    fixedHolidays.forEach(fixedHoliday => {
      it(`${fixedHoliday} is a holiday`, () => {
        const holiday = new Date(fixedHoliday);
        expect(isHoliday(holiday)).toBe(true);
      });
    });
  });

  describe('moving holidays', () => {
    movableHolidays.forEach(movingHoliday => {
      it(`${movingHoliday} is a holiday`, () => {
        const holiday = new Date(movingHoliday);
        expect(isHoliday(holiday)).toBe(true);
      });
    });
  });

  it('22 April 2136 is an Easter Sunday holiday', () => {
    const holiday = new Date('22 April 2136');
    expect(isHoliday(holiday)).toBe(true);
  });
});
