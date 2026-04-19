import { format, parseISO } from "date-fns";
import { CURRENCY, DATE_FORMATS } from "./constants";

/**
 * Format number as currency
 * @param {number} value - The number to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = CURRENCY.CODE) => {
  if (value === null || value === undefined || isNaN(value)) {
    return `${CURRENCY.SYMBOL}0.00`;
  }

  return new Intl.NumberFormat(CURRENCY.LOCALE, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Format number with commas
 * @param {number} value - The number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (value) => {
  if (value === null || value === undefined || isNaN(value)) {
    return "0";
  }

  return new Intl.NumberFormat(CURRENCY.LOCALE).format(value);
};

/**
 * Format date to display format
 * @param {string|Date} date - Date to format
 * @param {string} formatStr - Format string (default: 'MMM dd, yyyy')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, formatStr = DATE_FORMATS.DISPLAY) => {
  if (!date) return "-";

  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return format(dateObj, formatStr);
  } catch (/* eslint-disable no-unused-vars */ _) {
    // Ignore error and return default
    return "-";
  }
};

/**
 * Format date with time
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string with time
 */
export const formatDateTime = (date) => {
  return formatDate(date, DATE_FORMATS.DISPLAY_WITH_TIME);
};

/**
 * Format percentage
 * @param {number} value - Value to format as percentage
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined || isNaN(value)) {
    return "0%";
  }

  return `${value.toFixed(decimals)}%`;
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Format file size
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Format phone number
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return "";

  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return phone;
};

/**
 * Calculate percentage change
 * @param {number} current - Current value
 * @param {number} previous - Previous value
 * @returns {number} Percentage change
 */
export const calculatePercentageChange = (current, previous) => {
  if (!previous || previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Format order ID
 * @param {string|number} id - Order ID
 * @returns {string} Formatted order ID
 */
export const formatOrderId = (id) => {
  if (!id) return "";
  return `#${String(id).padStart(6, "0")}`;
};

/**
 * Format customer name
 * @param {Object} customer - Customer object with firstName and lastName
 * @returns {string} Full name
 */
export const formatCustomerName = (customer) => {
  if (!customer) return "";
  const { firstName, lastName } = customer;
  if (!firstName && !lastName) return "";
  return `${firstName || ""} ${lastName || ""}`.trim();
};
