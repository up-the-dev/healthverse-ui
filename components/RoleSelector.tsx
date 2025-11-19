import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { User, Stethoscope, FlaskConical } from 'lucide-react-native';

export type Role = 'patient' | 'doctor' | 'lab';

interface RoleSelectorProps {
  selectedRole: Role;
  onSelectRole: (role: Role) => void;
}

const roles: { id: Role; label: string; icon: typeof User }[] = [
  { id: 'patient', label: 'Patient', icon: User },
  { id: 'doctor', label: 'Doctor', icon: Stethoscope },
  { id: 'lab', label: 'Lab', icon: FlaskConical },
];

export default function RoleSelector({ selectedRole, onSelectRole }: RoleSelectorProps) {
  return (
    <View style={styles.container}>
      {roles.map((role) => {
        const Icon = role.icon;
        const isSelected = selectedRole === role.id;

        return (
          <TouchableOpacity
            key={role.id}
            onPress={() => onSelectRole(role.id)}
            activeOpacity={0.7}
            style={styles.chipTouchable}
          >
            <MotiView
              animate={{
                backgroundColor: isSelected ? '#EFF6FF' : '#F9FAFB',
                borderColor: isSelected ? '#2563EB' : '#E5E7EB',
                scale: isSelected ? 1 : 1,
              }}
              transition={{
                type: 'timing',
                duration: 200,
              }}
              style={styles.chip}
            >
              <Icon
                size={16}
                color={isSelected ? '#2563EB' : '#6B7280'}
                strokeWidth={2}
              />
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]} allowFontScaling={false}>
                {role.label}
              </Text>
            </MotiView>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 26,
    justifyContent: 'center',
  },
  chipTouchable: {
    flex: 1,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  chipText: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    letterSpacing: -0.2,
  },
  chipTextSelected: {
    color: '#2563EB',
    fontFamily: 'Inter-Bold',
  },
});
