// import moment, { MomentInput } from 'moment-timezone';

// import { timezones } from './timezones';

// export const zoneAsUIOptions = () =>
//   timezones.map(z => ({
//     key: z.zone,
//     label: `${z.zone} (${z.offset})`,
//     text: `${z.zone} (${z.offset})`,
//     value: z.zone,
//   }));

// export const defaultTimezone = {
//   label: 'America/New_York',
//   value: 'America/New_York',
// };
// export const dateToUSDate = (date: any): string | undefined => {
//   const d = moment(date);
//   if (d.isValid()) {
//     return d.format('l');
//   }
//   return undefined;
// };
// export const userTimezoneDate = (date: string | number, format = 'll'): string | null => {
//   // const a = 3;
//   // const tz = jsCookie.get('tz') || 'America/New_York';
//   const d = moment(date);
//   // return d.isValid() ? d.tz(tz).format(format) : null;
//   return d.isValid() ? d.format(format) : null;
// };

// type InputDate = string | number | Date | MomentInput;

// export const dateFromNow = (date: InputDate): string | null => {
//   const d = moment(date);
//   return d.isValid() ? d.fromNow() : null;
// };

// type monthsArray = [
//   string,
//   string,
//   string,
//   string,
//   string,
//   string,
//   string,
//   string,
//   string,
//   string,
//   string,
//   string
// ];
// export const dateUtils = {
//   getDate: (date: InputDate) => moment(date).toDate(),
//   getDay: (date: InputDate) => moment(date).format('d'),
//   getLocale: () => moment.locale(),
//   getMonth: (date: InputDate) => moment(date).format('MMM'),
//   getMonths: () => moment.months() as monthsArray,
//   getShortWeekday: (weekday: any) => moment.weekdaysShort(weekday),
//   getWeekday: (weekday: any) => moment.weekdays(weekday),
//   endOf(unit: any, date?: InputDate) {
//     return this.getDate(moment(date).endOf(unit));
//   },
//   format(date: InputDate, format: string) {
//     return this.getDate(moment(date).format(format));
//   },
//   isBetween: (date: InputDate, date1: InputDate, date2: InputDate) =>
//     moment(date).isBetween(date1, date2),
//   isValid: (date: InputDate) => moment(date).isValid(),
//   subtract(unit: any, amount: string | number, date?: InputDate) {
//     return this.getDate(moment().subtract(unit, amount));
//   },
//   toShortDate: (date?: InputDate) => moment(date).format('L'),
// };

// // export const dateFormatter = (date?: InputDate) => {
// //   const d:Date = date ? moment(date).toDate() : moment().toDate();
// //   return {
// //     toShortDate: () => moment(d).format('L'),
// //     subtractYears: (amount: number) => moment(d).subtract('years', amount),
// //     subtractDays,
// //     subtractMonths,
// //   }
// // }
