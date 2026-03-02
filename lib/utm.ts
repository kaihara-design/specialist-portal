"use client";

import { useEffect, useState } from "react";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "ref",
] as const;

export function useUtmParams(): Record<string, string> {
  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const captured: Record<string, string> = {};
    UTM_KEYS.forEach((key) => {
      const val = search.get(key);
      if (val) captured[key] = val;
    });
    setParams(captured);
  }, []);

  return params;
}
