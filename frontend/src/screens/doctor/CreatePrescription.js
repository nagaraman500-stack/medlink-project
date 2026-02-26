import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import prescriptionService from '../../services/prescriptionService';
import COLORS from '../../utils/colors';
import { FREQUENCY_OPTIONS } from '../../utils/constants';
import { SPACING, TYPOGRAPHY, RADIUS, SHADOW } from '../../utils/theme';

const CreatePrescription = ({ navigation, route }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    patientId: route?.params?.patientId || '',
    patientName: route?.params?.patientName || '',
    diagnosis: '',
    notes: '',
    expiryDate: '',
  });
  const [medications, setMedications] = useState([
    {
      medicationName: '',
      dosage: '',
      frequency: 'ONCE_DAILY',
      instructions: '',
      durationDays: 7,
    },
  ]);

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));
  const setMed = (index, key, val) => {
    setMedications((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [key]: val } : m))
    );
  };

  const addMedication = () => {
    setMedications((prev) => [
      ...prev,
      {
        medicationName: '',
        dosage: '',
        frequency: 'ONCE_DAILY',
        instructions: '',
        durationDays: 7,
      },
    ]);
  };

  const removeMedication = (index) => {
    if (medications.length === 1) return;
    setMedications((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!form.patientId.trim()) {
      Alert.alert('Error', 'Patient ID is required');
      return;
    }
    if (!form.diagnosis.trim()) {
      Alert.alert('Error', 'Diagnosis is required');
      return;
    }
    if (medications.some((m) => !m.medicationName.trim())) {
      Alert.alert('Error', 'All medications need a name');
      return;
    }

    setLoading(true);
    try {
      const prescription = {
        doctorId: user.profileId,
        doctorName: user.name,
        ...form,
        expiryDate: form.expiryDate || getDefaultExpiry(),
        medications,
      };
      await prescriptionService.create(prescription);
      Alert.alert('Success', 'Prescription created!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const getDefaultExpiry = () => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  };

  const showBack = navigation.canGoBack();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <Header
          title={showBack ? 'New Prescription' : 'New Prescription'}
          subtitle={showBack ? undefined : 'Create a prescription for your patient'}
          onBack={showBack ? () => navigation.goBack() : undefined}
          role={!showBack ? 'DOCTOR' : undefined}
          activeTab={!showBack ? 'Prescriptions' : undefined}
          navigation={!showBack ? navigation : undefined}
          user={!showBack ? user : undefined}
        />

        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Form Card */}
          <View style={styles.formCard}>
            {/* Patient Info */}
            <Text style={styles.sectionTitle}>Patient Information</Text>
            <InputField
              label="Patient ID"
              value={form.patientId}
              onChangeText={(v) => set('patientId', v)}
              placeholder="Enter patient ID"
            />
            <InputField
              label="Patient Name"
              value={form.patientName}
              onChangeText={(v) => set('patientName', v)}
              placeholder="Patient full name"
            />

            {/* Diagnosis */}
            <Text style={styles.sectionTitle}>Diagnosis & Notes</Text>
            <InputField
              label="Diagnosis"
              value={form.diagnosis}
              onChangeText={(v) => set('diagnosis', v)}
              placeholder="e.g., Type 2 Diabetes, Hypertension"
            />
            <InputField
              label="Doctor's Notes (Optional)"
              value={form.notes}
              onChangeText={(v) => set('notes', v)}
              placeholder="Additional instructions..."
              multiline
              numberOfLines={3}
            />
            <InputField
              label="Expiry Date (YYYY-MM-DD)"
              value={form.expiryDate}
              onChangeText={(v) => set('expiryDate', v)}
              placeholder={getDefaultExpiry()}
            />

            {/* Medications */}
            <Text style={styles.sectionTitle}>Medications</Text>
            {medications.map((med, index) => (
              <View key={index} style={styles.medCard}>
                <View style={styles.medHeader}>
                  <Text style={styles.medNum}>Medication #{index + 1}</Text>
                  {medications.length > 1 && (
                    <TouchableOpacity onPress={() => removeMedication(index)}>
                      <Text style={styles.removeBtn}>✕ Remove</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <InputField
                  label="Medicine Name"
                  value={med.medicationName}
                  onChangeText={(v) => setMed(index, 'medicationName', v)}
                  placeholder="e.g., Metformin"
                />
                <InputField
                  label="Dosage"
                  value={med.dosage}
                  onChangeText={(v) => setMed(index, 'dosage', v)}
                  placeholder="e.g., 500mg"
                />
                <Text style={styles.label}>Frequency</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.freqScroll}
                >
                  {FREQUENCY_OPTIONS.map((f) => (
                    <TouchableOpacity
                      key={f.value}
                      style={[
                        styles.freqChip,
                        med.frequency === f.value && styles.freqActive,
                      ]}
                      onPress={() => setMed(index, 'frequency', f.value)}
                      activeOpacity={0.85}
                    >
                      <Text
                        style={[
                          styles.freqText,
                          med.frequency === f.value && styles.freqTextActive,
                        ]}
                      >
                        {f.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <InputField
                  label="Instructions"
                  value={med.instructions}
                  onChangeText={(v) => setMed(index, 'instructions', v)}
                  placeholder="e.g., After meals"
                />
                <InputField
                  label="Duration (Days)"
                  value={String(med.durationDays)}
                  onChangeText={(v) =>
                    setMed(index, 'durationDays', parseInt(v) || 7)
                  }
                  keyboardType="numeric"
                  placeholder="7"
                />
              </View>
            ))}
            <CustomButton
              title="+ Add Another Medication"
              variant="outline"
              onPress={addMedication}
            />
          </View>

          <View style={styles.submitSection}>
            <CustomButton
              title="Create Prescription"
              onPress={handleSubmit}
              loading={loading}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  scrollContent: { padding: SPACING.lg, paddingBottom: SPACING.xxxl },
  formCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
    ...SHADOW.card,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    marginTop: SPACING.sm,
  },
  sectionTitleFirst: { marginTop: 0 },
  medCard: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  medHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  medNum: {
    ...TYPOGRAPHY.label,
    color: COLORS.primary,
  },
  removeBtn: {
    color: COLORS.danger,
    fontWeight: '600',
    fontSize: 13,
  },
  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  freqScroll: { marginBottom: SPACING.md },
  freqChip: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.background,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  freqActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  freqText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  freqTextActive: { color: COLORS.white },
  submitSection: { paddingHorizontal: 0 },
});

export default CreatePrescription;
