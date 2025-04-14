/**
 * 필수 값, 타입 확인
 * @param name {string} - 필드명
 * @returns `{필드명} 에러 메시지`
 */
export const zNumber = (name: string = "") => {
  return {
    required_error: `${name}는 필수입니다.`,
    invalid_type_error: `${name}는 숫자여야합니다.`,
  };
};
/**
 * 허용: 0, 1, 100, -5, -10 등
 * 불허: 1.5, -2.3, Infinity, -Infinity, NaN
 * @param name {string} - 필드명
 * @returns `{필드명} 에러 메시지`
 */
export const zInt = (name: string = "") => {
  return {
    message: `${name}는 정수여야 합니다.`,
  };
};
/**
 * @param name {string} - 필드명
 * @returns `{필드명} 에러 메시지`
 */
export const zString = (name: string = "") => {
  return {
    required_error: `${name}는 필수입니다.`,
    invalid_type_error: `${name}는 문자여야 합니다.`,
  };
};
/**
 *허용: 1, 100, 0.1, 1.5, Infinity
 *불허: 0, -1, -0.5, -Infinity, NaN
 * @param name {string} - 필드명
 * @returns `{필드명} 에러 메시지`
 */
export const zPositive = (name: string = "") => {
  return {
    message: `${name}는 양수여야 합니다.`,
  };
};
/**
 * 허용: 0, 1, 100, 0.1, 1.5, Infinity
 * 불허: -1, -0.5, -Infinity, NaN
 * @param name {string} - 필드명
 * @returns `{필드명} 에러 메시지`
 */
export const zNonnegative = (name: string = "") => {
  return {
    message: `${name}는 양수여야 합니다.`,
  };
};
