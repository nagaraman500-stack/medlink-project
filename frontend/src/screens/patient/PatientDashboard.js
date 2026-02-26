import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import EnhancedStatsCard from '../../components/EnhancedStatsCard';
import HealthScoreCard from '../../components/HealthScoreCard';
import MedicationCard from '../../components/MedicationCard';
import PrescriptionCard from '../../components/PrescriptionCard';
import CustomButton from '../../components/CustomButton';
import medicationService from '../../services/medicationService';
import prescriptionService from '../../services/prescriptionService';
import COLORS from '../../utils/colors';
import { SPACING, TYPOGRAPHY, RADIUS, SHADOW } from '../../utils/theme';

const PatientDashboard = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [todayMeds, setTodayMeds] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [adherence, setAdherence] = useState({
    taken: 0,
    missed: 0,
    adherenceRate: 0,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const patientId = user?.profileId;

  const loadData = async () => {
    if (!patientId) return;
    try {
      const [meds, prescr, adh] = await Promise.all([
        medicationService.getTodayIntakes(patientId),
        prescriptionService.getActiveByPatient(patientId),
        medicationService.getAdherence(patientId),
      ]);
      setTodayMeds(meds);
      setPrescriptions(prescr);
      setAdherence(adh);
    } catch (error) {
      console.error('Dashboard load error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(useCallback(() => {
    loadData();
  }, []));

  const handleTake = async (med) => {
    try {
      await medicationService.updateIntakeStatus(med.id, 'TAKEN');
      loadData();
    } catch (err) {
      Alert.alert('Error', 'Could not update status');
    }
  };

  const handleSkip = async (med) => {
    try {
      await medicationService.updateIntakeStatus(med.id, 'SKIPPED');
      loadData();
    } catch (err) {
      Alert.alert('Error', 'Could not update status');
    }
  };

  const pendingCount = todayMeds.filter((m) => m.status === 'PENDING').length;
  const takenToday = todayMeds.filter((m) => m.status === 'TAKEN').length;

  return (
    <View style={styles.container}>
      <Header
        title={`Welcome back, ${user?.name || 'Patient'}!`}
        subtitle="Here's your health overview for today"
        role="PATIENT"
        activeTab="Dashboard"
        navigation={navigation}
        user={user}
        rightAction={
          <TouchableOpacity onPress={logout} style={styles.logoutBtn} activeOpacity={0.8}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              loadData();
            }}
          />
        }
      >
        {/* Hero Welcome Section with Profile */}
        <LinearGradient
          colors={[COLORS.gradientStart, COLORS.gradientEnd]}
          style={styles.heroSection}
        >
          <View style={styles.heroContent}>
            <View style={styles.profileSection}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'}
                </Text>
              </View>
              <View style={styles.welcomeText}>
                <Text style={styles.greeting}>Welcome back,</Text>
                <Text style={styles.userName}>{user?.name || 'Patient'}</Text>
              </View>
            </View>
            
            <View style={styles.heroActions}>
              <TouchableOpacity 
                style={styles.heroButton}
                onPress={() => navigation.navigate('IntakeLog')}
              >
                <Text style={styles.heroButtonText}>Add Reading</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.heroButton, styles.heroButtonOutline]}
                onPress={() => navigation.navigate('MedicationSchedule')}
              >
                <Text style={[styles.heroButtonText, styles.heroButtonTextOutline]}>View Trends</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* Health Score Card */}
        <HealthScoreCard
          score={adherence.adherenceRate}
          factors={[
            { label: 'Medication Adherence', value: `${adherence.adherenceRate}%`, color: COLORS.success },
            { label: 'Taken Today', value: `${takenToday}/${todayMeds.length}`, color: COLORS.info },
            { label: 'Missed Doses', value: `${adherence.missed || 0}`, color: COLORS.danger },
          ]}
        />

        {/* Enhanced Stats Row */}
        <View style={styles.statsRow}>
          <EnhancedStatsCard
            title="Taken Today"
            value={takenToday}
            subtitle={`of ${todayMeds.length} medications`}
            icon="✓"
            gradientColors={[COLORS.success, COLORS.successDark]}
            size="small"
          />
          <EnhancedStatsCard
            title="Pending"
            value={pendingCount}
            subtitle="Remaining today"
            icon="⏰"
            gradientColors={[COLORS.warning, COLORS.warningDark]}
            size="small"
          />
          <EnhancedStatsCard
            title="Adherence"
            value={`${adherence.adherenceRate}%`}
            subtitle="This week"
            icon="📊"
            gradientColors={[COLORS.primary, COLORS.primaryDark]}
            size="small"
          />
        </View>

        {/* Today's Medication Schedule */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MedicationSchedule')}>
              <Text style={styles.viewAllLink}>View All →</Text>
            </TouchableOpacity>
          </View>

          {todayMeds.length === 0 ? (
            <View style={styles.empty}>
              <View style={styles.emptyPillOutline}>
                <Text style={styles.emptyPillIcon}>💊</Text>
              </View>
              <Text style={styles.emptyTitle}>No medications today</Text>
              <Text style={styles.emptyText}>
                Your doctor will prescribe medications for you
              </Text>
            </View>
          ) : (
            <View style={styles.medicationList}>
              {todayMeds.map((med) => (
                <MedicationCard
                  key={med.id}
                  medication={med}
                  onTake={handleTake}
                  onSkip={handleSkip}
                />
              ))}
            </View>
          )}
        </View>

        {/* Recent Prescriptions */}
        {prescriptions.length > 0 && (
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Prescriptions</Text>
            </View>
            {prescriptions.slice(0, 3).map((p) => (
              <PrescriptionCard
                key={p.id}
                prescription={p}
                role="PATIENT"
                onPress={() =>
                  navigation.navigate('PrescriptionDetail', { prescription: p })
                }
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  scroll: { 
    flex: 1 
  },
  scrollContent: { 
    paddingBottom: SPACING.xxxl 
  },
  heroSection: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: RADIUS.lg,
    ...SHADOW.card,
  },
  heroContent: {
    padding: SPACING.xl,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
  },
  welcomeText: {
    flex: 1,
  },
  greeting: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 2,
  },
  userName: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '700',
  },
  heroActions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  heroButton: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
    flex: 1,
    alignItems: 'center',
  },
  heroButtonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
  heroButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  heroButtonTextOutline: {
    color: COLORS.white,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.sm,
    gap: SPACING.md,
  },
  sectionCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
    ...SHADOW.card,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  viewAllLink: {
    ...TYPOGRAPHY.label,
    color: COLORS.primary,
    fontSize: 14,
  },
  medicationList: {
    gap: SPACING.md,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyPillOutline: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  emptyPillIcon: {
    fontSize: 40,
    opacity: 0.5,
  },
  emptyTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  emptyText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  logoutBtn: {
    marginRight: SPACING.md,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  logoutText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default PatientDashboard;
