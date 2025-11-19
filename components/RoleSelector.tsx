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
            activeOpacity={0.6}
          >
            <MotiView
              animate={{
                backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                borderColor: isSelected ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)',
              }}
              transition={{
                type: 'timing',
                duration: 200,
              }}
              style={styles.chip}
            >
              <Icon
                size={16}
                color={isSelected ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.4)'}
                strokeWidth={2}
              />
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
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
    marginBottom: 32,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: -0.2,
  },
  chipTextSelected: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
});
