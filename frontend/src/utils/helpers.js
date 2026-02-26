import { format, parseISO, isToday, isPast, isFuture } from 'date-fns';

export const formatDate = (date) => {
  if (!date) return '';
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, 'dd MMM yyyy');
  } catch {
    return '';
  }
};

export const formatDateTime = (date) => {
  if (!date) return '';
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, 'dd MMM yyyy, hh:mm a');
  } catch {
    return '';
  }
};

export const formatTime = (timeStr) => {
  return timeStr || '';
};

export const isExpired = (dateStr) => {
  if (!dateStr) return false;
  try {
    return isPast(parseISO(dateStr));
  } catch {
    return false;
  }
};

export const daysUntilExpiry = (dateStr) => {
  if (!dateStr) return null;
  try {
    const expiry = parseISO(dateStr);
    const now = new Date();
    const diff = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    return diff;
  } catch {
    return null;
  }
};

export const getAdherenceColor = (rate) => {
  if (rate >= 80) return '#4CAF50';
  if (rate >= 60) return '#F59E0B';
  return '#DC2626';
};

export const getStatusColor = (status) => {
  const map = {
    ACTIVE: '#4CAF50',
    COMPLETED: '#64748B',
    CANCELLED: '#DC2626',
    TAKEN: '#4CAF50',
    MISSED: '#DC2626',
    SKIPPED: '#F59E0B',
    PENDING: '#94A3B8',
  };
  return map[status] || '#94A3B8';
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
