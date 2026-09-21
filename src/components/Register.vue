<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  PartyPopper,
  RotateCcw,
  Send,
  ShieldCheck,
} from "lucide-vue-next";
import LangSwitcher from "@/components/LangSwitcher.vue";
import {
  API_BASE_URL,
  apiPost,
  captchaErrorText,
  deviceExtra,
  formatUzPhone,
  isValidUzPhone,
  SITE_SOURCE,
} from "@/api/client";
import { awarenessKeys, studiedKeys, useI18n } from "@/i18n";
import { BRAND_NAME } from "@/brand";

const { t, locale } = useI18n();

const form = reactive({
  name: "",
  surname: "",
  phone: "",
  selected: [] as string[],
  awareOf: "" as string,
  studied: "" as (typeof studiedKeys)[number] | "",
});

const submitting = ref(false);
const success = ref(false);
const errorMsg = ref("");

// "Men robot emasman" captcha — har bir yuborishdan oldin yangi savol
const captcha = ref({ id: "", question: "" });
const captchaAnswer = ref("");
const captchaError = ref("");

async function loadCaptcha() {
  captchaError.value = "";
  try {
    const res = await fetch(`${API_BASE_URL}/api/captcha/new/`);
    if (res.ok) captcha.value = await res.json();
  } catch {
    // captcha yuklanmasa forma baribir ochiq qoladi — backend rad etadi
  }
}

function refreshCaptcha() {
  captchaAnswer.value = "";
  loadCaptcha();
}

loadCaptcha();

const phoneValid = computed(() => form.phone === "" || isValidUzPhone(form.phone));
const canSubmit = computed(
  () =>
    form.name.trim().length >= 2 &&
    form.surname.trim().length >= 2 &&
    isValidUzPhone(form.phone) &&
    form.selected.length > 0 &&
    form.awareOf !== "" &&
    form.studied !== "",
);

const successText = computed(() =>
  t.value.register.successText.replace("{phone}", form.phone),
);

/** Submit: CRM'da Lead sifatida qayd etiladi + menejerga Telegram xabar boradi. */
async function submit() {
  errorMsg.value = "";

  if (!canSubmit.value) {
    errorMsg.value = t.value.register.errorFields;
    return;
  }

  if (!captchaAnswer.value || !captcha.value.id) {
    errorMsg.value = t.value.errors.captchaMissing;
    return;
  }

  submitting.value = true;
  const awareIndex = awarenessKeys.indexOf(form.awareOf as (typeof awarenessKeys)[number]);
  const awareLabel = (awareIndex >= 0 ? t.value.register.awareness[awareIndex] : undefined) ?? form.awareOf;
  const studiedIndex = studiedKeys.indexOf(form.studied as (typeof studiedKeys)[number]);
  const studiedLabel = (studiedIndex >= 0 ? t.value.register.studied[studiedIndex] : undefined) ?? form.studied;

  const res = await apiPost<{ id: number }>("/api/site-lead/", {
    name: `${form.name.trim()} ${form.surname.trim()}`.trim(),
    phone: form.phone.trim(),
    interest: form.selected.join(", "),
    note: [
      "Saytdan ro'yxatdan o'tish (Register form)",
      `Manba: ${awareLabel}`,
      `Oldin o'qigan: ${studiedLabel}`,
    ].join(" | "),
    source: `${SITE_SOURCE}:${locale.value}`,
    device_extra: deviceExtra(),
    captcha_id: captcha.value.id,
    captcha_answer: captchaAnswer.value,
  });
  submitting.value = false;

  if (res.ok) {
    success.value = true;
  } else {
    errorMsg.value = captchaErrorText(res, (k) => t.value[k as never]) ?? t.value.errors.generic;
    // Captcha bir martalik — xato bo'lsa-yoki muvaffaqiyatli bo'lsa ham yangilash kerak
    if (res.status === 400) refreshCaptcha();
  }
}

function onPhoneInput(e: Event) {
  const target = e.target as HTMLInputElement;
  form.phone = formatUzPhone(target.value);
}
</script>

<template>
  <!-- Bitta ekran: scroll yo'q — vertikal bo'shliqlar clamp() bilan ekran balandligiga moslashadi -->
  <main
    class="relative h-[100dvh] overflow-hidden bg-gradient-to-br from-ink-950 via-brand-950 to-ink-900"
  >
    <div class="absolute -left-32 top-0 h-96 w-96 animate-blob rounded-full bg-brand-600/25 blur-3xl" />
    <div class="absolute -right-24 bottom-10 h-96 w-96 animate-blob rounded-full bg-brand-400/15 blur-3xl [animation-delay:6s]" />

    <div class="relative mx-auto flex h-full max-w-6xl flex-col px-5 sm:px-8">
      <!-- Yuqori qator -->
      <div class="flex items-center justify-between pt-5">
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft class="h-4 w-4" />
          <span class="hidden sm:inline">{{ t.register.back }}</span>
        </RouterLink>
        <div class="flex items-center gap-3">
          <LangSwitcher />
          <span class="font-display text-lg font-bold text-white">
            {{ BRAND_NAME }}<span class="text-brand-400">.</span>
          </span>
        </div>
      </div>

      <div class="grid min-h-0 flex-1 items-center gap-[clamp(12px,3vh,32px)] py-[clamp(4px,1.5vh,16px)] lg:grid-cols-[1fr_480px]">
        <!-- Chap: qisqa matn (katta ekranda) -->
        <div class="hidden text-white lg:block">
          <h1 class="font-display text-4xl font-extrabold leading-tight tracking-tight xl:text-5xl">
            {{ t.register.titlePre }}
            <span class="text-gradient-light">{{ t.register.titleAccent }}</span>
          </h1>
          <p class="mt-4 max-w-md text-base leading-relaxed text-slate-300">
            {{ t.register.subtitle }}
          </p>

          <ul class="mt-7 space-y-4">
            <li class="flex items-start gap-3.5">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-500/25 text-brand-200">
                <PartyPopper class="h-5 w-5" />
              </span>
              <div>
                <p class="font-bold">{{ t.register.perk1 }}</p>
                <p class="mt-0.5 text-sm text-slate-400">{{ t.register.perk1Text }}</p>
              </div>
            </li>
            <li class="flex items-start gap-3.5">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-500/25 text-brand-200">
                <ShieldCheck class="h-5 w-5" />
              </span>
              <div>
                <p class="font-bold">{{ t.register.perk2 }}</p>
                <p class="mt-0.5 text-sm text-slate-400">{{ t.register.perk2Text }}</p>
              </div>
            </li>
            <li class="flex items-start gap-3.5">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-500/25 text-brand-200">
                <CheckCircle2 class="h-5 w-5" />
              </span>
              <div>
                <p class="font-bold">{{ t.register.perk3 }}</p>
                <p class="mt-0.5 text-sm text-slate-400">{{ t.register.perk3Text }}</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- O'ng: forma -->
        <div class="relative mx-auto w-full max-w-[480px]">
          <div class="absolute -inset-1 rounded-[1.6rem] bg-gradient-to-br from-brand-400/40 via-brand-500/10 to-transparent blur-lg" />
          <div
            class="relative max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain rounded-[1.6rem] bg-white p-[clamp(12px,2.4vh,24px)] shadow-2xl shadow-ink-950/40"
          >
            <template v-if="success">
              <div class="py-[clamp(16px,6vh,40px)] text-center">
                <span class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-500">
                  <CheckCircle2 class="h-11 w-11" />
                </span>
                <h2 class="font-display mt-6 text-2xl font-bold text-ink-900">
                  {{ t.register.successTitle }}
                </h2>
                <p class="mx-auto mt-3 max-w-sm text-slate-600">
                  {{ successText }}
                </p>
                <RouterLink
                  to="/"
                  class="mt-8 inline-block rounded-2xl bg-brand-600 px-7 py-3 font-bold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-500"
                >
                  {{ t.register.backHome }}
                </RouterLink>
              </div>
            </template>

            <template v-else>
              <h2 class="font-display text-[clamp(16px,2.8vh,20px)] font-bold text-ink-900">
                {{ t.register.formTitle }}
              </h2>
              <p class="mt-0.5 hidden text-xs text-slate-500 sm:block">
                {{ t.register.formSubtitle }}
              </p>

              <form class="mt-[clamp(6px,1.2vh,12px)] space-y-[clamp(5px,1.1vh,12px)]" @submit.prevent="submit">
                <div class="grid grid-cols-2 gap-2.5">
                  <div>
                    <label for="reg-name" class="mb-0.5 block text-xs font-bold text-ink-900">{{ t.register.nameLabel }}</label>
                    <input
                      id="reg-name"
                      v-model="form.name"
                      type="text"
                      autocomplete="given-name"
                      :placeholder="t.register.namePlaceholder"
                      class="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3 py-2 text-ink-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/15"
                    />
                  </div>
                  <div>
                    <label for="reg-surname" class="mb-0.5 block text-xs font-bold text-ink-900">{{ t.register.surnameLabel }}</label>
                    <input
                      id="reg-surname"
                      v-model="form.surname"
                      type="text"
                      autocomplete="family-name"
                      :placeholder="t.register.surnamePlaceholder"
                      class="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3 py-2 text-ink-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/15"
                    />
                  </div>
                </div>

                <div>
                  <label for="reg-phone" class="mb-0.5 block text-xs font-bold text-ink-900">{{ t.register.phoneLabel }}</label>
                  <input
                    id="reg-phone"
                    v-model="form.phone"
                    type="tel"
                    inputmode="tel"
                    autocomplete="tel"
                    :placeholder="t.register.phonePlaceholder"
                    class="w-full rounded-xl border px-3 py-2 outline-none transition focus:ring-4 focus:ring-brand-500/15"
                    :class="phoneValid
                      ? 'border-slate-300 bg-slate-50/50 text-ink-900 focus:border-brand-500 focus:bg-white'
                      : 'border-red-300 bg-red-50/50 text-red-900 focus:border-red-500'"
                    @input="onPhoneInput"
                  />
                  <p v-if="!phoneValid" class="mt-1 text-xs font-semibold text-red-500">
                    {{ t.register.phoneInvalid }}
                  </p>
                </div>

                <fieldset>
                  <legend class="mb-1.5 block text-xs font-bold text-ink-900">
                    {{ t.register.coursesTitle }}
                  </legend>
                  <div class="grid grid-cols-2 gap-1.5">
                    <label
                      v-for="course in t.register.courses"
                      :key="course"
                      class="flex cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[13px] font-semibold transition"
                      :class="form.selected.includes(course)
                        ? 'border-brand-500 bg-brand-50 text-brand-800'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-brand-300'"
                    >
                      <input
                        v-model="form.selected"
                        type="checkbox"
                        :value="course"
                        class="h-3.5 w-3.5 shrink-0 cursor-pointer accent-brand-600"
                      />
                      {{ course }}
                    </label>
                  </div>
                </fieldset>

                <div>
                  <p class="mb-1.5 text-xs font-bold text-ink-900">
                    {{ t.register.awarenessTitle }}
                  </p>
                  <div class="flex flex-wrap gap-1.5">
                    <button
                      v-for="(label, i) in t.register.awareness"
                      :key="awarenessKeys[i] ?? label"
                      type="button"
                      class="cursor-pointer rounded-full border px-3 py-1 text-xs font-bold transition"
                      :class="form.awareOf === awarenessKeys[i]
                        ? 'border-brand-500 bg-brand-500 text-white shadow'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-brand-300'"
                      :aria-pressed="form.awareOf === awarenessKeys[i]"
                      @click="form.awareOf = awarenessKeys[i] ?? 'other'"
                    >
                      {{ label }}
                    </button>
                  </div>
                </div>

                <div>
                  <p class="mb-1.5 text-xs font-bold text-ink-900">
                    {{ t.register.studiedTitle }}
                  </p>
                  <div class="flex flex-wrap gap-1.5">
                    <button
                      v-for="(label, i) in t.register.studied"
                      :key="studiedKeys[i] ?? label"
                      type="button"
                      class="cursor-pointer rounded-full border px-3 py-1 text-xs font-bold transition"
                      :class="form.studied === studiedKeys[i]
                        ? 'border-brand-500 bg-brand-500 text-white shadow'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-brand-300'"
                      :aria-pressed="form.studied === studiedKeys[i]"
                      @click="form.studied = studiedKeys[i] ?? 'no'"
                    >
                      {{ label }}
                    </button>
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between gap-2 rounded-xl border border-brand-100 bg-gradient-to-r from-brand-50 to-white px-3 py-2.5">
                    <div class="flex items-center gap-2.5">
                      <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
                        <ShieldCheck class="h-4.5 w-4.5" />
                      </span>
                      <div>
                        <p class="text-[10px] font-bold uppercase tracking-wide text-brand-500">{{ t.register.captchaTitle }}</p>
                        <p class="font-mono text-lg font-bold leading-tight text-ink-900 select-none">
                          {{ captcha.question || "..." }}
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <input
                        id="reg-captcha"
                        v-model="captchaAnswer"
                        type="text"
                        inputmode="numeric"
                        autocomplete="off"
                        placeholder="?"
                        :aria-label="t.register.captchaAnswerLabel"
                        class="w-16 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-center font-mono text-base font-bold text-ink-900 outline-none transition placeholder:text-slate-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15"
                      />
                      <button
                        type="button"
                        class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-brand-300 hover:text-brand-500"
                        :title="t.register.captchaRefresh"
                        :aria-label="t.register.captchaRefresh"
                        @click="refreshCaptcha"
                      >
                        <Loader2 v-if="submitting" class="h-4 w-4 animate-spin" />
                        <RotateCcw v-else class="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p v-if="captchaError" class="mt-1 text-xs font-semibold text-red-500">
                    {{ captchaError }}
                  </p>
                </div>

                <p
                  v-if="errorMsg"
                  class="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
                  role="alert"
                >
                  {{ errorMsg }}
                </p>

                <button
                  type="submit"
                  :disabled="submitting"
                  class="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 py-[clamp(8px,1.6vh,12px)] font-bold text-white shadow-xl shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Loader2 v-if="submitting" class="h-5 w-5 animate-spin" />
                  <Send v-else class="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                  {{ submitting ? t.register.submitting : t.register.submit }}
                </button>

                <p class="flex items-center justify-center gap-1.5 text-center text-[11px] leading-relaxed text-slate-400">
                  <ShieldCheck class="h-3.5 w-3.5 shrink-0" />
                  {{ t.register.privacy }}
                </p>
              </form>
            </template>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
