<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { CheckCircle2, Loader2, MessageSquareHeart, Send } from "lucide-vue-next";
import {
  API_BASE_URL,
  apiPost,
  formatUzPhone,
  isValidUzPhone,
  SITE_SOURCE,
} from "@/api/client";
import { useI18n } from "@/i18n";

const { t, locale } = useI18n();

const form = reactive({
  name: "",
  phone: "",
  message: "",
});

const submitting = ref(false);
const success = ref(false);
const errorMsg = ref("");

// "Men robot emasman" captcha
const captcha = ref({ id: "", question: "" });
const captchaAnswer = ref("");

async function loadCaptcha() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/captcha/new/`);
    if (res.ok) captcha.value = await res.json();
  } catch {
    // backend rad etadi — forma ochiq qoladi
  }
}

function refreshCaptcha() {
  captchaAnswer.value = "";
  loadCaptcha();
}

loadCaptcha();

const successText = computed(() =>
  t.value.support.successText.replace("{phone}", form.phone),
);

/** Submit: ma'lumotlar CRM backend'ga yuboriladi va menejerga Telegram bot orqali boradi. */
async function submit() {
  errorMsg.value = "";

  if (form.name.trim().length < 2) {
    errorMsg.value = t.value.errors.shortName;
    return;
  }
  if (!isValidUzPhone(form.phone)) {
    errorMsg.value = t.value.errors.phone;
    return;
  }

  if (!captchaAnswer.value || !captcha.value.id) {
    errorMsg.value = "Tekshiruv savoliga javob bering (men robot emasman)";
    return;
  }

  submitting.value = true;
  const res = await apiPost<{ id: number }>("/api/site-lead/", {
    name: form.name.trim(),
    phone: form.phone.trim(),
    interest: "Need Support",
    note: form.message.trim(),
    source: `${SITE_SOURCE}:${locale.value}`,
    captcha_id: captcha.value.id,
    captcha_answer: captchaAnswer.value,
  });
  submitting.value = false;

  if (res.ok) {
    success.value = true;
  } else {
    errorMsg.value = res.error ?? t.value.errors.generic;
    if (res.status === 400) refreshCaptcha();
  }
}

function resetForm() {
  success.value = false;
  form.name = "";
  form.phone = "";
  form.message = "";
}

function onPhoneInput(e: Event) {
  const target = e.target as HTMLInputElement;
  form.phone = formatUzPhone(target.value);
}
</script>

<template>
  <section id="support" class="relative overflow-hidden bg-slate-50 py-20 sm:py-24">
    <div class="absolute -left-24 bottom-0 h-80 w-80 animate-blob rounded-full bg-brand-100 blur-3xl" />

    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
      <div class="grid items-center gap-14 lg:grid-cols-2">
        <!-- Chap ustun: matn -->
        <div>
          <p v-reveal class="text-sm font-bold uppercase tracking-widest text-brand-600">
            {{ t.support.eyebrow }}
          </p>
          <h2
            v-reveal="100"
            class="font-display mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl"
          >
            {{ t.support.titlePre }}
            <span class="text-gradient">{{ t.support.titleAccent }}</span>
          </h2>
          <p v-reveal="200" class="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
            {{ t.support.subtitlePre }}
            <b class="text-ink-900">{{ t.support.subtitleBold }}</b>
            {{ t.support.subtitlePost }}
          </p>

          <ul v-reveal="300" class="mt-8 space-y-4">
            <li class="flex items-start gap-3">
              <span class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                <MessageSquareHeart class="h-5 w-5" />
              </span>
              <p class="text-slate-700">
                <b class="text-ink-900">{{ t.support.perk1 }}</b>
                {{ t.support.perk1Text }}
              </p>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                <CheckCircle2 class="h-5 w-5" />
              </span>
              <p class="text-slate-700">
                <b class="text-ink-900">{{ t.support.perk2 }}</b>
                {{ t.support.perk2Text }}
              </p>
            </li>
          </ul>
        </div>

        <!-- O'ng ustun: shakl -->
        <div v-reveal="150" class="relative">
          <div class="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-brand-400/40 via-brand-500/10 to-transparent blur-lg" />
          <div class="relative rounded-[2rem] border border-slate-100 bg-white p-7 shadow-2xl shadow-brand-950/10 sm:p-9">
            <template v-if="success">
              <div class="py-10 text-center">
                <span class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-500">
                  <CheckCircle2 class="h-11 w-11" />
                </span>
                <h3 class="font-display mt-6 text-2xl font-bold text-ink-900">
                  {{ t.support.successTitle }}
                </h3>
                <p class="mx-auto mt-3 max-w-sm text-slate-600">
                  {{ successText }}
                </p>
                <button
                  type="button"
                  class="mt-8 cursor-pointer rounded-2xl border border-brand-200 px-6 py-2.5 font-bold text-brand-700 transition hover:bg-brand-50"
                  @click="resetForm"
                >
                  {{ t.support.again }}
                </button>
              </div>
            </template>

            <template v-else>
              <h3 class="font-display text-2xl font-bold text-ink-900">
                {{ t.support.formTitle }}
              </h3>
              <p class="mt-1.5 text-sm text-slate-500">
                {{ t.support.formSubtitle }}
              </p>

              <form class="mt-7 space-y-5" @submit.prevent="submit">
                <div>
                  <label for="support-name" class="mb-1.5 block text-sm font-bold text-ink-900">
                    {{ t.support.nameLabel }}
                  </label>
                  <input
                    id="support-name"
                    v-model="form.name"
                    type="text"
                    autocomplete="name"
                    :placeholder="t.support.namePlaceholder"
                    class="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-ink-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/15"
                  />
                </div>

                <div>
                  <label for="support-phone" class="mb-1.5 block text-sm font-bold text-ink-900">
                    {{ t.support.phoneLabel }}
                  </label>
                  <input
                    id="support-phone"
                    v-model="form.phone"
                    type="tel"
                    inputmode="tel"
                    autocomplete="tel"
                    :placeholder="t.support.phonePlaceholder"
                    class="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-ink-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/15"
                    @input="onPhoneInput"
                  />
                </div>

                <div>
                  <label for="support-message" class="mb-1.5 block text-sm font-bold text-ink-900">
                    {{ t.support.messageLabel }}
                    <span class="font-medium text-slate-400">{{ t.support.messageOptional }}</span>
                  </label>
                  <textarea
                    id="support-message"
                    v-model="form.message"
                    rows="4"
                    :placeholder="t.support.messagePlaceholder"
                    class="w-full resize-none rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-ink-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/15"
                  />
                </div>

                <div>
                  <label for="support-captcha" class="mb-1.5 block text-sm font-bold text-ink-900">
                    Tekshiruv: {{ captcha.question || "..." }}
                  </label>
                  <div class="flex gap-2">
                    <input
                      id="support-captcha"
                      v-model="captchaAnswer"
                      type="text"
                      inputmode="numeric"
                      autocomplete="off"
                      placeholder="Javob"
                      class="w-28 rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-ink-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/15"
                    />
                    <button
                      type="button"
                      class="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-500 transition hover:border-brand-300"
                      title="Boshqa savol"
                      @click="refreshCaptcha"
                    >
                      ⟳
                    </button>
                  </div>
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
                  class="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 py-4 font-bold text-white shadow-xl shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Loader2 v-if="submitting" class="h-5 w-5 animate-spin" />
                  <Send v-else class="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                  {{ submitting ? t.support.submitting : t.support.submit }}
                </button>

                <p class="text-center text-xs leading-relaxed text-slate-400">
                  {{ t.support.privacy }}
                </p>
              </form>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
