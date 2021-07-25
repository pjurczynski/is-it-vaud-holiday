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

interface Holiday {
  day: number;
  month: number;
  year?: number;
}

export function isItHoliday(date: Date) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return (
    fixedHolidays.has(JSON.stringify({ day, month })) ||
    isMovableHoliday({ day, month, year })
  );
}

const fixedHolidays = new Set<string>();
addHoliday({ day: 1, month: Month.January }, fixedHolidays);
addHoliday({ day: 31, month: Month.December }, fixedHolidays);
addHoliday({ day: 1, month: Month.January }, fixedHolidays);
addHoliday({ day: 2, month: Month.January }, fixedHolidays);
addHoliday({ day: 1, month: Month.May }, fixedHolidays);
addHoliday({ day: 23, month: Month.June }, fixedHolidays);
addHoliday({ day: 29, month: Month.June }, fixedHolidays);
addHoliday({ day: 1, month: Month.August }, fixedHolidays);
addHoliday({ day: 25, month: Month.December }, fixedHolidays);

function addHoliday(date: Holiday, set: Set<string>): void {
  set.add(JSON.stringify(date));
}

function isMovableHoliday(date: Required<Holiday>) {
  const easterSunday = getEasterSunday(date);
  const movableHolidays = new Set([
    JSON.stringify(easterSunday),
    JSON.stringify(offsetHoliday(easterSunday, -2)),
    JSON.stringify(offsetHoliday(easterSunday, 1)),
    JSON.stringify(offsetHoliday(easterSunday, 39)),
    JSON.stringify(offsetHoliday(easterSunday, 50)),
    JSON.stringify(offsetHoliday(easterSunday, 60)),
    JSON.stringify(getLundiDuJeune(date.year)),
  ]);

  return movableHolidays.has(JSON.stringify(date));
}

function getEasterSunday(date: Required<Holiday>): Required<Holiday> {
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

function offsetHoliday(
  date: Required<Holiday>,
  offsetDay: number,
): Required<Holiday> {
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

function getLundiDuJeune(year: number): Required<Holiday> {
  const date = new Date(0);
  date.setMonth(8);
  date.setFullYear(year);
  date.setDate(1);

  let day = date.getDay();
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
