import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../utils/colors';
import { SPACING, TYPOGRAPHY, RADIUS, SHADOW } from '../utils/theme';

/**
 * Enhanced Stats Card with gradient background, icon, and smooth animations
 * Used in both Doctor and Patient dashboards
 */
const EnhancedStatsCard = ({
  title,
  value,
  subtitle,
  icon,
  gradientColors,
  onPress,
  style,
  size = 'medium', // 'small', 'medium', 'large'
  alert = false,
}) => {
  // Default gradient if not provided
  const defaultGradient = [COLORS.primary, COLORS.primaryDark];
  const colors = gradientColors || defaultGradient;

  const sizeStyles = {
    small: { padding: SPACING.md, minWidth: 100 },
    medium: { padding: SPACING.lg, minWidth: 140 },
    large: { padding: SPACING.xl, minWidth: 180 },
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.container, sizeStyles[size], style]}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, alert && styles.alertBorder]}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>{icon}</Text>
          </View>
          <Text style={styles.value} numberOfLines={1}>
            {value}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
        {alert && <View style={styles.alertIndicator} />}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.lg,
    ...SHADOW.card,
    transform: [{ scale: 1 }],
  },
  gradient: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  content: {
    padding: SPACING.lg,
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  icon: {
    fontSize: 20,
  },
  value: {
    ...TYPOGRAPHY.h1,
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  title: {
    ...TYPOGRAPHY.label,
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '500',
  },
  subtitle: {
    ...TYPOGRAPHY.caption,
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    marginTop: 2,
  },
  alertBorder: {
    borderWidth: 2,
    borderColor: COLORS.warning,
  },
  alertIndicator: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.warning,
  },
});

export default EnhancedStatsCard;
