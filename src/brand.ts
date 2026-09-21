/**
 * LANDING BREND — saytdagi BARCHA markaz nomi, logo BITTA JOYDA.
 *
 * Boshqa markazga sotganda faqat `.env` faylda:
 *   VITE_BRAND_NAME=Bilim
 *   VITE_BRAND_NAME_FULL=Bilim School
 * yozib build qilasiz — header, footer, ro'yxat formasi, i18n matnlar
 * (3 tilda) va meta taglar hammasi avtomatik yangilanadi.
 */
const env = import.meta.env as Record<string, string | undefined>

/** Qisqa nom — logo yonidagi yozuv ("Excellence.") */
export const BRAND_NAME = env.VITE_BRAND_NAME || 'Excellence'

/** To'liq nom — matnlar, meta taglar ("Excellence School") */
export const BRAND_NAME_FULL = env.VITE_BRAND_NAME_FULL || `${BRAND_NAME} School`

/** Logo rasmi (import qilingan asset — Vite hash'langan URL beradi) */
export { default as BRAND_LOGO } from '@/assets/images/logo.jpg'
