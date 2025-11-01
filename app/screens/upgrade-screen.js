import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const features = [
  { icon: '✨', text: 'Unlimited message refinements' },
  { icon: '📚', text: 'Access to all categories and tones' },
  { icon: '💾', text: 'Unlimited message history' },
  { icon: '🚀', text: 'Priority AI processing' },
  { icon: '🎯', text: 'Advanced customization options' },
  { icon: '🔒', text: 'End-to-end encryption' },
];

export default function UpgradeScreen({ navigation }) {
  const handleUpgrade = () => {
    // TODO: Implement Stripe payment
    Alert.alert(
      'Coming Soon',
      'Payment integration will be implemented with Stripe SDK',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.premiumIcon}>💎</Text>
          <Text style={styles.title}>Unlock Premium Features</Text>
          <Text style={styles.subtitle}>
            Get unlimited access to all RefineText features
          </Text>
        </View>

        <LinearGradient
          colors={['#6366f1', '#764ba2']}
          style={styles.priceCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.priceContent}>
            <Text style={styles.priceAmount}>$9.99</Text>
            <Text style={styles.pricePeriod}>per month</Text>
          </View>
        </LinearGradient>

        <View style={styles.featuresSection}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.upgradeButton}
          onPress={handleUpgrade}
        >
          <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.restoreButton}
          onPress={() => Alert.alert('Restore Purchases', 'No previous purchases found')}
        >
          <Text style={styles.restoreButtonText}>Restore Purchases</Text>
        </TouchableOpacity>

        <View style={styles.terms}>
          <Text style={styles.termsText}>
            By upgrading, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
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
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  premiumIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  priceCard: {
    borderRadius: 20,
    padding: 32,
    marginBottom: 32,
  },
  priceContent: {
    alignItems: 'center',
  },
  priceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  pricePeriod: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  featuresSection: {
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 20,
  },
  featureText: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
  upgradeButton: {
    backgroundColor: '#6366f1',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  upgradeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  restoreButton: {
    alignItems: 'center',
    marginBottom: 24,
  },
  restoreButtonText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '500',
  },
  terms: {
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
});