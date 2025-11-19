import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import RoleSelector, { Role } from '../../components/RoleSelector';
import MobileNumberInput from '../../components/MobileNumberInput';
import ContinueButton from '../../components/ContinueButton';
import PremiumHealthIcon from '../../components/PremiumHealthIcon';
import { authService } from '../../services/MockAuthService';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('patient');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const isPhoneValid = phone.length === 10 && /^\d+$/.test(phone);

  const handleContinue = async () => {
    if (!isPhoneValid || loading) return;

    setLoading(true);
    setError(undefined);

    try {
      const response = await authService.requestOtp(phone, '+91', selectedRole);

      if (response.success && response.requestId) {
        router.push({
          pathname: '/otp',
          params: {
            requestId: response.requestId,
            phone,
            role: selectedRole,
            expiresIn: response.expiresIn?.toString() || '60',
          },
        });
      } else {
        setError(response.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'timing',
              duration: 600,
              delay: 100,
            }}
            style={styles.header}
          >
            <PremiumHealthIcon />

            <Text style={styles.appName} allowFontScaling={false}>HealthVault</Text>
            <Text style={styles.tagline} allowFontScaling={false}>Your family's lifelong health timeline.</Text>
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'timing',
              duration: 600,
              delay: 300,
            }}
            style={styles.cardWrapper}
          >
            <View style={styles.card}>
              <RoleSelector selectedRole={selectedRole} onSelectRole={setSelectedRole} />

              <MobileNumberInput
                value={phone}
                onChangeText={setPhone}
                error={error}
                onSubmit={handleContinue}
              />

              <ContinueButton
                onPress={handleContinue}
                disabled={!isPhoneValid}
                loading={loading}
              />
            </View>
          </MotiView>

          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 600, duration: 500 }}
            style={styles.footer}
          >
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink} allowFontScaling={false}>
                New here? <Text style={styles.footerLinkBold}>Create an account</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} style={styles.helpButton}>
              <Text style={styles.helpText} allowFontScaling={false}>Need help?</Text>
            </TouchableOpacity>
          </MotiView>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  appName: {
    fontSize: 28,
    fontFamily: 'PlusJakarta-Bold',
    color: '#1A1D29',
    marginTop: 24,
    marginBottom: 8,
    letterSpacing: -0.6,
  },
  tagline: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  cardWrapper: {
    width: '100%',
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 32,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
    gap: 14,
  },
  footerLink: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  footerLinkBold: {
    fontFamily: 'Inter-SemiBold',
    color: '#2563EB',
  },
  helpButton: {
    paddingVertical: 4,
  },
  helpText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    textAlign: 'center',
    letterSpacing: -0.1,
  },
});
