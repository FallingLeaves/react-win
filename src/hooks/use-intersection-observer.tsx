import React, { useEffect, MutableRefObject, RefObject } from "react";
export interface ObserverParams {
  target: RefObject<HTMLDivElement>;
  onIntersect: IntersectionObserverCallback;
  threshold?: number;
  rootMargin?: string;
}
const useIntersectionObserver = ({
  target,
  onIntersect,
  threshold = 0.1,
  rootMargin = "0px",
}: ObserverParams) => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      rootMargin,
      threshold,
    });
    const current = target.current;
    observer.observe(current!);
    return () => {
      observer.unobserve(current!);
    };
  });
};
export default useIntersectionObserver;
