import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../utils/colors';
import { SPACING, TYPOGRAPHY, RADIUS, SHADOW } from '../utils/theme';

/**
 * Health Score Card with Circular Progress Indicator
 * Used in Patient Dashboard
 */
const HealthScoreCard = ({ score, factors, style }) => {
  // Determine color based on score
  const getScoreColor = (value) => {
    if (value >= 80) return COLORS.healthGood;
    if (value >= 60) return COLORS.healthModerate;
    return COLORS.healthRisk;
  };

  // Calculate stroke dash offset for circular progress
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = score / 100;
  const strokeDashoffset = circumference - progress * circumference;

  const scoreColor = getScoreColor(score);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.sectionTitle}>Health Score</Text>
      
      <View style={styles.content}>
        {/* Circular Progress */}
        <View style={styles.progressContainer}>
          <View style={[styles.circleContainer, { width: size, height: size }]}>
            {/* Background Circle */}
            <View
              style={[
                styles.circleBackground,
                {
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  borderWidth: strokeWidth,
                },
              ]}
            />
            {/* Progress Circle - Using border approach for React Native */}
            <View
              style={[
                styles.progressCircle,
                {
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  borderWidth: strokeWidth,
                  borderColor: scoreColor,
                },
              ]}
            />
            {/* Center Content */}
            <View style={styles.centerContent}>
              <Text style={[styles.scoreValue, { color: scoreColor }]}>
                {score}%
              </Text>
              <Text style={styles.scoreLabel}>
                {score >= 80 ? 'Good' : score >= 60 ? 'Moderate' : 'At Risk'}
              </Text>
            </View>
          </View>
        </View>

        {/* Factors List */}
        <View style={styles.factorsContainer}>
          {factors.map((factor, index) => (
            <View key={index} style={styles.factorItem}>
              <View
                style={[
                  styles.factorDot,
                  { backgroundColor: factor.color || COLORS.primary },
                ]}
              />
              <Text style={styles.factorLabel}>{factor.label}</Text>
              <Text style={styles.factorValue}>{factor.value}</Text>
            </View>
          ))}
        </View>
      </View>
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
    marginBottom: SPACING.lg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressContainer: {
    marginRight: SPACING.lg,
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circleBackground: {
    position: 'absolute',
    borderColor: COLORS.borderLight,
  },
  progressCircle: {
    position: 'absolute',
    borderColor: COLORS.primary,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  scoreLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  factorsContainer: {
    flex: 1,
  },
  factorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  factorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.sm,
  },
  factorLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    flex: 1,
  },
  factorValue: {
    ...TYPOGRAPHY.label,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
});

export default HealthScoreCard;
