import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { View, StyleSheet, Text, Pressable, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import AppHeader from '@/components/UI/AppHeader';
import SectionTitle from '../components/common/SectionTitle';
import CategoryPanel from '../components/common/CategoryPanel';
import { CATEGORIES } from '../data/categories';
import { CategoryKey } from '../types';
import { useAuthStore } from '../../store/auth';
import { apiJson } from '../../config/api';

let AsyncStorage: any = null;
try {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch {}

export default function LearnIndexScreen() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const isAuthed = useAuthStore((s) => s.isAuthenticated);
  const userKey = token || 'guest';
  const storageKey = `categoryOrder:${userKey}`;
  const hiddenStorageKey = `categoryHidden:${userKey}`;

  const [fav, setFav] = useState<Record<CategoryKey, boolean>>({
    deliver: false,
    persuade: false,
    empathy: false,
    emotion: false,
    directive: false,
    interrogative: false,
  });

  const [order, setOrder] = useState<CategoryKey[]>(() => CATEGORIES.map((c) => c.key));
  const [hidden, setHidden] = useState<Record<CategoryKey, boolean>>({
    deliver: false,
    persuade: false,
    empathy: false,
    emotion: false,
    directive: false,
    interrogative: false,
  });
  const [showRestore, setShowRestore] = useState(false);

  const [catIdMap, setCatIdMap] = useState<Map<string, number>>(new Map());

  const [fetchError, setFetchError] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const st = useAuthStore.getState();
        if (!st.token || !st.token.length || !isAuthed) {
          return;
        }
        const qs = new URLSearchParams();
        const uid = st.user?.userId || (st.user?.id != null ? String(st.user.id) : undefined);
        if (uid) qs.set('userId', uid);
        const url = `/api/category${qs.toString() ? `?${qs.toString()}` : ''}`;
        const { ok, data, status } = await apiJson<any>(url, {
          method: 'GET',
          headers: st.token ? { Authorization: `Bearer ${st.token}` } : undefined,
        });
        if (!ok || !data) {
          if (!cancelled) setFetchError(status === 401 ? '인증이 만료되었습니다. 다시 로그인 해주세요.' : '카테고리 로딩 실패');
          return;
        }
        const list: any[] = Array.isArray(data)
          ? data
          : (Array.isArray((data as any).items) && (data as any).items) ||
            (Array.isArray((data as any).data) && (data as any).data) ||
            (Array.isArray((data as any).list) && (data as any).list) ||
            (Array.isArray((data as any).rows) && (data as any).rows) ||
            (Array.isArray((data as any).categories) && (data as any).categories) ||
            [];
        if (list.length === 0) {
          if (!cancelled) setFetchError('카테고리가 없습니다.');
          return;
        }
        const m = new Map<string, number>();
        const LABELS: Record<string, string[]> = {
          deliver: ['deliver', '전달'],
          persuade: ['persuade', '설득'],
          empathy: ['empathy', '교감'],
          emotion: ['emotion', '감정'],
          directive: ['directive', '지시', '지휘', '지시/강의', '강의', '지휘/지시'],
          interrogative: ['interrogative', '질의', '질문'],
        };
        const getStrs = (o: any) =>
          [o?.key, o?.code, o?.slug, o?.name, o?.title, o?.displayName, o?.label]
            .map((v) => (typeof v === 'string' ? v.trim().toLowerCase() : ''))
            .filter(Boolean);
        for (const it of list) {
          const rawId = (it as any)?.id ?? (it as any)?.categoryId ?? (it as any)?.category_id;
          const id = typeof rawId === 'string' ? Number(rawId) : rawId;
          if (id == null || Number.isNaN(id)) continue;
          const values = new Set(getStrs(it));
          for (const key of Object.keys(LABELS)) {
            const labels = LABELS[key];
            if (labels.some((s) => values.has(s.toLowerCase()))) {
              m.set(key, id);
            }
          }
        }
        if (!cancelled) {
          setCatIdMap(m);
          setFetchError(null);
        }
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, [token, isAuthed]);

  useEffect(() => {
    (async () => {
      if (!AsyncStorage?.getItem) return;
      try {
        const raw = await AsyncStorage.getItem(storageKey);
        if (!raw) return;
        const saved = JSON.parse(raw) as CategoryKey[];
        const valid = new Set(CATEGORIES.map((c) => c.key));
        const merged = [
          ...saved.filter((k) => valid.has(k)),
          ...CATEGORIES.map((c) => c.key).filter((k) => !saved.includes(k)),
        ];
        setOrder(merged);
      } catch {}
    })();
  }, [storageKey]);

  useEffect(() => {
    (async () => {
      if (!AsyncStorage?.setItem) return;
      try {
        await AsyncStorage.setItem(storageKey, JSON.stringify(order));
      } catch {}
    })();
  }, [order, storageKey]);

  const categoriesWithIds = useMemo(() => CATEGORIES.map((c) => ({ ...c, id: catIdMap.get(c.key) })), [catIdMap]);
  const mapByKey = useMemo(() => new Map(categoriesWithIds.map((c) => [c.key, c])), [categoriesWithIds]);
  const categoriesOrdered = order
    .map((k) => mapByKey.get(k)!)
    .filter(Boolean);

  const Header = (
    <View>
      <AppHeader />
      <View style={styles.headerBox}>
        <Text style={{ fontSize: 15, fontWeight: '800', color: '#0F172A' }}>학습 카테고리</Text>
        <Text style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>원하는 학습 유형을 선택하세요</Text>
        {!!fetchError && <Text style={{ marginTop: 6, color: '#DC2626' }}>{fetchError}</Text>}
      </View>
      <View style={styles.titleRow}>
        <SectionTitle title="전체 카테고리" />
        <View />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        {Header}
        <View style={styles.sectionGap}>
          {categoriesOrdered[0] && (
            <CategoryPanel
              size="full"
              category={categoriesOrdered[0]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                const id = (categoriesOrdered[0] as any).id;
                if (id == null) return Alert.alert('잠시만요', '카테고리 정보를 불러오는 중입니다.');
                router.push({ pathname: '/learn/standard', params: { category: categoriesOrdered[0].key, categoryId: String(id) } });
              }}
            />
          )}
        </View>

        <View style={[styles.row, styles.sectionGap]}>
          {categoriesOrdered[1] && (
            <View style={styles.col}>
              <CategoryPanel
                size="half"
                category={categoriesOrdered[1]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  const id = (categoriesOrdered[1] as any).id;
                  if (id == null) return Alert.alert('잠시만요', '카테고리 정보를 불러오는 중입니다.');
                  router.push({ pathname: '/learn/standard', params: { category: categoriesOrdered[1].key, categoryId: String(id) } });
                }}
              />
            </View>
          )}
          {categoriesOrdered[2] && (
            <View style={styles.col}>
              <CategoryPanel
                size="half"
                category={categoriesOrdered[2]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  const id = (categoriesOrdered[2] as any).id;
                  if (id == null) return Alert.alert('잠시만요', '카테고리 정보를 불러오는 중입니다.');
                  router.push({ pathname: '/learn/standard', params: { category: categoriesOrdered[2].key, categoryId: String(id) } });
                }}
              />
            </View>
          )}
        </View>

        <View style={[styles.row, styles.sectionGap]}>
          {categoriesOrdered[3] && (
            <View style={styles.col}>
              <CategoryPanel
                size="half"
                category={categoriesOrdered[3]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  const id = (categoriesOrdered[3] as any).id;
                  if (id == null) return Alert.alert('잠시만요', '카테고리 정보를 불러오는 중입니다.');
                  router.push({ pathname: '/learn/standard', params: { category: categoriesOrdered[3].key, categoryId: String(id) } });
                }}
              />
            </View>
          )}
          {categoriesOrdered[4] && (
            <View style={styles.col}>
              <CategoryPanel
                size="half"
                category={categoriesOrdered[4]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  const id = (categoriesOrdered[4] as any).id;
                  if (id == null) return Alert.alert('잠시만요', '카테고리 정보를 불러오는 중입니다.');
                  router.push({ pathname: '/learn/standard', params: { category: categoriesOrdered[4].key, categoryId: String(id) } });
                }}
              />
            </View>
          )}
        </View>

        <View style={styles.sectionGap}>
          {categoriesOrdered[5] && (
            <CategoryPanel
              size="full"
              category={categoriesOrdered[5]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                const id = (categoriesOrdered[5] as any).id;
                if (id == null) return Alert.alert('잠시만요', '카테고리 정보를 불러오는 중입니다.');
                router.push({ pathname: '/learn/standard', params: { category: categoriesOrdered[5].key, categoryId: String(id) } });
              }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  inner: { paddingHorizontal: 16, paddingBottom: 24, paddingTop: 0 },
  headerBox: { marginTop: 24, alignItems: 'center', gap: 6 },
  titleRow: { marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  col: { width: '48%' },
  sectionGap: { marginTop: 12 },
});

