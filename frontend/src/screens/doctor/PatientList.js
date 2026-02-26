import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import { api } from '../../services/api';
import COLORS from '../../utils/colors';
import { SPACING, TYPOGRAPHY, RADIUS, SHADOW } from '../../utils/theme';

const PatientList = ({ navigation }) => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadPatients = async () => {
    try {
      const data = await api.get(`/patient/doctor/${user.profileId}`);
      setPatients(data);
      setFiltered(data);
    } catch (err) {
      console.error('Load patients error:', err);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(useCallback(() => {
    loadPatients();
  }, []));

  const handleSearch = (text) => {
    setSearch(text);
    if (!text) {
      setFiltered(patients);
    } else {
      setFiltered(
        patients.filter(
          (p) =>
            p.name.toLowerCase().includes(text.toLowerCase()) ||
            (p.email && p.email.toLowerCase().includes(text.toLowerCase()))
        )
      );
    }
  };

  const renderPatient = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('CreatePrescription', {
          patientId: item.id,
          patientName: item.name,
        })
      }
      activeOpacity={0.85}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.name?.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.detail}>{item.email}</Text>
        {item.bloodGroup && (
          <Text style={styles.detail}>Blood: {item.bloodGroup}</Text>
        )}
        {item.chronicConditions?.length > 0 && (
          <Text style={styles.conditions}>
            {item.chronicConditions.join(', ')}
          </Text>
        )}
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  const showBack = navigation.canGoBack();

  return (
    <View style={styles.container}>
      <Header
        title="My Patients"
        subtitle=""
        onBack={showBack ? () => navigation.goBack() : undefined}
        role={!showBack ? 'DOCTOR' : undefined}
        activeTab={!showBack ? 'Patients' : undefined}
        navigation={!showBack ? navigation : undefined}
        user={!showBack ? user : undefined}
      />

      <View style={styles.searchWrap}>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={handleSearch}
          placeholder="Search patients..."
          placeholderTextColor={COLORS.textLight}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderPatient}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              loadPatients();
            }}
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>👥</Text>
            <Text style={styles.emptyText}>No patients assigned yet</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  searchWrap: { padding: SPACING.lg, paddingBottom: SPACING.sm },
  searchInput: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    fontSize: 15,
    color: COLORS.textPrimary,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    ...TYPOGRAPHY.body,
  },
  list: { padding: SPACING.lg, paddingTop: SPACING.sm, paddingBottom: SPACING.xxxl },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...SHADOW.card,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
  },
  info: { flex: 1 },
  name: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  detail: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  conditions: {
    fontSize: 12,
    color: COLORS.accent,
    marginTop: 4,
    fontStyle: 'italic',
  },
  arrow: { fontSize: 24, color: COLORS.textLight, fontWeight: '300' },
  empty: { alignItems: 'center', padding: SPACING.xxxl },
  emptyIcon: { fontSize: 48, marginBottom: SPACING.md },
  emptyText: {
    color: COLORS.textSecondary,
    ...TYPOGRAPHY.body,
  },
});

export default PatientList;
