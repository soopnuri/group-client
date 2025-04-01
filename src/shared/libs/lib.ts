import moment from "moment";

/**
 * @param date 
 * @returns 16h ago
 */
export const timeAgo = (date: string) => {
  return moment(date).fromNow();
};
