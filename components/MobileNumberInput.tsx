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
            ? 'rgba(255, 107, 107, 0.6)'
            : isFocused
            ? 'rgba(255, 255, 255, 0.2)'
            : 'rgba(255, 255, 255, 0.08)',
        }}
        transition={{
          type: 'timing',
          duration: 200,
        }}
        style={styles.inputContainer}
      >
        <View style={styles.iconWrapper}>
          <Phone
            size={18}
            color={isFocused || hasValue ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.3)'}
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
              duration: 200,
            }}
            style={styles.labelContainer}
          >
            <Text style={[
              styles.label,
              (hasValue || isFocused) && styles.labelFloating,
            ]}>
              Mobile Number
            </Text>
          </MotiView>

          <View style={styles.inputRow}>
            <Text style={styles.countryCode}>+91</Text>
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
              selectionColor="rgba(255, 255, 255, 0.3)"
            />
          </View>
        </View>

        {isValid && (
          <MotiView
            from={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'timing',
              duration: 200,
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
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    minHeight: 64,
  },
  iconWrapper: {
    marginRight: 16,
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  labelContainer: {
    position: 'absolute',
    left: 0,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.4)',
    letterSpacing: -0.3,
  },
  labelFloating: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCode: {
    fontSize: 17,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    marginRight: 6,
    letterSpacing: -0.3,
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.3,
    padding: 0,
  },
  checkmark: {
    marginLeft: 8,
  },
  checkmarkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(52, 199, 89, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(52, 199, 89, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(52, 199, 89, 1)',
  },
  errorContainer: {
    marginTop: 8,
    paddingLeft: 4,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 107, 107, 0.9)',
    letterSpacing: -0.2,
  },
});
