import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../utils/colors';
import { SPACING, TYPOGRAPHY, RADIUS, SHADOW } from '../utils/theme';

/**
 * Smart Alerts Panel - Shows attention-required items
 * Used in Doctor Dashboard
 */
const SmartAlerts = ({ alerts, onAlertPress, style }) => {
  if (!alerts || alerts.length === 0) return null;

  const getAlertIcon = (type) => {
    const icons = {
      expiring: '⏰',
      missed: '❌',
      unreviewed: '👁️',
      low_adherence: '📉',
      default: '⚠️',
    };
    return icons[type] || icons.default;
  };

  const getAlertColor = (type) => {
    const colors = {
      expiring: COLORS.warning,
      missed: COLORS.danger,
      unreviewed: COLORS.info,
      low_adherence: COLORS.warning,
      default: COLORS.warning,
    };
    return colors[type] || colors.default;
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>⚠️</Text>
        <Text style={styles.headerTitle}>Attention Required</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{alerts.length}</Text>
        </View>
      </View>
      
      {alerts.map((alert, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onAlertPress && onAlertPress(alert)}
          activeOpacity={0.8}
          style={styles.alertItem}
        >
          <View style={[styles.leftBorder, { backgroundColor: getAlertColor(alert.type) }]} />
          <View style={styles.alertContent}>
            <Text style={styles.alertIcon}>{getAlertIcon(alert.type)}</Text>
            <View style={styles.alertTextContainer}>
              <Text style={styles.alertTitle} numberOfLines={1}>
                {alert.title}
              </Text>
              <Text style={styles.alertDescription} numberOfLines={2}>
                {alert.description}
              </Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOW.card,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.warningLight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerIcon: {
    fontSize: 18,
    marginRight: SPACING.sm,
  },
  headerTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    flex: 1,
  },
  badge: {
    backgroundColor: COLORS.warning,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  alertItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
  },
  leftBorder: {
    width: 4,
  },
  alertContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  alertIcon: {
    fontSize: 20,
    marginRight: SPACING.md,
  },
  alertTextContainer: {
    flex: 1,
  },
  alertTitle: {
    ...TYPOGRAPHY.label,
    color: COLORS.textPrimary,
    fontSize: 14,
    marginBottom: 2,
  },
  alertDescription: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  arrow: {
    fontSize: 18,
    color: COLORS.textLight,
    marginLeft: SPACING.sm,
  },
});

export default SmartAlerts;
