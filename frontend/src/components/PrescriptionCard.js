import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../utils/colors';
import { formatDate, getStatusColor, daysUntilExpiry } from '../utils/helpers';
import { TYPOGRAPHY, SPACING, RADIUS, SHADOW } from '../utils/theme';

const PrescriptionCard = ({ prescription, onPress, role }) => {
  const statusColor = getStatusColor(prescription.status);
  const daysLeft = daysUntilExpiry(prescription.expiryDate);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress && onPress(prescription)}
      activeOpacity={0.85}
    >
      <View style={[styles.accentBar, { backgroundColor: COLORS.primary }]} />
      <View style={styles.inner}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.diagnosis}>{prescription.diagnosis}</Text>
            <Text style={styles.sub}>
              {role === 'DOCTOR'
                ? `Patient: ${prescription.patientName}`
                : `Dr. ${prescription.doctorName}`}
            </Text>
          </View>
          <View style={[styles.badge, { backgroundColor: statusColor + '18' }]}>
            <Text style={[styles.badgeText, { color: statusColor }]}>
              {prescription.status}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.footer}>
          <View style={styles.dateInfo}>
            <Text style={styles.label}>Prescribed</Text>
            <Text style={styles.value}>{formatDate(prescription.prescribedDate)}</Text>
          </View>
          <View style={styles.dateInfo}>
            <Text style={styles.label}>Expires</Text>
            <Text
              style={[
                styles.value,
                daysLeft !== null && daysLeft > 0 && daysLeft <= 7 ? styles.expiringSoon : {},
              ]}
            >
              {formatDate(prescription.expiryDate)}
            </Text>
          </View>
          <View style={styles.medCount}>
            <Text style={styles.countNumber}>{prescription.medications?.length || 0}</Text>
            <Text style={styles.countLabel}>Medications</Text>
          </View>
        </View>

        {daysLeft !== null &&
          daysLeft > 0 &&
          daysLeft <= 7 &&
          prescription.status === 'ACTIVE' && (
            <View style={styles.warning}>
              <Text style={styles.warningText}>
                ⚠️ Expires in {daysLeft} day{daysLeft !== 1 ? 's' : ''}
              </Text>
            </View>
          )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    marginVertical: SPACING.sm,
    overflow: 'hidden',
    ...SHADOW.card,
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  inner: {
    padding: SPACING.lg,
    paddingLeft: SPACING.lg + 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    flex: 1,
  },
  diagnosis: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    fontSize: 16,
  },
  sub: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    marginLeft: SPACING.sm,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInfo: {},
  label: {
    ...TYPOGRAPHY.captionSmall,
    color: COLORS.textLight,
    textTransform: 'uppercase',
  },
  value: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginTop: 2,
  },
  expiringSoon: {
    color: COLORS.accent,
  },
  medCount: {
    alignItems: 'center',
  },
  countNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
  },
  countLabel: {
    ...TYPOGRAPHY.captionSmall,
    color: COLORS.textLight,
  },
  warning: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.accentLight,
    padding: SPACING.sm,
    borderRadius: RADIUS.sm,
  },
  warningText: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default PrescriptionCard;
