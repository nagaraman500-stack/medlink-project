/**
 * MedLink Design System – spacing, typography, radius, shadows
 * Use for consistent, production-ready healthcare UI.
 */
import { Platform } from 'react-native';

const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

const TYPOGRAPHY = {
  // Headings
  h1: { fontSize: 28, fontWeight: '700' },
  h2: { fontSize: 22, fontWeight: '700' },
  h3: { fontSize: 18, fontWeight: '700' },
  h4: { fontSize: 16, fontWeight: '600' },
  // Body
  bodyLarge: { fontSize: 16, fontWeight: '400' },
  body: { fontSize: 15, fontWeight: '400' },
  bodySmall: { fontSize: 14, fontWeight: '400' },
  // Labels & captions
  label: { fontSize: 14, fontWeight: '600' },
  caption: { fontSize: 12, fontWeight: '500' },
  captionSmall: { fontSize: 11, fontWeight: '500' },
};

const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
};

const SHADOW = {
  card: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
    android: { elevation: 3 },
  }),
  cardElevated: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
    },
    android: { elevation: 6 },
  }),
  button: Platform.select({
    ios: {
      shadowColor: '#2E86AB',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
    },
    android: { elevation: 4 },
  }),
};

export { SPACING, TYPOGRAPHY, RADIUS, SHADOW };
export default { SPACING, TYPOGRAPHY, RADIUS, SHADOW };
