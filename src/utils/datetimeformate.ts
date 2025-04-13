import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDateInTimezone = (
  date?: string | Date,
): string => {
  if (!date) return "Invalid Date";

  const formatted = dayjs(date).tz("Asia/Kolkata");
//   YYYY-MM-DDTHH:mm:ssZ[Z]
  return `${formatted.format('DD-MMM-YYYY, hh:mm:ss A')}`;
};
