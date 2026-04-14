import { Pressable, View, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';

export function NavbarHamburger() {
  const nav = useNavigation();
  const onPress = () => {
    const anyNav = nav as any;
    const tryOpen = (n: any) => {
      if (!n) return false;
      try {
        if (typeof n.dispatch === 'function') {
          n.dispatch(DrawerActions.openDrawer());
          return true;
        }
      } catch {}
      if (typeof n.openDrawer === 'function') {
        n.openDrawer();
        return true;
      }
      return false;
    };
    if (tryOpen(anyNav)) return;
    let parent = anyNav?.getParent ? anyNav.getParent() : undefined;
    if (tryOpen(parent)) return;
    parent = parent?.getParent ? parent.getParent() : undefined;
    if (tryOpen(parent)) return;
    const grand = parent?.getParent ? parent.getParent() : undefined;
    tryOpen(grand);
  };
  return (
    <Pressable onPress={onPress} style={styles.hitbox}>
      <View style={styles.bar} />
      <View style={[styles.bar, styles.barGap]} />
      <View style={styles.bar} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hitbox: { padding: 8 },
  bar: { width: 24, height: 2, backgroundColor: '#111827' },
  barGap: { marginVertical: 6 },
});
