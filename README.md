<div align="center">

# Companion Care
### *Next-Gen Assistive Healthcare, Remote Patient Monitoring & Chronic Illness Management Ecosystem*

[![React Native](https://img.shields.io/badge/React_Native-v0.73.6-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![Google Health Connect](https://img.shields.io/badge/Health_Connect-Android_API-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://developer.android.com/health-and-fitness/guides/health-connect)
[![Mapbox](https://img.shields.io/badge/Mapbox-Maps_&_Geofencing-000000?style=for-the-badge&logo=mapbox&logoColor=white)](https://www.mapbox.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

<br />

<img src="./assets/LogoText.png" alt="Companion Care Banner" width="280" />

<br />
<br />

**[Project Overview](#overview)** | **[Multi-Role Ecosystem](#multi-role-healthcare-ecosystem)** | **[Key Features](#key-features--user-workflows)** | **[Tech Stack](#tech-stack-matrix)** | **[Local Setup](#getting-started--local-setup)**

</div>

---

## Overview

**Companion Care** is an intelligent, cross-platform healthcare and remote patient monitoring (RPM) ecosystem designed to bridge patients, family caretakers, and physicians into a cohesive care continuum. 

Managing chronic illnesses and elderly care presents critical challenges globally:
- **Inadequate Caregiver Oversight:** Remote family members and caregivers lack real-time visibility into vital trends, wandering episodes, and sudden physical incidents.
- **Delayed Emergency Interventions:** High mortality and complication rates occur when falls, sudden disorientation, or acute hypoglycemic events go unnoticed.
- **Medication Non-Adherence:** Complex prescription regimens, cognitive decline, and memory lapses lead to missed doses, incorrect insulin administrations, and preventable hospital readmissions.

**Companion Care resolves these challenges by bridging patients, family caretakers, and doctors through a unified, sensor-driven ecosystem:**
- **Patient Empowerment:** Delivers personalized daily schedules, meal-based medication alarms, algorithmic insulin dosing, and instant AI skin diagnostics.
- **Autonomous Caretaker Guardrails:** Tracks real-time GPS locations within custom geofenced safe perimeters and triggers immediate SOS notifications upon detected falls or boundary breaches.
- **Continuous Vitals Telemetry:** Seamlessly ingests physiological data (steps, sleep, heart rate, SpO2, and hydration) via Google Health Connect and wearable smartwatch companions.
- **Clinical Doctor Oversight:** Enables attending doctors to review patient health histories, inspect diagnostic lab reports, and author digital prescriptions synchronized directly to the patient's mobile medication schedule.

---

## Core Highlights

- **Automated Fall Detection & Emergency SOS:** Utilizes on-device accelerometer and gyroscope sensors to identify sudden impact patterns, initiating an automatic 30-second cancellation countdown before dispatching high-priority emergency alerts to caretakers.
- **Dynamic GPS Geofencing Safe Zones:** Mapbox-powered safe-perimeter boundary definitions with continuous background polling daemons (`react-native-background-actions`) to prevent wandering in Alzheimer's and dementia patients.
- **TwachAI (1watch.AI) Dermatological Diagnostic Engine:** Deep-learning-backed computer vision tool capable of screening **25+ skin diseases**—including chronic dermatological conditions and inflammatory rashes—via in-app camera capture with privacy-preserving encryption.
- **Algorithmic Insulin Dosage Calculator:** Computes personalized bolus insulin units based on patient body weight, pre-meal blood glucose levels, carbohydrate intake, and insulin sensitivity factors, complete with visual syringe guidelines.
- **Multi-Role Synchronization:** Native pairing and synchronization between **Patient**, **Caretaker**, and **Doctor** interfaces using secure pairing codes and cloud data pipelines.
- **Disease-Specific Adaptive Interfaces:** Condition-tailored tracking modules for **Diabetes** (blood glucose logs & algorithmic insulin dosage), **Alzheimer’s & Dementia** (geofencing safe zones & wandering protection), and **Psoriasis** (flare-up & skin condition monitoring).

---

## Multi-Role Healthcare Ecosystem

Companion Care provides specialized interfaces tailored to the distinct operational needs of each stakeholder in the care continuum:

### 1. Patient Persona
- Simple, high-contrast user interface designed for seniors and patients with motor or cognitive impairments.
- Glanceable daily routine widgets: step counter, hydration tracker, medication checklists, and rapid SOS triggers.
- Accessible symptom logging and condition-specific self-monitoring tools.

### 2. Caretaker Persona
- Guardian overview allowing family members or designated caregivers to link with one or multiple patients via unique pairing codes.
- Live Mapbox dashboard displaying real-time patient coordinates relative to the home safe zone.
- Instant push notifications for critical events (out-of-safe-zone breaches, fall incidents, missed medications).

### 3. Doctor Persona
- Web-based clinical command portal (`COMPANION CARE Clinical Web`) for attending physicians to manage their patient directory.
- Longitudinal vitals analytics, patient visit history, and diagnostic report package management.
- Digital prescription authoring pad enabling physicians to generate and sync digital prescriptions directly into the patient's mobile app.

---

## Key Features & User Workflows

### 1. Automated Fall Detection & SOS Escalation
- **Sensor Fusion:** Continuously evaluates tri-axial accelerometer metrics via `react-native-sensors` to detect high-velocity downward transitions and rapid deceleration indicative of a fall.
- **30-Second Grace Countdown:** Upon detection, triggers a high-visibility animated countdown screen accompanied by audible alerts.
- **Gesture Cancellation:** If conscious and uninjured, the patient slides an interactive cancellation gesture to dismiss the false positive.
- **Automated Escalation:** If the timer reaches zero without user interaction, the app automatically dispatches an emergency HTTP payload to `/geolocation/set-fall-status/:id` and broadcasts high-priority push notifications to registered caretakers.

### 2. Mapbox Geofencing & Wandering Protection
- **Home Base Configuration:** Caretakers establish the patient's central residence coordinates directly on the interactive Mapbox map (`Set Home Location`).
- **Dynamic Radius Sliders:** Define customizable safety radii (e.g., 500 m, 1 km, 2 km) depending on the patient's mobility level.
- **Headless Background Tracking:** The background service (`react-native-background-actions`) maintains periodic location polling every 30 seconds without requiring the app to be active in the foreground.
- **Geofence Breach Notification:** If the patient's coordinates fall outside the computed radius buffer, a `Location-alert` push notification alerts the caretaker with immediate navigation options.

### 3. Smart Medication Scheduling & Meal-Based Timing
- **Chronological Regimens:** Organizes doses around physiological routines: `Breakfast`, `Lunch`, `Snacks`, and `Dinner`.
- **Formulation Options:** Supports tablets, capsules, syrups (ml), and subcutaneous injections with precise start and end dates.
- **System Push Alarms:** Uses `react-native-push-notification` background alarms that trigger audible reminders even under battery-optimized states.
- **Adherence Auditing:** Logs taken vs. skipped medications into a persistent calendar history accessible by caretakers and attending doctors.

### 4. TwachAI (1watch.AI) Dermatological Detection
- **25+ Dermatological Conditions:** Screens for common and chronic skin conditions (e.g., Psoriasis, Eczema, Ringworm, Impetigo).
- **Direct Camera Capture:** Integrated `react-native-image-crop-picker` opens an in-app viewfinder with precise cropping boundaries for skin lesions.
- **Privacy-First Processing:** Image payloads are encrypted before inference and evaluated without associating persistent biometric data with patient profiles.
- **Clinical Triage Tags:** Categorizes findings with immediate classification tags (e.g., `Auto Immune`, `Infectious`, `Benign`) and provides direct handoffs into the AI Medical Chatbot for symptom explanations.

### 5. Algorithmic Insulin Dosage Recommendation
- **Personalized Bolus Calculation:** Tailored for Type 1 and Insulin-Dependent Type 2 diabetics.
- **Multi-Factor Input:** Evaluates four patient variables:
  $$\text{Target Dosage} = f(\text{Body Weight}, \text{Pre-Meal Glucose}, \text{Carbohydrate Intake}, \text{Insulin Type})$$
- **Visual Syringe Guidance:** Automatically renders calibrated visual dosage syringe indicators (color-coded: `Green` for small, `Yellow` for medium, `Red` for elevated dosages) to eliminate dangerous volume misinterpretations.
- **Safety Guardrails:** Prominently displays safety disclaimers advising consulting a physician whenever calculated doses deviate significantly from standard baselines.

### 6. Continuous Vitals Telemetry (Health Connect & Wearables)
- **Unified Health Connect Pipeline:** Integrates with Android's `react-native-health-connect` to unify biometric telemetry from smartwatches, fitness bands (Fitbit, Pixel Watch, Galaxy Watch), and medical monitors.
- **Monitored Biomarkers:**
  - **Steps & Activity:** Daily step counts, distance walked, active minutes, and caloric burn.
  - **Sleep Architecture:** Total sleep duration, deep vs. light sleep cycles.
  - **Resting & Active Heart Rate:** Continuous BPM tracking with anomaly flags.
  - **Blood Oxygen (SpO2):** Pulse oximetry monitoring for respiratory conditions.
  - **Hydration Monitor:** Interactive fluid intake logging with target progress indicators.

### 7. Condition-Tailored Disease Modules
- **Alzheimer’s & Dementia:** Geofence safety perimeter, real-time wandering alerts, and home return orientation.
- **Diabetes:** Blood glucose logbook, meal carb counting, and algorithmic insulin dosage calculation.
- **Psoriasis & Skin Conditions:** Flare-up photographic logs, topical treatment tracking, and flare trigger logging.

### 8. Doctor Clinical Command Center & Digital Prescriptions
- **Web-Based Clinical Portal:** Allows attending doctors to manage their patient directory, review longitudinal vital graphs, and download diagnostic report packages.
- **Digital Prescription Management:** Direct authoring of digital prescriptions specifying drug names, instructions, dosage, and duration, automatically synchronized with the patient's mobile alarms.

### 9. Real-Time Patient & Caretaker Communication
- **Duplex Messaging:** Dedicated WebSocket communication channel enabling real-time check-ins and emergency coordination between patients and caretakers.
- **AI Health Advisory Chat:** Natural language medical query assistant for instant guidance on general symptoms, wellness tips, and precautions.

### 10. First Aid & Emergency Guidance Library
- **Offline Triage Library:** Quick-reference first aid instructions categorized into `Basic Steps`, `Common Problems`, and `Rare & Critical Emergencies`.
- **Step-by-Step Emergency Cards:** Clear visual cards detailing CPR protocols, choking relief (Heimlich), burn management, and emergency first aid.

---

## Tech Stack Matrix

| Layer | Technologies & Libraries | Purpose |
| :--- | :--- | :--- |
| **Mobile Frontend** | **React Native (v0.73.6)**, React 18.2.0 | Cross-platform native mobile application (Android & iOS) |
| **Navigation** | `@react-navigation/native`, Native Stack, Bottom Tabs | Multi-role screen flows, authentication gates, and tab routing |
| **Maps & Geolocation** | `@rnmapbox/maps (v10.1.33)`, `@react-native-community/geolocation` | Vector map rendering, home location pinning, and dynamic geofencing rings |
| **Health & Wearables** | `react-native-health-connect (v3.3.2)` | Aggregates steps, sleep, heart rate, and vitals from Android Health Connect & wearables |
| **Device Motion Sensors** | `react-native-sensors (v7.3.6)`, `rxjs` | Real-time tri-axial accelerometer & gyroscope sampling for fall detection |
| **Background Services** | `react-native-background-actions (v4.0.1)` | Headless persistent background daemon for uninterrupted safe-zone monitoring |
| **Local Push Notifications** | `react-native-push-notification (v8.1.1)` | Native high-priority sound and vibration alerts for falls, breaches, and medications |
| **Computer Vision (TwachAI)**| `react-native-image-crop-picker`, Custom CV Model API | Lesion image capture, circular region cropping, and 25+ skin disease classification |
| **Networking & HTTP** | `axios (v1.7.9)` | RESTful API communication with backend microservices |
| **Real-Time Communication** | **WebSockets (`ws`)** | Real-time duplex messaging between patients and paired caretakers |
| **Local Persistence** | `@react-native-async-storage/async-storage` | Session tokens, offline medication logs, and user configuration caching |
| **UI Components & Motion** | `lottie-react-native`, `react-native-circular-progress`, `react-native-pie-chart` | Interactive health progress rings, animated loaders, and visual vitals graphs |
| **Date & Time Pickers** | `@react-native-community/datetimepicker`, `react-native-date-picker` | Granular scheduling for medication times and historical log calendars |
| **Styling & Gradients** | `react-native-linear-gradient`, `react-native-responsive-fontsize` | Responsive, accessible visual styling optimized for all device display densities |

---

## Backend Services & API Reference

Companion Care connects to a modular backend suite accessible via `BACKEND_URL`:

| Domain | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Authentication** | `POST` | `/u/login` | Authenticates Patient or Caretaker, issuing JWT access tokens |
| **Authentication** | `POST` | `/u/register` | Registers new user profiles with designated role designations |
| **Pairing** | `POST` | `/caretaker/link-patient` | Links a caretaker profile to a patient via their unique code |
| **Geolocation** | `POST` | `/geolocation/set-location/:patientId` | Saves home coordinate center and custom geofence radius |
| **Geolocation** | `POST` | `/geolocation/set-fall-status/:patientId` | Activates emergency status upon fall detection or manual SOS |
| **TwachAI** | `POST` | `/ai/detect-skin-disease` | Evaluates cropped skin lesion images against 25+ dermatological conditions |
| **AI Advisory** | `POST` | `/ai` | Natural language medical consultation and query assistant |
| **Chat Service** | `WSS` | `ws://host:8080` | Real-time duplex messaging between patients and paired caretakers |
| **Prescriptions** | `GET` | `/prescription/patient/:patientId` | Synchronizes active digital prescriptions authored by the doctor |

---

## Getting Started & Local Setup

### Prerequisites
- **Node.js** (v18.x or later) & **npm** / **yarn**
- **Android Studio** with Android SDK (API Level 33/34), Platform Tools, and an Android Emulator or physical device
- **Mapbox Account & Access Token** (for vector map rendering)
- **(iOS only)** macOS with **Xcode 15+** and **CocoaPods**

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/Sagar-1103/companionCare.git
cd companionCare
```

---

### Step 2: Configure Environment Variables

Create a `.env` file in the project root:

```env
BACKEND_URL=https://sagar-shirgaonkar.xyz
BACKEND_URL_LOCAL=http://sagar-shirgaonkar.xyz:3002
SOCKET_URL=ws://sagar-shirgaonkar.xyz:8080
MAPBOX_ACCESS_TOKEN=your_mapbox_public_or_secret_token
```

> **Note:** Mapbox access tokens can also be configured directly in your native configuration or initialized via `Mapbox.setAccessToken(...)`.

---

### Step 3: Install JavaScript Dependencies

```bash
npm install
```

---

### Step 4: Native Configuration

#### Android Setup:
1. Ensure Health Connect permissions and Background Service declarations are present in `android/app/src/main/AndroidManifest.xml`:
   ```xml
   <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
   <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
   <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
   <uses-permission android:name="android.permission.WAKE_LOCK" />
   <uses-permission android:name="android.permission.VIBRATE" />
   <uses-permission android:name="android.permission.CAMERA" />
   <uses-permission android:name="android.permission.BODY_SENSORS" />
   ```
2. Verify Mapbox maven repository configuration in `android/build.gradle`.

#### iOS Setup:
```bash
cd ios
pod install
cd ..
```

---

### Step 5: Run the Application

#### Start Metro Bundler:
```bash
npm start
```

#### Launch on Android:
```bash
npm run android
```

#### Launch on iOS:
```bash
npm run ios
```
