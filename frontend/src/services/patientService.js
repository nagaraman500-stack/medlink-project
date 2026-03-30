import { api } from './api';

export const patientService = {
  // Legacy aliases used by existing doctor flows
  getAll: (options) => api.get('/patient', options),
  getById: (id, options) => api.get(`/patient/${id}`, options),
  getByUserId: (userId, options) => api.get(`/patient/user/${userId}`, options),
  getByDoctor: (doctorId, options) => api.get(`/patient/doctor/${doctorId}`, options),
  search: (doctorId, query, options) =>
    api.get(`/patient/search?doctorId=${doctorId}&query=${encodeURIComponent(query)}`, options),
  update: (id, patient, options) => api.put(`/patient/${id}`, patient, options),

  // Patient profile APIs
  getProfile: (patientId, options) => api.get(`/patient/${patientId}`, options),
  getProfileByUserId: (userId, options) => api.get(`/patient/user/${userId}`, options),
  createProfile: (data, options) => api.post('/patient', data, options),
  updateProfile: (patientId, data, options) => api.put(`/patient/${patientId}`, data, options),

  // Dashboard summary API from MongoDB-backed backend
  getDashboardSummary: (patientId, options) =>
    api.get(`/patient/${patientId}/dashboard-summary`, options),

  // Additional patient data helpers
  getAllPatients: (options) => api.get('/patient', options),
  searchPatients: (doctorId, query, options) =>
    api.get(`/patient/search?doctorId=${doctorId}&query=${encodeURIComponent(query)}`, options),
  getMedications: (patientId, options) => api.get(`/medications/schedule/${patientId}`, options),
  getVitalsHistory: (patientId, options) => api.get(`/vitals/patient/${patientId}`, options),
  getAdherence: (patientId, options) => api.get(`/medications/adherence/${patientId}`, options),
};

export default patientService;
