import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../utils/colors';
import { TYPOGRAPHY, SPACING, RADIUS } from '../utils/theme';
import ECGLogo from './ECGLogo';

const Header = ({
  title,
  subtitle,
  onBack,
  rightAction,
  style,
  showLogo,
  role,
  activeTab,
  navigation,
  user,
}) => {
  const isDashboard = !onBack && title;
  const displayFullNav = (showLogo === true || isDashboard) && role && user && navigation;

  const patientTabs = [
    { key: 'Dashboard', label: 'Dashboard' },
    { key: 'Schedule', label: 'Schedule' },
    { key: 'History', label: 'History' },
    { key: 'Reminders', label: 'My Info' },
  ];
  const doctorTabs = [
    { key: 'Home', label: 'Dashboard' },
    { key: 'Prescriptions', label: 'New Prescription' },
  ];
  const tabs = role === 'DOCTOR' ? doctorTabs : patientTabs;

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <SafeAreaView edges={['top']} style={[styles.wrapper, style]}>
      {displayFullNav ? (
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark, COLORS.primaryDarker]}
          style={styles.gradient}
        >
          <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.left}>
                <ECGLogo size={22} color={COLORS.white} style={styles.ecg} />
                <Text style={styles.logoText}>MedLink</Text>
              </View>
              <View style={styles.navRow}>
                {tabs.map((tab) => (
                  <TouchableOpacity
                    key={tab.key}
                    onPress={() => navigation?.navigate(tab.key)}
                    style={styles.navLink}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.navText,
                        activeTab === tab.key && styles.navTextActive,
                      ]}
                    >
                      {tab.label}
                    </Text>
                    {activeTab === tab.key && <View style={styles.navUnderline} />}
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.right}>
                {rightAction}
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{initials}</Text>
                </View>
                <Text style={styles.userName} numberOfLines={1}>
                  {user?.name || 'User'}
                </Text>
              </View>
            </View>
            <View style={styles.greetingBlock}>
              <Text style={styles.greetingTitle} numberOfLines={1}>
                {title}
              </Text>
              {subtitle && (
                <Text style={styles.greetingSubtitle} numberOfLines={1}>
                  {subtitle}
                </Text>
              )}
            </View>
          </View>
        </LinearGradient>
      ) : (
        <View style={[styles.simpleBar, onBack && styles.simpleBarTeal]}>
          <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.left}>
                {onBack && (
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={onBack}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.backIcon}>←</Text>
                  </TouchableOpacity>
                )}
                <View>
                  <Text style={styles.title} numberOfLines={1}>
                    {title}
                  </Text>
                  {subtitle && (
                    <Text style={styles.subtitle} numberOfLines={1}>
                      {subtitle}
                    </Text>
                  )}
                </View>
              </View>
              {rightAction && <View style={styles.right}>{rightAction}</View>}
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  gradient: {
    paddingBottom: SPACING.lg,
    paddingTop: SPACING.sm,
  },
  simpleBar: {
    backgroundColor: COLORS.background,
  },
  simpleBarTeal: {
    backgroundColor: COLORS.primary,
  },
  container: {
    paddingHorizontal: SPACING.lg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  ecg: {
    marginRight: SPACING.sm,
  },
  logoText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.md,
  },
  navLink: {
    marginHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  navText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.9,
  },
  navTextActive: {
    opacity: 1,
    fontWeight: '600',
  },
  navUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: COLORS.white,
    borderRadius: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  userName: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    maxWidth: 100,
  },
  backButton: {
    marginRight: SPACING.md,
    padding: SPACING.xs,
  },
  backIcon: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '700',
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    color: COLORS.primaryLight,
    fontSize: 13,
    marginTop: 2,
  },
  greetingBlock: {
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
  },
  greetingTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '700',
  },
  greetingSubtitle: {
    color: COLORS.primaryLight,
    fontSize: 14,
    marginTop: 4,
  },
});

export default Header;
