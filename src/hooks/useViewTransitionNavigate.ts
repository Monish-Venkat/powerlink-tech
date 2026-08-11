import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { flushSync } from 'react-dom';

/**
 * Wraps React Router navigation in the View Transitions API when the browser
 * supports it, so route changes cross-fade/morph instead of hard-cutting.
 * Falls back to a plain navigate() with no special handling otherwise.
 */
export function useViewTransitionNavigate() {
  const navigate = useNavigate();

  return useCallback(
    (to: string) => {
      if (!document.startViewTransition) {
        navigate(to);
        return;
      }
      document.startViewTransition(() => {
        flushSync(() => navigate(to));
      });
    },
    [navigate]
  );
}
