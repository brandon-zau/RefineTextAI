import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Clipboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { doc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

export default function ResultsScreen({ navigation, route }) {
  const { originalMessage, category, tone, refinedMessages } = route.params;
  const [messages, setMessages] = useState(refinedMessages || []);
  const [loading, setLoading] = useState(false);

  const handleCopy = (message) => {
    Clipboard.setString(message);
    Alert.alert('Copied!', 'Message copied to clipboard');
  };

  const handleEdit = (message) => {
    Alert.alert('Edit Feature', 'Edit functionality coming soon!');
  };

  const handleSave = async (messageObj) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'You must be logged in to save messages');
        return;
      }

      // Save to Firestore
      await addDoc(collection(db, 'users', user.uid, 'messages'), {
        originalMessage: originalMessage,
        refinedMessage: messageObj.message,
        category: category,
        tone: tone,
        version: messageObj.version,
        createdAt: serverTimestamp(),
      });

      Alert.alert('Saved!', 'Message saved to your history');
    } catch (error) {
      console.error('Error saving message:', error);
      Alert.alert('Error', 'Failed to save message. Please try again.');
    }
  };

  if (!messages || messages.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>No refined messages available</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((item) => (
          <View key={item.id} style={styles.messageCard}>
            <View style={styles.messageHeader}>
              <View style={styles.versionInfo}>
                <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                <Text style={styles.versionText}>{item.version}</Text>
                <View style={[styles.toneBadge, { backgroundColor: `${item.color}20` }]}>
                  <Text style={[styles.toneText, { color: item.color }]}>
                    {item.tone}
                  </Text>
                </View>
              </View>
            </View>
            
            <Text style={styles.messageText}>{item.message}</Text>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleCopy(item.message)}
              >
                <Text style={styles.actionButtonText}>📋 Copy</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleEdit(item.message)}
              >
                <Text style={styles.actionButtonText}>✏️ Edit</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.saveButton]}
                onPress={() => handleSave(item)}
              >
                <Text style={[styles.actionButtonText, styles.saveButtonText]}>
                  💾 Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  messageCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  versionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  versionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  toneBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  toneText: {
    fontSize: 12,
    fontWeight: '500',
  },
  messageText: {
    fontSize: 16,
    color: '#111827',
    lineHeight: 24,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  saveButton: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  saveButtonText: {
    color: '#6366f1',
  },
});