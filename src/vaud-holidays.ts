export function isItHoliday(date: Date): boolean {
  const maybeHoliday = {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };

  return isFixedHoliday(maybeHoliday) || isMovableHoliday(maybeHoliday);
}

const enum Month {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

interface SimpleDate {
  day: number;
  month: number;
  year: number;
}

function isFixedHoliday(date: SimpleDate) {
  const fixedHolidays = [
    { day: 1, month: Month.January, year: date.year },
    { day: 2, month: Month.January, year: date.year },
    { day: 1, month: Month.May, year: date.year },
    { day: 23, month: Month.June, year: date.year },
    { day: 29, month: Month.June, year: date.year },
    { day: 1, month: Month.August, year: date.year },
    { day: 25, month: Month.December, year: date.year },
  ];

  return !!fixedHolidays.find(
    holiday => JSON.stringify(holiday) === JSON.stringify(date),
  );
}

function isMovableHoliday(date: SimpleDate) {
  const easterSunday = getEasterSunday(date);
  const movableHolidays = [
    easterSunday,
    offsetHoliday(easterSunday, -2),
    offsetHoliday(easterSunday, 1),
    offsetHoliday(easterSunday, 39),
    offsetHoliday(easterSunday, 50),
    offsetHoliday(easterSunday, 60),
    getLundiDuJeune(date.year),
  ];

  return !!movableHolidays.find(
    holiday => JSON.stringify(holiday) === JSON.stringify(date),
  );
}

/**
 * Anonymous Gregorian algorithm
 * https://en.wikipedia.org/wiki/Date_of_Easter
 */
function getEasterSunday(date: SimpleDate): SimpleDate {
  const a = date.year % 19;
  const b = Math.floor(date.year / 100);
  const c = Math.floor(date.year % 100);
  const d = Math.floor(b / 4);
  const e = Math.floor(b % 4);
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = Math.floor((19 * a + b - d - g + 15) % 30);
  const i = Math.floor(c / 4);
  const k = Math.floor(c % 4);
  const l = Math.floor((32 + 2 * e + 2 * i - h - k) % 7);
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return { day, month, year: date.year };
}

function offsetHoliday(date: SimpleDate, offsetDay: number): SimpleDate {
  const newDate = new Date(0);
  newDate.setMonth(date.month);
  newDate.setFullYear(date.year);
  newDate.setDate(date.day + offsetDay);

  return {
    day: newDate.getDate(),
    month: newDate.getMonth(),
    year: newDate.getFullYear(),
  };
}

function getLundiDuJeune(year: number): SimpleDate {
  const date = new Date(0);
  date.setMonth(8);
  date.setFullYear(year);
  date.setDate(1);

  const day = date.getDay();
  if (!(day === 0)) {
    date.setDate(1 + 7 - day);
  }

  date.setDate(date.getDate() + 14 + 1);

  return {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
}
