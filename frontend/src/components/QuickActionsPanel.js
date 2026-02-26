import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../utils/colors';
import { SPACING, TYPOGRAPHY, RADIUS, SHADOW } from '../utils/theme';

/**
 * Quick Actions Panel for Doctor Dashboard
 * Horizontal scrollable action buttons
 */
const QuickActionsPanel = ({ actions, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            onPress={action.onPress}
            activeOpacity={0.8}
            style={styles.actionButton}
          >
            <LinearGradient
              colors={['rgba(15, 118, 110, 0.1)', 'rgba(15, 118, 110, 0.05)']}
              style={styles.gradient}
            >
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>{action.icon}</Text>
              </View>
              <Text style={styles.label}>{action.label}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOW.card,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  scrollContent: {
    paddingRight: SPACING.lg,
    gap: SPACING.md,
  },
  actionButton: {
    marginRight: SPACING.md,
  },
  gradient: {
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    minWidth: 100,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(15, 118, 110, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  icon: {
    fontSize: 18,
  },
  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default QuickActionsPanel;
