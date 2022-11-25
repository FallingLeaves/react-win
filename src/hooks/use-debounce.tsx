import React, {
  useEffect,
  useRef,
  MutableRefObject,
  DependencyList,
} from "react";
const useDebounce = (fn: Function, ms = 30, deps: DependencyList = []) => {
  let timeout: MutableRefObject<NodeJS.Timeout | null> | null =
    useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (timeout!.current) clearTimeout(timeout!.current);
    timeout!.current = setTimeout(() => {
      fn();
    }, ms);
  }, deps);
  const cancel = () => {
    clearTimeout(timeout!.current as NodeJS.Timeout);
    timeout = null;
  };

  return [cancel];
};
export default useDebounce;

/**
import { useDebounce } from 'hooks'
const Home = (props) => {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  
  const [cancel] = useDebounce(() => {
    setB(a)
  }, 2000, [a])
  const changeIpt = (e) => {
    setA(e.target.value)
  }
  return <div>
    <input type="text" onChange={changeIpt} />
   { b } { a }
  </div>
}
 */
