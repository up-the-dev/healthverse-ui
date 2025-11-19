import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Heart } from 'lucide-react-native';

export default function PremiumHealthIcon() {
  return (
    <View style={styles.container}>
      <MotiView
        from={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          damping: 12,
          stiffness: 100,
          delay: 100,
        }}
        style={styles.iconWrapper}
      >
        <View style={styles.iconCircle}>
          <Heart size={36} color="#2563EB" strokeWidth={2} fill="#DBEAFE" />
        </View>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 96,
    height: 96,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
});
