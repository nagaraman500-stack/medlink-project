import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../utils/colors';
import { TYPOGRAPHY, SPACING, RADIUS, SHADOW } from '../utils/theme';

/**
 * variant: 'default' (white card, colored value) | 'filled' (colored card, white text)
 */
const StatsCard = ({
  title,
  value,
  subtitle,
  color = COLORS.primary,
  icon,
  style,
  variant = 'default',
}) => {
  const isFilled = variant === 'filled';

  return (
    <View
      style={[
        styles.card,
        isFilled && { backgroundColor: color },
        style,
        isFilled && styles.cardFilled,
      ]}
    >
      {icon && (
        <View style={styles.iconWrap}>
          <Text style={[styles.icon, isFilled && styles.iconWhite]}>{icon}</Text>
        </View>
      )}
      <Text
        style={[
          styles.value,
          isFilled ? styles.valueWhite : { color },
        ]}
      >
        {value}
      </Text>
      <Text style={[styles.title, isFilled && styles.textWhite]}>{title}</Text>
      {subtitle && (
        <Text style={[styles.subtitle, isFilled && styles.textWhiteLight]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: SPACING.xs,
    ...SHADOW.card,
  },
  cardFilled: {
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  iconWrap: {
    marginBottom: SPACING.sm,
  },
  icon: {
    fontSize: 22,
  },
  iconWhite: {
    color: COLORS.white,
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
  },
  valueWhite: {
    color: COLORS.white,
  },
  title: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  textWhite: {
    color: COLORS.white,
    fontWeight: '600',
  },
  subtitle: {
    ...TYPOGRAPHY.captionSmall,
    color: COLORS.textLight,
    marginTop: 2,
    textAlign: 'center',
  },
  textWhiteLight: {
    color: 'rgba(255,255,255,0.9)',
  },
});

export default StatsCard;
