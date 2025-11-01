import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { refineMessage } from '../services/openai-service';

const categories = [
  { id: 'business', emoji: '💼', label: 'Business' },
  { id: 'romantic', emoji: '❤️', label: 'Romantic' },
  { id: 'workplace', emoji: '🏢', label: 'Workplace' },
  { id: 'parenting', emoji: '👨‍👩‍👧', label: 'Parenting' },
];

const tones = [
  { 
    id: 'polite', 
    label: 'Polite', 
    description: 'Professional and courteous',
    emoji: '' 
  },
  { 
    id: 'funny', 
    label: 'Funny', 
    description: 'Lighten up your tone',
    emoji: '🤭' 
  },
  { 
    id: 'warm', 
    label: 'Warm', 
    description: 'Friendly and approachable',
    emoji: '' 
  },
  { 
    id: 'direct', 
    label: 'Direct', 
    description: 'Clear and to the point',
    emoji: '' 
  },
];

export default function CategoryToneScreen({ navigation, route }) {
  const { originalMessage } = route.params;
  const [selectedCategory, setSelectedCategory] = useState('business');
  const [selectedTone, setSelectedTone] = useState('polite');
  const [loading, setLoading] = useState(false);

  const handleGenerateMessages = async () => {
    setLoading(true);
    try {
      // Call ChatGPT API
      const refinedMessages = await refineMessage(originalMessage, selectedCategory, selectedTone);
      
      // Navigate to results with the refined messages
      navigation.navigate('Results', {
        originalMessage,
        category: selectedCategory,
        tone: selectedTone,
        refinedMessages: refinedMessages,
      });
    } catch (error) {
      console.error('Error generating messages:', error);
      Alert.alert(
        'Error',
        'Failed to generate refined messages. Please check your internet connection and try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Category</Text>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.categoryCardSelected,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                <Text style={[
                  styles.categoryLabel,
                  selectedCategory === category.id && styles.categoryLabelSelected,
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Tone</Text>
          <View style={styles.toneList}>
            {tones.map((tone) => (
              <TouchableOpacity
                key={tone.id}
                style={[
                  styles.toneCard,
                  selectedTone === tone.id && styles.toneCardSelected,
                ]}
                onPress={() => setSelectedTone(tone.id)}
              >
                <View style={styles.toneContent}>
                  <View style={[
                    styles.radioButton,
                    selectedTone === tone.id && styles.radioButtonSelected,
                  ]} />
                  <View style={styles.toneTextContent}>
                    <Text style={[
                      styles.toneLabel,
                      selectedTone === tone.id && styles.toneLabelSelected,
                    ]}>
                      {tone.label} {tone.emoji}
                    </Text>
                    <Text style={styles.toneDescription}>{tone.description}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.generateButton, loading && styles.generateButtonDisabled]}
          onPress={handleGenerateMessages}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.generateButtonText}>Generate Refined Messages</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  categoryCardSelected: {
    borderColor: '#6366f1',
    borderWidth: 2,
  },
  categoryEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  categoryLabelSelected: {
    color: '#6366f1',
  },
  toneList: {
    gap: 8,
  },
  toneCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 12,
  },
  toneCardSelected: {
    backgroundColor: '#6366f1',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderColor: '#6366f1',
  },
  toneContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d5db',
  },
  radioButtonSelected: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  toneTextContent: {
    flex: 1,
  },
  toneLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
  },
  toneLabelSelected: {
    color: '#6366f1',
  },
  toneDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  generateButton: {
    backgroundColor: '#6366f1',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  generateButtonDisabled: {
    opacity: 0.7,
  },
  generateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});