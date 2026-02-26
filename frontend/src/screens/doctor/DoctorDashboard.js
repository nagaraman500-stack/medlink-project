import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import EnhancedStatsCard from '../../components/EnhancedStatsCard';
import QuickActionsPanel from '../../components/QuickActionsPanel';
import SmartAlerts from '../../components/SmartAlerts';
import PrescriptionCard from '../../components/PrescriptionCard';
import CustomButton from '../../components/CustomButton';
import prescriptionService from '../../services/prescriptionService';
import COLORS from '../../utils/colors';
import { SPACING, TYPOGRAPHY, RADIUS, SHADOW } from '../../utils/theme';

const DoctorDashboard = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const doctorId = user?.profileId;

  const loadData = async () => {
    if (!doctorId) return;
    try {
      const data = await prescriptionService.getByDoctor(doctorId);
      setPrescriptions(data);
      
      // Generate smart alerts based on prescription data
      const generatedAlerts = generateAlerts(data);
      setAlerts(generatedAlerts);
    } catch (err) {
      console.error('Doctor dashboard error:', err);
    } finally {
      setRefreshing(false);
    }
  };

  const generateAlerts = (prescriptions) => {
    const alerts = [];
    const now = new Date();
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    
    prescriptions.forEach((p) => {
      const endDate = new Date(p.endDate);
      
      // Check for expiring prescriptions
      if (endDate <= threeDaysFromNow && endDate >= now && p.status === 'ACTIVE') {
        alerts.push({
          type: 'expiring',
          title: `Prescription expiring soon`,
          description: `${p.medicationName} for ${p.patientName} expires on ${endDate.toLocaleDateString()}`,
          prescriptionId: p.id,
        });
      }
    });
    
    return alerts.slice(0, 5); // Limit to 5 alerts
  };

  useFocusEffect(useCallback(() => {
    loadData();
  }, []));

  const activeCount = prescriptions.filter((p) => p.status === 'ACTIVE').length;
  const completedCount = prescriptions.filter(
    (p) => p.status === 'COMPLETED'
  ).length;
  const uniquePatients = new Set(prescriptions.map((p) => p.patientId)).size;
  
  // Calculate expiring soon (within 3 days)
  const now = new Date();
  const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const expiringSoonCount = prescriptions.filter(
    (p) => {
      const endDate = new Date(p.endDate);
      return endDate <= threeDaysFromNow && endDate >= now && p.status === 'ACTIVE';
    }
  ).length;

  // Quick actions configuration
  const quickActions = [
    { icon: '➕', label: 'New Prescription', onPress: () => navigation.navigate('CreatePrescription') },
    { icon: '👤', label: 'Add Patient', onPress: () => navigation.navigate('PatientList') },
    { icon: '📊', label: 'View Reports', onPress: () => {} },
    { icon: '🔍', label: 'Search Patient', onPress: () => navigation.navigate('PatientList') },
  ];

  return (
    <View style={styles.container}>
      <Header
        title={`Welcome, Dr. ${user?.name?.split(' ')[0] || 'Doctor'}!`}
        subtitle="Manage your patients' prescriptions"
        role="DOCTOR"
        activeTab="Home"
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
        {/* Enhanced Stats Cards Row */}
        <View style={styles.statsRow}>
          <EnhancedStatsCard
            title="Total Patients"
            value={uniquePatients}
            subtitle="Active patients"
            icon="👥"
            gradientColors={[COLORS.primary, COLORS.primaryDark]}
            size="medium"
          />
          <EnhancedStatsCard
            title="Active Rx"
            value={activeCount}
            subtitle="Current prescriptions"
            icon="📋"
            gradientColors={[COLORS.success, COLORS.successDark]}
            size="medium"
          />
          <EnhancedStatsCard
            title="Completed"
            value={completedCount}
            subtitle="Finished treatments"
            icon="✅"
            gradientColors={[COLORS.info, COLORS.infoDark]}
            size="medium"
          />
          <EnhancedStatsCard
            title="Expiring Soon"
            value={expiringSoonCount}
            subtitle="Within 3 days"
            icon="⏰"
            gradientColors={[COLORS.warning, COLORS.warningDark]}
            size="medium"
            alert={expiringSoonCount > 0}
          />
        </View>

        {/* Quick Actions Panel */}
        <QuickActionsPanel actions={quickActions} />

        {/* Smart Alerts Section */}
        {alerts.length > 0 && (
          <SmartAlerts 
            alerts={alerts} 
            onAlertPress={(alert) => {
              // Navigate to prescription detail
              const prescription = prescriptions.find(p => p.id === alert.prescriptionId);
              if (prescription) {
                navigation.navigate('PrescriptionDetail', { prescription });
              }
            }}
          />
        )}

        {/* Recent Prescriptions Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Prescriptions</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreatePrescription')}>
              <Text style={styles.viewAllLink}>View All →</Text>
            </TouchableOpacity>
          </View>
          {prescriptions.length === 0 ? (
            <View style={styles.empty}>
              <View style={styles.emptyIconContainer}>
                <Text style={styles.emptyIcon}>📋</Text>
              </View>
              <Text style={styles.emptyTitle}>No prescriptions yet</Text>
              <Text style={styles.emptyText}>
                Start by creating your first prescription for a patient
              </Text>
              <CustomButton
                title="Create Prescription"
                onPress={() => navigation.navigate('CreatePrescription')}
                style={styles.createBtn}
              />
            </View>
          ) : (
            prescriptions.slice(0, 5).map((p) => (
              <PrescriptionCard
                key={p.id}
                prescription={p}
                role="DOCTOR"
                onPress={() =>
                  navigation.navigate('PrescriptionDetail', { prescription: p })
                }
              />
            ))
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePrescription')}
        activeOpacity={0.9}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
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
    paddingBottom: 120 
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
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
  empty: {
    alignItems: 'center',
    padding: SPACING.xxl,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  emptyIcon: { 
    fontSize: 36 
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
    marginBottom: SPACING.lg,
  },
  createBtn: { 
    paddingHorizontal: SPACING.xl 
  },
  fab: {
    position: 'absolute',
    right: SPACING.xl,
    bottom: SPACING.xl,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.card,
  },
  fabText: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: '300',
    lineHeight: 36,
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

export default DoctorDashboard;
