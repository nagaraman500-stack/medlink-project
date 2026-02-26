import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../utils/colors';
import { getStatusColor } from '../utils/helpers';
import { TYPOGRAPHY, SPACING, RADIUS, SHADOW } from '../utils/theme';

const MedicationCard = ({ medication, onTake, onSkip, showActions = true }) => {
  const statusColor = getStatusColor(medication.status);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.pillIcon}>
          <Text style={styles.pillEmoji}>💊</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{medication.medicationName}</Text>
          <Text style={styles.dosage}>{medication.dosage}</Text>
          <Text style={styles.time}>{medication.scheduledTime}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '18' }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {medication.status}
          </Text>
        </View>
      </View>

      {medication.instructions && (
        <Text style={styles.instructions}>ℹ️ {medication.instructions}</Text>
      )}

      {showActions && medication.status === 'PENDING' && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.takeBtn]}
            onPress={() => onTake && onTake(medication)}
            activeOpacity={0.85}
          >
            <Text style={styles.takeBtnText}>✓ Taken</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.skipBtn]}
            onPress={() => onSkip && onSkip(medication)}
            activeOpacity={0.85}
          >
            <Text style={styles.skipBtnText}>Skip</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginVertical: SPACING.sm,
    ...SHADOW.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pillIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  pillEmoji: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  name: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    fontSize: 16,
  },
  dosage: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  time: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  instructions: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    padding: SPACING.sm,
    backgroundColor: COLORS.accentLight,
    borderRadius: RADIUS.sm,
  },
  actions: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  takeBtn: {
    backgroundColor: COLORS.secondary,
  },
  skipBtn: {
    backgroundColor: COLORS.background,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  takeBtnText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  skipBtnText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
    fontSize: 14,
  },
});

export default MedicationCard;
