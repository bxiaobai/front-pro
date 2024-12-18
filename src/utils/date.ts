// src/utils/date.ts

/**
 * 格式化日期为 YYYY-MM-DD 格式
 * @param date - 输入的日期对象
 * @returns 格式化后的日期字符串
 */
export const formatDateToYYYYMMDD = (date: Date | number): string => {
    const d = new Date(date);
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
};

/**
 * 格式化日期为 YYYY/MM/DD 格式
 * @param date - 输入的日期对象
 * @returns 格式化后的日期字符串
 */
export function formatDateToYYYYSlashMMSlashDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

/**
 * 格式化日期为 MM-DD-YYYY 格式
 * @param date - 输入的日期对象
 * @returns 格式化后的日期字符串
 */
export function formatDateToMMDDYYYY(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
}

/**
 * 格式化日期为 DD-MM-YYYY 格式
 * @param date - 输入的日期对象
 * @returns 格式化后的日期字符串
 */
export function formatDateToDDMMYYYY(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

/**
 * 获取当前日期的 YYYY-MM-DD 格式字符串
 * @returns 当前日期的格式化字符串
 */
export function getCurrentDateYYYYMMDD(): string {
  return formatDateToYYYYMMDD(new Date());
}

/**
 * 获取当前日期的 YYYY/MM/DD 格式字符串
 * @returns 当前日期的格式化字符串
 */
export function getCurrentDateYYYYSlashMMSlashDD(): string {
  return formatDateToYYYYSlashMMSlashDD(new Date());
}

/**
 * 获取当前日期的 MM-DD-YYYY 格式字符串
 * @returns 当前日期的格式化字符串
 */
export function getCurrentDateMMDDYYYY(): string {
  return formatDateToMMDDYYYY(new Date());
}

/**
 * 获取当前日期的 DD-MM-YYYY 格式字符串
 * @returns 当前日期的格式化字符串
 */
export function getCurrentDateDDMMYYYY(): string {
  return formatDateToDDMMYYYY(new Date());
}

/**
 * 将日期字符串解析为 Date 对象
 * @param dateString - 日期字符串，格式为 YYYY-MM-DD
 * @returns 解析后的 Date 对象
 */
export function parseDateFromYYYYMMDD(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}
