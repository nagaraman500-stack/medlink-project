# 🏥 MedLink - Frontend Application

A React Native mobile application for medication tracking and health management.

##  Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- MongoDB running (local or Atlas)
- Backend server running on port 8080

### Installation

```bash
# Navigate to frontend directory
cd medlink-project/frontend

# Install dependencies
npm install

# Start the development server
npm start
```

### Running the App

After starting the development server:
- **Android**: Press `a` in terminal or scan QR code with Expo Go app
- **iOS**: Press `i` in terminal (Mac only) or scan QR code with Expo Go app
- **Web**: Press `w` in terminal

##  Features

### Patient Features
-  **Dashboard** - View medication summary, adherence rate, and health stats
-  **Medication Schedule** - Track daily medications with reminders
-  **Add Medication** - Create new medication schedules
-  **Vitals Tracking** - Log blood pressure, heart rate, glucose, etc.
-  **Reminders** - Get notified for medication times
-  **Chat with MedBot** - AI-powered medical assistant (NEW!)

### Doctor Features
-  **Patient Management** - View and manage assigned patients
-  **Prescriptions** - Create and manage prescriptions
-  **Dashboard** - Monitor patient health metrics
-  **Search Patients** - Quick patient lookup

## 🔧 Configuration

### Backend Connection

The app connects to the backend API at `http://localhost:8080/api`.

**For physical devices**, update `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://YOUR_COMPUTER_IP:8080/api';
```

### Environment Variables

Create a `.env` file in the frontend root:
```env
EXPO_PUBLIC_API_URL=http://localhost:8080/api
```

##  Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Header.js
│   │   ├── MedicationCard.js
│   │   ├── StatsCard.js
│   │   └── ...
│   ├── context/          # React Context providers
│   │   ├── AuthContext.js
│   │   ├── ThemeContext.js
│   │   └── UserContext.js
│   ├── navigation/       # Navigation configuration
│   │   ├── AppNavigator.js
│   │   ├── PatientNavigator.js
│   │   └── DoctorNavigator.js
│   ├── screens/          # App screens
│   │   ├── auth/         # Login, Register
│   │   ├── patient/      # Patient screens
│   │   │   ├── PatientDashboard.js
│   │   │   ├── ChatBotScreen.js  NEW
│   │   │   └── ...
│   │   └── doctor/       # Doctor screens
│   ├── services/         # API service layer
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── medicationService.js
│   │   └── ...
│   └── utils/            # Helper functions
│       ├── colors.js
│       ├── theme.js
│       └── constants.js
└── App.js
```

##  Using the ChatBot (MedBot)

### Accessing MedBot
1. Open the Patient Dashboard
2. Click "Chat with MedBot" in Quick Navigation
3. Or navigate from anywhere in the app

### What MedBot Can Do
-  Answer medication questions
-  Provide symptom information
-  Check drug interactions
-  Explain dosage instructions
-  General medical guidance

### Example Questions
- "What is paracetamol used for?"
- "Can I take ibuprofen with aspirin?"
- "What are the side effects of metformin?"
- "How should I store insulin?"

##  Authentication

The app uses JWT-based authentication:
1. User registers or logs in
2. Token is stored in AsyncStorage
3. Token is sent with every API request
4. Automatic logout on token expiration

##  Key Technologies

- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **AsyncStorage** - Local storage
- **Axios/Fetch** - HTTP client
- **Context API** - State management

##  Troubleshooting

### App Won't Start
```bash
# Clear cache and restart
npm start -- --clear
```

### Can't Connect to Backend
1. Ensure backend is running: `http://localhost:8080/api`
2. Check firewall settings
3. For devices, use computer's IP address

### Build Errors
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Navigation Issues
- Ensure screen is registered in navigator
- Check import paths are correct
- Verify screen name matches exactly

##  Testing

### Manual Testing Checklist
- [ ] Register new user
- [ ] Login with credentials
- [ ] View dashboard
- [ ] Add medication
- [ ] Log vitals
- [ ] **Chat with MedBot** 
- [ ] Set reminders
- [ ] Update profile

### API Testing
Use the built-in services in `src/services/`:
```javascript
import api from '../services/api';

// GET request
const data = await api.get('/patient/profile');

// POST request
const result = await api.post('/chatbot/message', {
  message: 'Hello MedBot!'
});
```

##  Deployment

### Building for Production

```bash
# Android APK
eas build --platform android

# iOS IPA
eas build --platform ios
```

### Configuration for Production
1. Update API URL to production backend
2. Set environment variables
3. Configure app.json settings
4. Test thoroughly before release

##  Support

For issues or questions:
1. Check console logs for errors
2. Review network requests in debugger
3. Consult backend API documentation
4. Check Expo documentation: https://docs.expo.dev

##  Recent Updates

### Latest Version (1.0.0)
-  Added **MedBot ChatBot** feature
-  Integrated AI medical assistant
-  Real-time chat interface
-  Conversation history support
-  Beautiful chat UI with animations

---

**Happy Coding!** 🚀

