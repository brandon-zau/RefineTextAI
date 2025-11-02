# RefineText AI 

> **Say it better, every time.**

A cross-platform mobile application that uses AI to help users refine and personalize their written communication across various life scenarios - from business emails to romantic messages.

[![React Native](https://img.shields.io/badge/React%20Native-0.72-blue.svg)](https://reactnative.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-orange.svg)](https://firebase.google.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-ChatGPT%20API-green.svg)](https://openai.com/)

---

## 📱 Demo

![RefineText Demo](docs/demo.gif)
![Recording 2025-11-02 at 18 45 58](https://github.com/user-attachments/assets/10808963-0a79-432d-b04e-6ee86a9bc721)

![Recording 2025-11-02 at 18 49 18](https://github.com/user-attachments/assets/b158aa14-9cca-49ce-9b49-e0c21e827a5b)




### Screenshots

<div align="center">
  <img src="docs/screenshots/splash.png" width="200" alt="Splash Screen" />
  <img src="docs/screenshots/home.png" width="200" alt="Home Screen" />
  <img src="docs/screenshots/results.png" width="200" alt="Results Screen" />
  <img src="docs/screenshots/history.png" width="200" alt="History Screen" />
</div>

---

## Problem Statement

In today's digital age, effective communication is crucial across multiple contexts - professional, personal, and social. However, many people struggle with:

- **Tone adjustment**: Striking the right balance between professional and friendly
- **Context switching**: Adapting language for different audiences (boss, partner, clients)
- **Time constraints**: Crafting well-written messages quickly
- **Confidence**: Uncertainty about how messages will be received

**RefineText AI** solves this by providing instant, AI-powered message refinement tailored to specific contexts and desired tones.

---

## ✨ Key Features

### Core Functionality
- **AI-Powered Refinement**: Leverages OpenAI's ChatGPT API to intelligently rewrite messages
-  **Multiple Categories**: Business, Romantic, Workplace, and Parenting contexts
-  **Tone Customization**: Polite, Funny, Warm, Direct, and more
-  **Multiple Versions**: Generate 3 variations of each message
-  **Edit & Copy**: Fine-tune AI suggestions before using them
-  **Message History**: Save and revisit past refined messages

### User Experience
-  **Secure Authentication**: Email and Google Sign-In via Firebase
-  **Cross-Platform**: Built with React Native for iOS and Android
-  **Modern UI/UX**: Clean, intuitive interface with smooth animations
-  **Freemium Model**: Free tier with upgrade path to premium

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React Native (Expo) |
| **Backend** | Firebase (Firestore + Authentication) |
| **AI Integration** | OpenAI ChatGPT API |
| **Navigation** | React Navigation |
| **Payments** | Stripe SDK (future integration) |
| **State Management** | React Hooks (useState, useContext) |

---

## 🏗️ Architecture & User Flow

### User Flow Diagram

```
┌─────────────┐
│   Splash    │
│   Screen    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Login/    │
│   Signup    │
└──────┬──────┘
       │
       ▼
┌─────────────┐      ┌──────────────┐      ┌──────────────┐
│    Home     │─────▶│   Category   │─────▶│   Refined    │
│   Screen    │      │  & Tone      │      │   Results    │
└──────┬──────┘      │  Selection   │      └──────┬───────┘
       │             └──────────────┘             │
       │                                          │
       │                                          ▼
       │                                  ┌──────────────┐
       │                                  │  Copy/Edit/  │
       │                                  │    Save      │
       │                                  └──────┬───────┘
       │                                          │
       ▼                                          │
┌─────────────┐                                  │
│   History   │◀─────────────────────────────────┘
│   Screen    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Profile   │
│  & Settings │
└─────────────┘
```

### Data Flow

```
User Input ──▶ Category Selection ──▶ Tone Selection ──▶ ChatGPT API
                                                              │
                                                              ▼
                                                      AI-Generated Versions
                                                              │
                                                              ▼
                                                        Display Results
                                                              │
                                                              ▼
                                                        Save to Firestore
                                                              │
                                                              ▼
                                                      Show in History
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Firebase account
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/refinetext-ai.git
   cd refinetext-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Run the app**
   ```bash
   expo start
   ```

5. **Test on device**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or press `i` for iOS simulator, `a` for Android emulator

---
</div>
