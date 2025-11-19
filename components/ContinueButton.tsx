import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { MotiView } from 'moti';

interface ContinueButtonProps {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function ContinueButton({ onPress, disabled = false, loading = false }: ContinueButtonProps) {
  return (
    <MotiView
      animate={{
        opacity: disabled ? 0.5 : 1,
        scale: disabled ? 0.98 : 1,
      }}
      transition={{
        type: 'timing',
        duration: 250,
      }}
      style={styles.wrapper}
    >
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.85}
        style={[styles.container, disabled && styles.containerDisabled]}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={[styles.text, disabled && styles.textDisabled]} allowFontScaling={false}>Continue</Text>
        )}
      </TouchableOpacity>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  container: {
    width: '100%',
    height: 56,
    borderRadius: 14,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  containerDisabled: {
    backgroundColor: '#E5E7EB',
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  textDisabled: {
    color: '#9CA3AF',
  },
});
