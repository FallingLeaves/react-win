import { useEffect, useRef, useState, DependencyList } from "react";
const useThrottle = (fn: Function, ms = 30, deps: DependencyList = []) => {
  let previous = useRef(0);
  let [time, setTime] = useState(ms);
  useEffect(() => {
    let now = Date.now();
    if (now - previous.current > time) {
      fn();
      previous.current = now;
    }
  }, deps);
  const cancel = () => {
    setTime(0);
  };

  return [cancel];
};
export default useThrottle;
