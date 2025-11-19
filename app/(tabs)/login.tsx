import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
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
      <LinearGradient
        colors={['#0a0e1f', '#1a1535', '#2d1b4e', '#1a1535', '#0a0e1f']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <MotiView
        from={{ opacity: 0.6 }}
        animate={{ opacity: 0.8 }}
        transition={{
          type: 'timing',
          duration: 12000,
          loop: true,
          repeatReverse: true,
        }}
        style={styles.gradientOverlay}
      >
        <LinearGradient
          colors={['rgba(138, 102, 208, 0.12)', 'rgba(100, 80, 180, 0.08)', 'rgba(72, 61, 139, 0.06)']}
          style={styles.gradientOverlayInner}
          start={{ x: 0.2, y: 0.2 }}
          end={{ x: 0.8, y: 0.8 }}
        />
      </MotiView>

      <View style={styles.blurLayerWrapper}>
        <View style={styles.blurLayer1} />
        <View style={styles.blurLayer2} />
        <View style={styles.blurLayer3} />
      </View>

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
              duration: 800,
              delay: 200,
            }}
            style={styles.header}
          >
            <PremiumHealthIcon />

            <Text style={styles.appName} allowFontScaling={false}>HealthVault</Text>
            <Text style={styles.tagline} allowFontScaling={false}>Your family's lifelong health timeline.</Text>
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'timing',
              duration: 700,
              delay: 500,
            }}
            style={styles.cardWrapper}
          >
            <View style={styles.cardShadow} />
            <BlurView intensity={20} tint="dark" style={styles.glassCard}>
              <View style={styles.cardBorder}>
                <View style={styles.cardContent}>
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
              </View>
            </BlurView>
          </MotiView>

          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 900, duration: 600 }}
            style={styles.footer}
          >
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.footerLink} allowFontScaling={false}>
                New here? <Text style={styles.footerLinkBold}>Create an account</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6} style={styles.helpButton}>
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
    backgroundColor: '#0a0e1f',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  gradientOverlayInner: {
    flex: 1,
  },
  blurLayerWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  blurLayer1: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(183, 148, 246, 0.08)',
    top: -100,
    left: -100,
  },
  blurLayer2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(100, 80, 180, 0.06)',
    bottom: -50,
    right: -50,
  },
  blurLayer3: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(138, 102, 208, 0.05)',
    top: '50%',
    left: '50%',
    marginLeft: -125,
    marginTop: -125,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 52,
  },
  appName: {
    fontSize: 32,
    fontFamily: 'PlusJakarta-Bold',
    color: '#FFFFFF',
    marginTop: 28,
    marginBottom: 12,
    letterSpacing: -0.8,
  },
  tagline: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.65)',
    textAlign: 'center',
    letterSpacing: -0.3,
    lineHeight: 24,
  },
  cardWrapper: {
    width: '100%',
    marginBottom: 44,
  },
  cardShadow: {
    position: 'absolute',
    top: 0,
    left: -12,
    right: -12,
    bottom: -12,
    backgroundColor: 'rgba(138, 102, 208, 0.25)',
    borderRadius: 36,
    shadowColor: '#8a66d0',
    shadowOffset: { width: 0, height: 32 },
    shadowOpacity: 0.45,
    shadowRadius: 48,
    elevation: 25,
  },
  glassCard: {
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  cardBorder: {
    borderWidth: 1,
    borderColor: 'rgba(183, 148, 246, 0.25)',
    borderRadius: 32,
    padding: 1.5,
  },
  cardContent: {
    paddingHorizontal: 28,
    paddingVertical: 40,
    backgroundColor: 'rgba(10, 14, 31, 0.3)',
    borderRadius: 31,
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
    gap: 16,
  },
  footerLink: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.45)',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  footerLinkBold: {
    fontFamily: 'Inter-SemiBold',
    color: 'rgba(255, 255, 255, 0.75)',
    textDecorationLine: 'underline',
    textDecorationColor: 'rgba(255, 255, 255, 0.3)',
  },
  helpButton: {
    paddingVertical: 6,
  },
  helpText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
});
