import { useCallback, useEffect, useRef, useState, DependencyList } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Generic async-state hook: wraps any promise-returning function with
 * loading/error/data state and a refetch handle. Every data-fetching hook in
 * this app (useProducts, useProductDetail, useEmiPlans) is a thin wrapper
 * around this, so loading/error/retry behaves identically everywhere.
 */
export function useAsync<T>(asyncFn: () => Promise<T>, deps: DependencyList = []) {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: true, error: null });
  const isMounted = useRef(true);

  const run = useCallback(() => {
    setState((prev) => ({ data: prev.data, loading: true, error: null }));
    asyncFn()
      .then((data) => {
        if (isMounted.current) setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        if (isMounted.current) {
          setState({
            data: null,
            loading: false,
            error: err instanceof Error ? err.message : 'Something went wrong.',
          });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    isMounted.current = true;
    run();
    return () => {
      isMounted.current = false;
    };
  }, [run]);

  return { ...state, refetch: run };
}
