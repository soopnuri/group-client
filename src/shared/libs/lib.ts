import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

/**
 * @param date
 * @returns 16h ago
 */
export const timeAgo = (date: string) => {
  return dayjs(date).fromNow();
};

export const formatWithComma = (num: number) => {
  if (typeof num !== "number") return;

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
