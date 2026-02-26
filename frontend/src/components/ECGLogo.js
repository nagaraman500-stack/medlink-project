import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * MedLink ECG Logo - Circular teal background with white heartbeat/ECG line.
 * Matches the design in login/register pages.
 */
const ECGLogo = ({ size = 80, bgColor = '#2A9D8F', lineColor = '#FFFFFF', style }) => {
  const lineWidth = size * 0.6;
  const lineHeight = size * 0.4;
  const stroke = Math.max(2.5, size / 25);
  
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {/* Circular background */}
      <View style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bgColor,
          justifyContent: 'center',
          alignItems: 'center',
        }
      ]}>
        {/* ECG/Heartbeat waveform made with multiple line segments */}
        <View style={[styles.waveContainer, { width: lineWidth, height: lineHeight }]}>
          <View style={styles.waveRow}>
            {/* Left horizontal line */}
            <View style={[
              styles.waveSegment,
              { width: lineWidth * 0.2, height: stroke, backgroundColor: lineColor }
            ]} />
            
            {/* First small peak */}
            <View style={styles.peakContainer}>
              <View style={[
                styles.waveDiagonal,
                { width: stroke, height: lineHeight * 0.3, backgroundColor: lineColor, transform: [{ rotate: '-45deg' }] }
              ]} />
            </View>
            
            {/* Big spike up */}
            <View style={[
              styles.waveDiagonal,
              { 
                width: stroke, 
                height: lineHeight * 0.9, 
                backgroundColor: lineColor, 
                transform: [{ rotate: '-30deg' }],
                marginBottom: -lineHeight * 0.3
              }
            ]} />
            
            {/* Sharp drop down */}
            <View style={[
              styles.waveDiagonal,
              { 
                width: stroke, 
                height: lineHeight * 1.1, 
                backgroundColor: lineColor, 
                transform: [{ rotate: '30deg' }],
                marginTop: -lineHeight * 0.2
              }
            ]} />
            
            {/* Small recovery peak */}
            <View style={[
              styles.waveDiagonal,
              { 
                width: stroke, 
                height: lineHeight * 0.4, 
                backgroundColor: lineColor, 
                transform: [{ rotate: '-45deg' }],
                marginBottom: -lineHeight * 0.1
              }
            ]} />
            
            {/* Right horizontal line */}
            <View style={[
              styles.waveSegment,
              { width: lineWidth * 0.15, height: stroke, backgroundColor: lineColor }
            ]} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveSegment: {
    borderRadius: 1,
  },
  peakContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  waveDiagonal: {
    borderRadius: 1,
  },
});

export default ECGLogo;
