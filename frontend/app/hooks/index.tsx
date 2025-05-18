import { useEffect, useLayoutEffect } from "react";

const isClient = () => typeof window !== "undefined";

const useIsomorphicEffect = isClient() ? useLayoutEffect : useEffect;

export { useIsomorphicEffect };