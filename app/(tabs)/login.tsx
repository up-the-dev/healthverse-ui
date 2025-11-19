import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import RoleSelector, { Role } from '../../components/RoleSelector';
import MobileNumberInput from '../../components/MobileNumberInput';
import ContinueButton from '../../components/ContinueButton';
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
      <LinearGradient
        colors={['#0F1629', '#1a2332', '#0F1629']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

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
            from={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'timing',
              duration: 400,
            }}
            style={styles.header}
          >
            <Text style={styles.tagline}>Your family's lifelong health timeline.</Text>
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'timing',
              duration: 400,
              delay: 100,
            }}
            style={styles.formContainer}
          >
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
          </MotiView>

          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 300 }}
            style={styles.footer}
          >
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.footerLink}>
                New here? <Text style={styles.footerLinkBold}>Create an account</Text>
              </Text>
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
    backgroundColor: '#0F1629',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 64,
  },
  tagline: {
    fontSize: 15,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  formContainer: {
    width: '100%',
    marginBottom: 48,
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
  },
  footerLinkBold: {
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
