# 🖥️ MedLink Backend  
### 🚀 Online Prescription & Medication Tracker with AI Chatbot  

The MedLink backend is a **Spring Boot-based REST API system** that powers a role-based healthcare platform for patients and doctors. It manages medications, prescriptions, vitals, and integrates an **AI-powered chatbot (MedBot)** for intelligent medical assistance.

---

## 📌 Overview  

MedLink backend provides:  

- 🔐 Secure authentication & authorization  
- 💊 Medication scheduling & adherence tracking  
- 🩺 Doctor-patient management system  
- ❤️ Vitals monitoring  
- 🤖 AI chatbot integration using Grok API  

---

## 🛠️ Tech Stack  

| Technology        | Purpose |
|------------------|--------|
| Java             | Core backend language |
| Spring Boot      | REST API framework |
| Spring Security  | Authentication & authorization |
| MongoDB          | NoSQL database |
| JWT              | Secure session handling |
| Grok API         | AI chatbot integration |

---

## 📂 Project Structure  

```
backend/
├── controller/
│   ├── AuthController.java
│   ├── PatientController.java
│   ├── DoctorController.java
│   ├── MedicationController.java
│   ├── PrescriptionController.java
│   ├── VitalSignController.java
│   └── ChatBotController.java 🤖
│
├── service/
│   ├── AuthService.java
│   ├── PatientService.java
│   ├── DoctorService.java
│   ├── MedicationService.java
│   ├── MedicationScheduleService.java
│   ├── PrescriptionService.java
│   ├── VitalSignService.java
│   └── ChatBotService.java 🤖
│
├── repository/
├── model/
├── dto/
├── security/
├── exception/
└── resources/
```

---

## 🔐 Authentication & Security  

- JWT-based authentication  
- BCrypt password hashing  
- Role-based access:  
  - 👤 PATIENT  
  - 🩺 DOCTOR  

---

## 💊 Core Features  

### 👤 Patient Module  
- Medication scheduling  
- Intake tracking (Taken / Missed / Pending)  
- Vitals logging  
- Profile management  

### 🩺 Doctor Module  
- Patient management  
- Prescription creation  
- Health monitoring  

---

## 🤖 AI Chatbot (MedBot)  

### 💡 Description  
MedBot is an AI-powered assistant integrated using **Grok API** to provide real-time medical guidance.

### ⚙️ Capabilities  
- Drug interaction checks  
- Dosage guidance  
- Side effects explanation  
- Contraindication alerts  
- General medical assistance  

### 🔄 Flow  

```
Frontend → ChatBotController → ChatBotService → Grok API → Response → Frontend
```

### 📡 Endpoint  

```
POST /api/chatbot/query
```

---

## 🗄️ Database Structure (MongoDB)  

### 👤 Users  

```
_id  
email  
password  
role (PATIENT / DOCTOR)  
phone  
```

---

### 🧑‍⚕️ Patients  

```
_id  
name  
age  
bloodGroup  
allergies  
doctorId  
```

---

### 🩺 Doctors  

```
_id  
name  
specialization  
hospital  
experience  
```

---

### 💊 MedicationSchedule  

```
_id  
patientId  
medicationName  
dosage  
frequency  
times  
startDate  
endDate  
```

---

### 📋 IntakeLogs  

```
_id  
scheduleId  
dateTime  
status (PENDING / TAKEN / MISSED / SKIPPED)  
```

---

### 🧾 Prescriptions  

```
_id  
doctorId  
patientId  
medications  
instructions  
```

---

### ❤️ VitalSigns  

```
_id  
patientId  
bloodPressure  
heartRate  
glucose  
temperature  
status (NORMAL / ELEVATED / HIGH)  
```

---

### 📊 DashboardSummary  

```
totalMedications  
taken  
missed  
pending  
```

---

## 📡 API Endpoints  

### 🔐 Authentication  
- POST /api/auth/register  
- POST /api/auth/login  

### 💊 Medication  
- POST /api/medications/schedule  
- PATCH /api/medications/intake/{id}  

### 🤖 Chatbot  
- POST /api/chatbot/query  

---

## ⚙️ Setup Instructions  

### 1️⃣ Clone Repository  

```
git clone <your-repo-link>
cd backend
```

### 2️⃣ Install Dependencies  

```
mvn clean install
```

### 3️⃣ Configure Environment  

```
spring.data.mongodb.uri=your_mongodb_url
grok.api.key=your_api_key
```

### 4️⃣ Run Server  

```
mvn spring-boot:run
```

---

## 🚀 Future Enhancements  

- Real-time chatbot streaming  
- AI-based health predictions  
- Push notification system  
- Wearable device integration  

---

## 🎯 Conclusion  

The MedLink backend combines:  

- Secure healthcare management  
- Real-time tracking  
- AI-powered assistance  

to improve patient care and doctor efficiency. 

---

## ⭐ Support  

If you like this project, give it a ⭐ on GitHub!
