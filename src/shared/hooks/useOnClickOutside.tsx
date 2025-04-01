import { useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent; // 마우스 클릭 또는 터치 이벤트 타입 정의

// useOnClickOutside 훅 정의
const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>, // 감지할 요소(들)의 ref 객체
  handler: (event: Event) => void // 외부 클릭 시 실행될 함수
) => {
  useEffect(() => {
    // 이벤트 리스너 함수
    const listener = (event: Event) => {
      const el = ref?.current; // ref가 참조하는 실제 DOM 요소

      // 다음 경우에는 아무것도 하지 않음:
      // 1. ref가 아직 없거나 (el이 null/undefined)
      // 2. 클릭된 대상(event.target)이 ref 요소 자체이거나 그 자식 요소일 때
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event); // 위의 경우가 아니라면(즉, 외부 클릭 시) handler 함수 호출
    };

    // mousedown과 touchstart 이벤트 리스너를 document 전체에 등록
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener); // 터치스크린 기기 지원

    // 컴포넌트가 언마운트될 때 실행될 클린업(cleanup) 함수
    // 등록했던 이벤트 리스너를 제거하여 메모리 누수 방지
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // ref나 handler가 변경될 때만 effect를 다시 실행
};

export default useOnClickOutside;