import { DateTime } from 'luxon';
import { isValid, parse } from 'date-fns';
import { FORMAT_DATE, TIMEZONE } from '~/constants';

type DateInput = string | Date | DateTime;
type TimeInterval = 'day' | 'week' | 'month' | 'year';

export class TimeManagerWithTimezone {
    private timezone: string;
    private locale: string;

    constructor(timezone = 'Europe/Paris', locale = 'en') {
        this.timezone = timezone;
        this.locale = locale;
    }

    /**
     * Validate a date string
     * @param dateStr - The date string to parse
     * @returns true if the date string is a valid date, false otherwise
     */
    public isValidDateString(dateStr: string): boolean {
        if (!dateStr) return false;
        const parsed = parse(dateStr, 'yyyy-LL-dd', new Date());
        return isValid(parsed);
    }

    public getToday(): Date {
        return this.toStartOfInterval(new Date(), 'day');
    }

    /**
     * Get the first day of the week (monday)
     * @param date - The JSDate, or Date String to get the monday
     * @returns JSDate of the monday of the week
     */
    public toWeekStart(date: DateInput): Date {
        return this.toStartOfInterval(date, 'week');
    }

    /**
     * Get the last day of the week (sunday)
     * @param date - The JSDate, or Date String to get the sunday
     * @returns JSDate of the sunday of the week
     */
    public toWeekEnd(date: DateInput): Date {
        return this.toEndOfInterval(date, 'week');
    }

    /**
     * Get the first day of the month (1st)
     * @param date - The JSDate, or Date String to get the first day of the month
     * @returns JSDate of the first day of the month
     */
    public toMonthStart(date: DateInput): Date {
        return this.toStartOfInterval(date, 'month');
    }

    /**
     * Get the last day of the month
     * @param date - The JSDate, or Date String to get the last day of the month
     * @returns JSDate of the last day of the month
     */
    public toMonthEnd(date: DateInput): Date {
        return this.toEndOfInterval(date, 'month');
    }

    /**
     * Convert a date string to a JSDate, wrt. the configured timezone
     * @param dateStr a date string in ISO format, e.g. '2020-01-01'
     * @returns JSDate of the date string
     */
    public fromISO(dateStr: string): Date {
        return DateTime.fromISO(dateStr, { zone: this.timezone }).toJSDate();
    }

    public fromFormat(dateStr: string, format: string): Date {
        return DateTime.fromFormat(dateStr, format).setZone(this.timezone).toJSDate();
    }

    /**
     * Convert a JSDate to a string in the provided format, wrt. the configured timezone
     * @param date - The JSDate to convert
     * @param format - The format to use, e.g. 'yyyy-MM-dd'
     * @returns The formatted date string
     */
    public format(date: DateInput, format: string = FORMAT_DATE): string {
        const jsDate = this.ensureJSDate(date);
        return DateTime.fromJSDate(jsDate, { zone: this.timezone }).setLocale(this.locale).toFormat(format);
    }

    /**
     * Convert a JSDate to a string in the provided format, wrt. the configured timezone and the locale
     * @param date - The JSDate to convert
     * @param format
     * @param locale
     * @returns The formatted date string
     */
    public toLocaleString(date: DateInput, format: Intl.DateTimeFormatOptions = DateTime.DATETIME_SHORT_WITH_SECONDS, locale = 'de-DE'): string {
        const jsDate = this.ensureJSDate(date);
        return DateTime.fromJSDate(jsDate).setLocale(locale).toLocaleString(format);
    }

    /**
     * Calculate the number of days between two dates.
     * If the first date is after the second date, the result will be negative.
     * @param date1 - The first date
     * @param date2 - The second date
     * @returns The number of days between the two dates
     */
    public daysBetween(date1: DateInput, date2: DateInput): number {
        const jsDate1 = this.ensureJSDate(date1);
        const jsDate2 = this.ensureJSDate(date2);
        return DateTime.fromJSDate(jsDate2, { zone: this.timezone }).diff(DateTime.fromJSDate(jsDate1, { zone: this.timezone }), 'days').days;
    }

    toDateTime(date: DateInput): DateTime {
        const jsDate = this.ensureJSDate(date);
        return DateTime.fromJSDate(jsDate, { zone: this.timezone }).setLocale(this.locale);
    }

    toStartOfInterval(date: DateInput, interval: TimeInterval): Date {
        const jsDate = this.ensureJSDate(date);
        return DateTime.fromJSDate(jsDate, { zone: this.timezone }).startOf(interval).toJSDate();
    }

    toEndOfInterval(date: DateInput, interval: TimeInterval): Date {
        const jsDate = this.ensureJSDate(date);
        return DateTime.fromJSDate(jsDate, { zone: this.timezone }).endOf(interval).toJSDate();
    }

    private ensureJSDate(date: DateInput): Date {
        if (date instanceof Date) {
            return date;
        }
        if (date instanceof DateTime) {
            return date.toJSDate();
        }
        return this.fromISO(date);
    }
}

export const Time = new TimeManagerWithTimezone(TIMEZONE);
