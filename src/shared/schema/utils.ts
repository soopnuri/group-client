import { SafeParseError, typeToFlattenedError } from "zod";

export const zodErrorMessage = (payload: SafeParseError<any>): string => {
  const errors: typeToFlattenedError<any> = payload.error.flatten();

  const fieldErrorMessages = Object.entries(errors.fieldErrors)
    .map(([fieldName, messages]) => `${fieldName}: ${messages!.join(", ")}`) // 필드 이름과 메시지 결합
    .join("\n"); // 각 필드 오류를 새 줄로 구분

  return fieldErrorMessages;
};

/**
 * 서버에서 요구하는 문자열 형태로 값을 변환하거나 확인합니다.
 *
 * @param {*} value - 변환 또는 확인할 값
 * @returns {string | null} - 변환된 문자열 또는 null
 */
export const ensureString = (value: string | number | null) => {
  // 1. null 또는 undefined 인 경우 null 반환 (undefined도 null로 처리)
  if (value === null || value === undefined) {
    return null;
  }

  const type = typeof value;

  // 2. 이미 문자열인 경우 그대로 반환
  if (type === "string") {
    return value;
  }

  // 3. 숫자인 경우 문자열로 변환하여 반환
  if (type === "number") {
    if (typeof value !== "number" || isNaN(value) || !isFinite(value)) {
      console.warn(
        `[checkString] 유효하지 않은 숫자(${value})는 null로 처리됩니다.`
      );
      return null;
    }
    return String(value); // 또는 value.toString()
  }

  // 6. 객체(배열 포함)나 함수, 심볼 등 다른 타입은 일반적으로
  //    단순 문자열로 변환하기 애매하므로 null 반환 또는 경고 후 null 반환
  if (type === "object" || type === "symbol" || type === "function") {
    console.warn(
      `[checkString] 문자열로 변환할 수 없는 타입(${type})의 값입니다. null을 반환합니다. 값:`,
      value
    );
    return null;
  }

  try {
    const converted = String(value);
    console.warn(
      `[checkString] 예상치 못한 값(${value})을 String()으로 변환 시도: "${converted}". 서버 요구사항과 맞는지 확인 필요.`
    );
    return null; // 아니면 안전하게 null로 보낼지 결정
  } catch (error) {
    console.error(`[checkString] 값 변환 중 오류 발생:`, error, `값:`, value);
    return null;
  }
};

/**
 * 서버에서 요구하는 숫자 형태로 값을 변환하거나 확인합니다.
 *
 * @param {*} value - 변환 또는 확인할 값
 * @returns {number | null} - 변환된 숫자 또는 null
 */
export const ensureNumber = (value: string | number | null) => {
  // 1. null 또는 undefined 인 경우 null 반환
  if (value === null || value === undefined) {
    return null;
  }

  const type = typeof value;

  // 2. 이미 숫자인 경우
  if (type === "number") {
    // NaN, Infinity는 유효한 숫자로 보기 어려우므로 null 처리 (서버 요구사항에 따라 변경 가능)
    if (typeof value !== "number" || isNaN(value) || !isFinite(value)) {
      console.warn(
        `[checkNumber] 유효하지 않은 숫자(${value})는 null로 처리됩니다.`
      );
      return null;
    }
    return value; // 유효한 숫자면 그대로 반환
  }

  // 3. 문자열인 경우 숫자로 변환 시도
  if (type === "string") {
    const trimmedValue = typeof value === "string" ? value.trim() : "";
    if (trimmedValue === "") {
      console.warn(`[checkNumber] 빈 문자열은 null로 처리됩니다.`);
      return null;
    }

    // Number()를 사용하여 변환 시도 (소수점 포함)
    const num = Number(trimmedValue);

    // 변환 결과가 NaN이면 유효하지 않은 입력이므로 null 반환
    if (isNaN(num)) {
      console.warn(
        `[checkNumber] 숫자로 변환할 수 없는 문자열("${value}")은 null로 처리됩니다.`
      );
      return null;
    }
    // Infinity도 위 number 체크에서 걸렀지만, 혹시 모를 경우 대비
    if (!isFinite(num)) {
      console.warn(
        `[checkNumber] 무한대 값으로 변환되는 문자열("${value}")은 null로 처리됩니다.`
      );
      return null;
    }
    return num; // 성공적으로 변환된 숫자 반환
  }

  // 4. Boolean 값인 경우 1 또는 0으로 변환 (서버 요구사항에 따라 조정 가능)
  // if (type === "boolean") {
  //   return value ? 1 : 0;
  // }

  // 5. 그 외 타입 (object, symbol, function)은 숫자로 변환 불가
  if (type === "object" || type === "symbol" || type === "function") {
    console.warn(
      `[checkNumber] 숫자로 변환할 수 없는 타입(${type})의 값입니다. null을 반환합니다. 값:`,
      value
    );
    return null;
  }

  // 예상치 못한 경우 대비
  console.warn(
    `[checkNumber] 예상치 못한 값(${value}) 타입(${type})은 null로 처리됩니다.`
  );
  return null;
};
