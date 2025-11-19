import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Phone } from 'lucide-react-native';

interface MobileNumberInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  onSubmit?: () => void;
}

export default function MobileNumberInput({ value, onChangeText, error, onSubmit }: MobileNumberInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const isValid = value.length === 10 && /^\d+$/.test(value);
  const hasValue = value.length > 0;

  return (
    <View style={styles.container}>
      <MotiView
        animate={{
          borderColor: error
            ? '#EF4444'
            : isFocused
            ? '#2563EB'
            : '#E5E7EB',
          shadowOpacity: isFocused ? 0.08 : 0,
        }}
        transition={{
          type: 'timing',
          duration: 200,
        }}
        style={[styles.inputContainer, isFocused && styles.inputFocused]}
      >
        <View style={styles.iconWrapper}>
          <Phone
            size={20}
            color={isFocused ? '#2563EB' : hasValue ? '#4B5563' : '#9CA3AF'}
            strokeWidth={2}
          />
        </View>

        <View style={styles.inputWrapper}>
          <MotiView
            animate={{
              translateY: hasValue || isFocused ? -8 : 0,
              scale: hasValue || isFocused ? 0.85 : 1,
            }}
            transition={{
              type: 'timing',
              duration: 250,
            }}
            style={styles.labelContainer}
          >
            <Text style={[
              styles.label,
              (hasValue || isFocused) && styles.labelFloating,
              isFocused && styles.labelFocused,
              error && styles.labelError,
            ]}>
              Mobile Number
            </Text>
          </MotiView>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChangeText}
              keyboardType="phone-pad"
              maxLength={10}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onSubmitEditing={onSubmit}
              returnKeyType="done"
              selectionColor="#2563EB"
              placeholder="0000000000"
              placeholderTextColor="#D1D5DB"
            />
          </View>
        </View>

        {isValid && (
          <MotiView
            from={{ scale: 0, opacity: 0, rotate: '-45deg' }}
            animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
            transition={{
              type: 'spring',
              damping: 12,
              stiffness: 150,
            }}
            style={styles.checkmark}
          >
            <View style={styles.checkmarkCircle}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          </MotiView>
        )}
      </MotiView>

      {error && (
        <MotiView
          from={{ opacity: 0, translateY: -4 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'timing',
            duration: 200,
          }}
          style={styles.errorContainer}
        >
          <Text style={styles.errorText}>{error}</Text>
        </MotiView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 64,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 8,
    elevation: 0,
  },
  inputFocused: {
    elevation: 2,
    backgroundColor: '#FFFFFF',
  },
  iconWrapper: {
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
    height: 52,
  },
  labelContainer: {
    position: 'absolute',
    left: 0,
    top: 10,
  },
  label: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    letterSpacing: -0.2,
  },
  labelFloating: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  labelFocused: {
    color: '#2563EB',
  },
  labelError: {
    color: '#EF4444',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 52,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    letterSpacing: 0.3,
    padding: 0,
    lineHeight: 24,
  },
  checkmark: {
    marginLeft: 10,
  },
  checkmarkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#DCFCE7',
    borderWidth: 1.5,
    borderColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
  },
  errorContainer: {
    marginTop: 8,
    paddingLeft: 2,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#EF4444',
    letterSpacing: -0.1,
  },
});
