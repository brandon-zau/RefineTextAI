import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const maxLength = 500;

  const handleRefineMessage = () => {
    if (message.trim()) {
      // Navigate to category/tone selection with the message
      navigation.navigate('CategoryTone', { originalMessage: message });
    } else {
      Alert.alert('Error', 'Please enter a message to refine');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>RefineText</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileInitial}>J</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>What would you like to say?</Text>
              <Text style={styles.subtitle}>
                Write your message and we'll help you refine it
              </Text>
            </View>

            <View style={styles.inputSection}>
              <TextInput
                style={styles.messageInput}
                placeholder="Type your message here..."
                placeholderTextColor="#9ca3af"
                value={message}
                onChangeText={setMessage}
                multiline
                maxLength={maxLength}
                textAlignVertical="top"
              />
              <Text style={styles.charCount}>
                {message.length} / {maxLength} characters
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.refineButton}
              onPress={handleRefineMessage}
            >
              <Text style={styles.refineButtonText}>Refine Message</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Space for tab bar
  },
  content: {
    padding: 24,
  },
  titleSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  inputSection: {
    marginBottom: 24,
  },
  messageInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    color: '#111827',
  },
  charCount: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'right',
    marginTop: 8,
  },
  refineButton: {
    backgroundColor: '#6366f1',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  refineButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  suggestionBox: {
    backgroundColor: '#dbeafe',
    borderRadius: 16,
    padding: 16,
  },
  suggestionIcon: {
    fontSize: 16,
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  suggestionExample: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '500',
  },
});