// Romanian number and date formatting helpers.
// RO uses "." as thousands separator and "," as decimal separator.

export function formatRON(value: number, opts?: { decimals?: number; suffix?: string }) {
  const decimals = opts?.decimals ?? 2;
  const formatted = new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
  return `${formatted}${opts?.suffix ?? " RON"}`;
}

export function formatNumber(value: number, decimals = 0) {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

const MONTHS_RO = [
  "ianuarie", "februarie", "martie", "aprilie", "mai", "iunie",
  "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie",
];

export function formatDateShort(iso: string) {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${d.getFullYear()}`;
}

export function formatDateLong(iso: string) {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS_RO[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatDayMonth(iso: string) {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS_RO[d.getMonth()]}`;
}
