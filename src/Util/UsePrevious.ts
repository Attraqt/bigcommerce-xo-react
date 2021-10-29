import { useEffect, useRef } from "react";
import { clone } from "lodash";

/**
 * A custom-hook to provide access to the previous value of a hook.
 *
 * @see https://usehooks.com/usePrevious/
 * @see https://stackoverflow.com/questions/53446020/how-to-compare-oldvalues-and-newvalues-on-react-hooks-useeffect
 * @param value
 * @returns
 */
const usePrevious = <T>(value: T): T => {
  const ref: any = useRef<T>();

  useEffect(() => {
    ref.current = clone(value);
  }, [JSON.stringify(value)]);

  return ref.current;
};

export default usePrevious;
