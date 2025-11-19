import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { MotiView } from 'moti';

interface ContinueButtonProps {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function ContinueButton({ onPress, disabled = false, loading = false }: ContinueButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={styles.container}
    >
      <MotiView
        animate={{
          opacity: disabled ? 0.4 : 1,
        }}
        transition={{
          type: 'timing',
          duration: 200,
        }}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#0F1629" />
        ) : (
          <Text style={styles.text}>Continue</Text>
        )}
      </MotiView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    borderRadius: 14,
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0F1629',
    letterSpacing: -0.3,
  },
});
