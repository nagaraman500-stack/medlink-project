import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../utils/colors';
import { SPACING, RADIUS, SHADOW } from '../utils/theme';

const CustomButton = ({
  title,
  onPress,
  style,
  textStyle,
  loading = false,
  disabled = false,
  variant = 'primary',
  icon,
  useGradient = false,
}) => {
  const getButtonStyle = () => {
    const base = [styles.button];
    if (variant === 'secondary') base.push(styles.secondary);
    if (variant === 'outline') base.push(styles.outline);
    if (variant === 'danger') base.push(styles.danger);
    if (disabled || loading) base.push(styles.disabled);
    if (style) base.push(style);
    return base;
  };

  const getTextStyle = () => {
    const base = [styles.text];
    if (variant === 'outline') base.push(styles.outlineText);
    if (textStyle) base.push(textStyle);
    return base;
  };

  const content = loading ? (
    <ActivityIndicator color={variant === 'outline' ? COLORS.primary : COLORS.white} />
  ) : (
    <View style={styles.content}>
      {icon && <View style={styles.iconWrapper}>{icon}</View>}
      <Text style={getTextStyle()}>{title}</Text>
    </View>
  );

  if (variant === 'primary' && useGradient && !disabled && !loading) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={[styles.button, styles.buttonGradientWrap, style]}
      >
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <View style={styles.gradientContent}>{content}</View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    ...SHADOW.button,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
    shadowColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowOpacity: 0,
    elevation: 0,
  },
  danger: {
    backgroundColor: COLORS.danger,
    shadowColor: COLORS.danger,
  },
  disabled: {
    opacity: 0.6,
  },
  buttonGradientWrap: {
    overflow: 'hidden',
  },
  gradientContent: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  outlineText: {
    color: COLORS.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  iconWrapper: {
    marginRight: SPACING.xs,
  },
});

export default CustomButton;
