import { useEffect, useState } from 'react';

import { apiJson } from '../../config/api';
import { useAuthStore } from '../../store/auth';
import type { CategoryKey, LessonMode } from '../types';

export interface ScriptItem {
  id: number;
  text: string;
}

type UseStandardLessonScriptsParams = {
  category: CategoryKey;
  initialCategoryId?: string | null;
  mode: LessonMode;
  token?: string | null;
};

export function useStandardLessonScripts({
  category,
  initialCategoryId = null,
  mode,
  token,
}: UseStandardLessonScriptsParams): {
  scripts: ScriptItem[];
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  resolvedCategoryId: string | null;
} {
  const [resolvedCategoryId, setResolvedCategoryId] = useState<string | null>(initialCategoryId);
  const [scripts, setScripts] = useState<ScriptItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setResolvedCategoryId(initialCategoryId ?? null);
  }, [initialCategoryId]);

  useEffect(() => {
    if (resolvedCategoryId) return;
    let cancelled = false;

    (async () => {
      try {
        const qs = new URLSearchParams();
        const st = useAuthStore.getState();
        const uid = st.user?.userId || (st.user?.id != null ? String(st.user.id) : undefined);
        if (uid) qs.set('userId', uid);
        const { ok, data } = await apiJson<any>(`/api/category${qs.toString() ? `?${qs.toString()}` : ''}`, {
          method: 'GET',
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (!ok || !data) return;

        const list: any[] = Array.isArray(data)
          ? data
          : (Array.isArray((data as any).items) && (data as any).items) ||
            (Array.isArray((data as any).data) && (data as any).data) ||
            (Array.isArray((data as any).list) && (data as any).list) ||
            (Array.isArray((data as any).rows) && (data as any).rows) ||
            (Array.isArray((data as any).categories) && (data as any).categories) ||
            [];

        const LABELS: Record<string, string[]> = {
          deliver: ['deliver', '전달'],
          persuade: ['persuade', '설득'],
          empathy: ['empathy', '교감'],
          emotion: ['emotion', '감정'],
          directive: ['directive', '지시'],
          interrogative: ['interrogative', '질의'],
        };
        const wanted = new Set([category, ...(LABELS[category] || [])].map((s) => s.toLowerCase()));
        const getStrs = (o: any) =>
          [o?.key, o?.code, o?.slug, o?.name, o?.title, o?.displayName, o?.label]
            .map((v) => (typeof v === 'string' ? v.trim().toLowerCase() : ''))
            .filter(Boolean);

        let found: string | null = null;
        for (const it of list) {
          const rawId = (it as any)?.id ?? (it as any)?.categoryId ?? (it as any)?.category_id;
          const id = typeof rawId === 'string' ? rawId : rawId != null ? String(rawId) : null;
          if (!id) continue;
          const vals = new Set(getStrs(it));
          if ([...wanted].some((w) => vals.has(w))) {
            found = id;
            break;
          }
        }
        if (!found && list.length > 0) {
          const rawId = (list[0] as any)?.id ?? (list[0] as any)?.categoryId ?? (list[0] as any)?.category_id;
          found = typeof rawId === 'string' ? rawId : rawId != null ? String(rawId) : null;
        }
        if (!cancelled && found) setResolvedCategoryId(found);
      } catch {
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [resolvedCategoryId, category, token]);

  useEffect(() => {
    if (!resolvedCategoryId) return;
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const qs = new URLSearchParams();
        qs.set('mode', mode);
        const st = useAuthStore.getState();
        const uid = st.user?.userId || (st.user?.id != null ? String(st.user.id) : undefined);
        if (uid) qs.set('userId', uid);
        const url = `/api/category/${encodeURIComponent(resolvedCategoryId)}/scripts?${qs.toString()}`;
        const { ok, data, status } = await apiJson<any>(url, {
          method: 'GET',
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (!ok) {
          if (!cancelled) setError(`문장 불러오기 실패 (status ${status})`);
          return;
        }
        const toScriptItem = (v: any, index: number): ScriptItem | null => {
          if (typeof v === 'string') {
            return { id: index + 1, text: v };
          }
          
          const text = v?.title ?? v?.text ?? v?.sentence ?? v?.content ?? v?.script ?? '';
          if (!text) return null;
          
          const rawId = v?.id ?? v?.scriptId ?? v?.script_id;
          const id = typeof rawId === 'number' ? rawId : 
                     typeof rawId === 'string' ? parseInt(rawId, 10) : 
                     (index + 1);
          
          const scriptId = isNaN(id) || id <= 0 ? (index + 1) : id;
          
          return { id: scriptId, text };
        };
        
        let arr: ScriptItem[] = [];
        if (Array.isArray(data)) {
          arr = data.map((v, index) => toScriptItem(v, index)).filter((item): item is ScriptItem => item !== null);
        } else {
          const candidates: any[] =
            (Array.isArray((data as any).items) && (data as any).items) ||
            (Array.isArray((data as any).data) && (data as any).data) ||
            (Array.isArray((data as any).list) && (data as any).list) ||
            (Array.isArray((data as any).rows) && (data as any).rows) ||
            (Array.isArray((data as any).scripts) && (data as any).scripts) ||
            [];
          if (candidates.length) {
            arr = candidates.map((v, index) => toScriptItem(v, index)).filter((item): item is ScriptItem => item !== null);
          }
        }
        if (!cancelled) {
          setScripts(arr);
          if (arr.length === 0) setError('불러온 문장이 없습니다.');
        }
      } catch {
        if (!cancelled) setError('서버 오류로 문장을 불러오지 못했습니다.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [resolvedCategoryId, mode, token]);

  return {
    scripts: scripts as ScriptItem[], 
    loading, 
    error, 
    setError, 
    resolvedCategoryId 
  };
}

