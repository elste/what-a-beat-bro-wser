const state = {
  enabled: false,
};

export function isLogEnabled(): boolean {
  return state.enabled;
}

export function setLogEnabled(enabled: boolean): void {
  state.enabled = enabled;
  console.info(`[logger] ${enabled ? "enabled" : "disabled"}`);
}

function formatPrefix(level: string): string {
  return `[logger:${level}]`;
}

export function log(...args: unknown[]): void {
  if (!state.enabled) {
    return;
  }
  console.log(formatPrefix("info"), ...args);
}

export function debug(...args: unknown[]): void {
  if (!state.enabled) {
    return;
  }
  console.debug(formatPrefix("debug"), ...args);
}

export function warn(...args: unknown[]): void {
  console.warn(formatPrefix("warn"), ...args);
}

export function error(...args: unknown[]): void {
  console.error(formatPrefix("error"), ...args);
}
