/** CRM backend manzili: .env faylda VITE_API_BASE_URL beriladi, bo'lmasa lokal server. */
export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/+$/, "") ||
  "http://127.0.0.1:8000";

export const SITE_SOURCE = "website";

export interface LeadPayload {
  name: string;
  phone: string;
  interest: string;
  note?: string;
}

export interface ApiResult<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
  /** HTTP holat kodi (xato bo'lganda) — masalan captcha xatosini aniqlash */
  status?: number;
  /** Captcha xato kodi (xato bo'lganda): missing/used/expired/too_fast/wrong */
  captchaCode?: string;
}

/** API so'rovini yuboradi va yagona formatda natija qaytaradi. */
export async function apiPost<T = unknown>(
  path: string,
  body: unknown,
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    let data: Record<string, unknown> = {};
    try {
      data = await res.json();
    } catch {
      /* bo'sh javob */
    }

    if (!res.ok) {
      const msg =
        (data.error as string) ||
        (data.detail as string) ||
        `Server xatosi (${res.status})`;
      return {
        ok: false,
        error: msg,
        status: res.status,
        captchaCode: (data.captcha_code as string) || undefined,
      };
    }
    return { ok: true, data: data as T };
  } catch {
    return {
      ok: false,
      error: "Serverga ulanib bo'lmadi. Internetni tekshirib, qayta urinib ko'ring.",
    };
  }
}

/** Qurilma qo'shimcha ma'lumoti: ekran · vaqt zonasi · til — lead bilan yuboriladi. */
export function deviceExtra(): string {
  if (typeof window === "undefined") return "";
  const screen = `${window.screen.width}x${window.screen.height}`;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  const lang = navigator.language || "";
  return [screen, tz, lang].filter(Boolean).join(" · ").slice(0, 100);
}

/**
 * Captcha xato kodini foydalanuvchi tiliga o'giradi.
 *
 * Backend "captcha_code" qaytaradi (missing/used/expired/too_fast/wrong) —
 * shu yerdan tilga mos xabar olinadi. Tarjima topilmasa undefined —
 * chaqiruvchi o'zining standart xabarini ko'rsatadi.
 */
export function captchaErrorText(
  res: ApiResult<unknown>,
  t: (key: string) => string,
): string | undefined {
  if (!res.captchaCode) return undefined;
  const map: Record<string, string> = {
    missing: "errors.captchaMissing",
    used: "errors.captchaUsed",
    expired: "errors.captchaExpired",
    too_fast: "errors.captchaTooFast",
    wrong: "errors.captchaWrong",
  };
  const key = map[res.captchaCode];
  return key ? t(key) : undefined;
}

/** '+998 90 123 45 67' → '901234567' (front tekshiruvi). */
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "").slice(-9);
}

export function isValidUzPhone(phone: string): boolean {
  return /^9\d{8}$/.test(normalizePhone(phone));
}

/** Raqamni yozish jarayonida '+998 90 123 45 67' ko'rinishiga keltiradi. */
export function formatUzPhone(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("998")) d = d.slice(3);
  d = d.slice(0, 9);
  const parts = [
    d.slice(0, 2),
    d.slice(2, 5),
    d.slice(5, 7),
    d.slice(7, 9),
  ].filter(Boolean);
  return parts.length ? `+998 ${parts.join(" ")}` : "";
}
