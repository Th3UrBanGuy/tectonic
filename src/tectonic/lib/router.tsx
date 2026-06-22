"use client";
/**
 * Next.js routing compatibility shim for the Tectonic SPA.
 *
 * Re-implements the subset of `react-router-dom` APIs that the Tectonic
 * codebase uses on top of Next.js App Router primitives
 * (`next/link`, `next/navigation`). This lets the imported components keep
 * their original call sites (`<Link to="...">`, `useNavigate()`,
 * `useSearchParams()`, `useParams()`, `useLocation()`, `<Navigate />`)
 * while routing through real Next.js file-based routes — no HashRouter.
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import NextLink from "next/link";
import {
  useRouter,
  usePathname,
  useParams as useNextParams,
} from "next/navigation";

// ---------------------------------------------------------------------------
// Navigation-state store — used to pass `state` across navigations
// (e.g. ProtectedRoute → <Navigate state={{ from }} replace /> → Login reads
// location.state). Mirrors react-router's location.state semantics.
// ---------------------------------------------------------------------------
type NavStateEntry = { path: string; state: unknown };
let navStateEntry: NavStateEntry | undefined = undefined;

function setNavStateFor(path: string, state: unknown) {
  navStateEntry = { path, state };
}

function getNavStateFor(path: string): unknown {
  return navStateEntry && navStateEntry.path === path
    ? navStateEntry.state
    : undefined;
}

// Custom event dispatched when search params are updated in-place (Wings tabs).
const SEARCH_PARAMS_EVENT = "tectonic:searchparams";

// ---------------------------------------------------------------------------
// Link  — react-router's <Link to="..."> backed by next/link <Link href="...">
// ---------------------------------------------------------------------------
type LinkProps = {
  to: string;
  state?: unknown;
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  title?: string;
  [key: string]: unknown;
};

export function Link({ to, state, children, onClick, ...rest }: LinkProps) {
  const handleClick = useCallback<React.MouseEventHandler<HTMLAnchorElement>>(
    (e) => {
      // Only carry state for plain left-clicks; let ctrl/meta clicks open new tabs.
      if (state !== undefined && !e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
        setNavStateFor(to, state);
      }
      onClick?.(e);
      // Dispatch a custom event so useSearchParams picks up the new URL
      // (Next.js client-side navigation doesn't trigger 'popstate')
      if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
        setTimeout(() => window.dispatchEvent(new Event(SEARCH_PARAMS_EVENT)), 0);
      }
    },
    [to, state, onClick]
  );

  return (
    <NextLink href={to} onClick={handleClick} {...rest}>
      {children}
    </NextLink>
  );
}

// ---------------------------------------------------------------------------
// useNavigate — returns navigate(to, opts?) backed by next/router
// ---------------------------------------------------------------------------
type NavigateOptions = { replace?: boolean; state?: unknown };

export function useNavigate() {
  const router = useRouter();
  return useCallback(
    (to: string, opts?: NavigateOptions) => {
      if (opts?.state !== undefined) setNavStateFor(to, opts.state);
      if (opts?.replace) router.replace(to);
      else router.push(to);
      // Dispatch event so useSearchParams picks up the new URL
      setTimeout(() => window.dispatchEvent(new Event(SEARCH_PARAMS_EVENT)), 0);
    },
    [router]
  );
}

// ---------------------------------------------------------------------------
// useLocation — { pathname, search, hash, state } backed by usePathname()
// ---------------------------------------------------------------------------
export function useLocation() {
  const pathname = usePathname() ?? "";
  const [search, setSearch] = useState<string>("");
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    const sync = () => {
      setSearch(window.location.search);
      setHash(window.location.hash);
    };
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener(SEARCH_PARAMS_EVENT, sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener(SEARCH_PARAMS_EVENT, sync);
    };
  }, []);

  const state = getNavStateFor(pathname);
  // Memoize so the returned object keeps a stable reference across renders
  // unless a value actually changes — mirrors react-router's useLocation(),
  // which components depend on in useEffect([location]) dependency arrays.
  return useMemo(
    () => ({ pathname, search, hash, state }),
    [pathname, search, hash, state]
  );
}

// ---------------------------------------------------------------------------
// useSearchParams — [URLSearchParams, setSearchParams] backed by the History API
// (Avoids next/navigation's useSearchParams Suspense requirement.)
// ---------------------------------------------------------------------------
type SetSearchParams = (
  next: Record<string, string> | URLSearchParams,
  options?: { replace?: boolean }
) => void;

export function useSearchParams(): [URLSearchParams, SetSearchParams] {
  const [params, setParams] = useState<URLSearchParams>(() => {
    if (typeof window === "undefined") return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  });

  useEffect(() => {
    const sync = () => {
      setParams(new URLSearchParams(window.location.search));
    };
    window.addEventListener("popstate", sync);
    window.addEventListener(SEARCH_PARAMS_EVENT, sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener(SEARCH_PARAMS_EVENT, sync);
    };
  }, []);

  const setSearchParams = useCallback<SetSearchParams>((next, options) => {
    const sp =
      next instanceof URLSearchParams
        ? next
        : new URLSearchParams(next as Record<string, string>);
    const qs = sp.toString();
    const url = `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`;
    if (options?.replace) window.history.replaceState({}, "", url);
    else window.history.pushState({}, "", url);
    setParams(sp);
    window.dispatchEvent(new Event(SEARCH_PARAMS_EVENT));
  }, []);

  return [params, setSearchParams];
}

// ---------------------------------------------------------------------------
// useParams — dynamic route params, backed by next/navigation
// ---------------------------------------------------------------------------
export function useParams<T = Record<string, string | string[]>>(): T {
  const params = useNextParams();
  return (params ?? {}) as T;
}

// ---------------------------------------------------------------------------
// Navigate — imperative redirect component (ProtectedRoute / Login use this)
// ---------------------------------------------------------------------------
type NavigateProps = { to: string; replace?: boolean; state?: unknown };

export function Navigate({ to, replace, state }: NavigateProps) {
  const router = useRouter();
  const planned = useRef(false);

  useEffect(() => {
    if (planned.current) return;
    planned.current = true;
    if (state !== undefined) setNavStateFor(to, state);
    if (replace) router.replace(to);
    else router.push(to);
  }, [to, replace, state, router]);

  return null;
}

export default Link;
