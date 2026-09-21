import { computed, ref } from "vue";
import { BRAND_NAME, BRAND_NAME_FULL } from "@/brand";

export type Locale = "uz" | "en" | "ru";

const STORAGE_KEY = "excellence-lang";

function initialLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved === "uz" || saved === "en" || saved === "ru") return saved;
  } catch {
    /* localStorage bloklangan bo'lsa */
  }
  return "uz";
}

const locale = ref<Locale>(initialLocale());

export interface Messages {
  nav: {
    home: string;
    how: string;
    success: string;
    register: string;
  };
  hero: {
    badge: string;
    titlePre: string;
    titleAccent: string;
    titlePost: string;
    subtitle: string;
    cta: string;
    secondary: string;
    stats: { value: string; label: string }[];
    quote: string;
    author: string;
  };
  success: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { target: number; suffix: string; name: string; note: string }[];
  };
  how: {
    eyebrow: string;
    titlePre: string;
    titleAccent: string;
    subtitle: string;
    steps: { name: string; text: string }[];
    cta: string;
  };
  support: {
    eyebrow: string;
    titlePre: string;
    titleAccent: string;
    subtitlePre: string;
    subtitleBold: string;
    subtitlePost: string;
    perk1: string;
    perk1Text: string;
    perk2: string;
    perk2Text: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    messageOptional: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    privacy: string;
    successTitle: string;
    successText: string;
    again: string;
  };
  register: {
    back: string;
    titlePre: string;
    titleAccent: string;
    subtitle: string;
    perk1: string;
    perk1Text: string;
    perk2: string;
    perk2Text: string;
    perk3: string;
    perk3Text: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    surnameLabel: string;
    surnamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    phoneInvalid: string;
    coursesTitle: string;
    courses: string[];
    awarenessTitle: string;
    awareness: string[];
    studiedTitle: string;
    studied: string[];
    submit: string;
    submitting: string;
    privacy: string;
    successTitle: string;
    successText: string;
    backHome: string;
    errorFields: string;
  };
  errors: {
    shortName: string;
    phone: string;
    network: string;
    generic: string;
  };
  footer: {
    about: string;
    pages: string;
    pageHome: string;
    pageHow: string;
    pageSuccess: string;
    pageSupport: string;
    pageRegister: string;
    coursesTitle: string;
    courses: string[];
    up: string;
    rights: string;
    slogan: string;
  };
  lang: { label: string };
}

const uz: Messages = {
  nav: {
    home: "Bosh sahifa",
    how: "Qanday ishlaydi",
    success: "Natijalarimiz",
    register: "Ro'yxatdan o'tish",
  },
  hero: {
    badge: "6+ yillik tajriba",
    titlePre: "Kelajakni",
    titleAccent: "bugundan",
    titlePost: "quramiz",
    subtitle:
      `${BRAND_NAME_FULL} — Ingliz tili (IELTS), Rus tili, Arab tili va Matematika kurslari. Tajribali ustozlar, zamonaviy metodika va har bir o'quvchiga individual yondashuv.`,
    cta: "Hoziroq yozilish",
    secondary: "Qanday ishlaydi",
    stats: [
      { value: "1 500+", label: "bitiruvchi o'quvchi" },
      { value: "70%", label: "yuqori natija" },
      { value: "10+", label: "tajribali ustoz" },
    ],
    quote:
      "«Bu yerda o'qishni boshlaganimdan keyin IELTS imtihonidan 7.5 ball oldim. Ustozlar har birimizga alohida e'tibor beradi.»",
    author: "Malika — IELTS bitiruvchisi",
  },
  success: {
    eyebrow: "Natijalarimiz",
    title: "Raqamlar o'z gapiradi",
    subtitle:
      "Har bir raqam ortida maqsadiga bir qadam yaqinlashgan o'quvchi turibdi.",
    items: [
      { target: 1500, suffix: "+", name: "O'quvchilar", note: "markazimizda tahsil olgan" },
      { target: 70, suffix: "%", name: "Muvaffaqiyat", note: "maqsadiga erishganlar" },
      { target: 10, suffix: "+", name: "Ustozlar", note: "tajribali mutaxassislar" },
      { target: 6, suffix: "+", name: "Yillik tajriba", note: "sifatli ta'lim" },
    ],
  },
  how: {
    eyebrow: "Qanday ishlaydi",
    titlePre: "To'rt qadam —",
    titleAccent: "yangi bilim",
    subtitle:
      "Ro'yxatdan o'tishdan birinchi darsgacha jarayon oddiy va tushunarli.",
    steps: [
      {
        name: "Ro'yxatdan o'ting",
        text: "Saytdagi shaklni bir daqiqada to'ldiring — ism, telefon raqam va qiziqqan faningizni tanlang.",
      },
      {
        name: "Bepul sinov darsi",
        text: "Menejerlarimiz bir kuni ichida siz bilan bog'lanadi va qulay vaqtda bepul sinov darsini belgilaydi.",
      },
      {
        name: "Darajangizni toping",
        text: "Sinov darsida bilimingizni tekshiramiz va aynan sizga mos guruh hamda dasturni tanlab beramiz.",
      },
      {
        name: "O'qishni boshlang",
        text: "Darslarga qo'shiling va haftalik testlar hamda monitoring orqali natijangizni kuzatib boring.",
      },
    ],
    cta: "Birinchi qadamni tashlang",
  },
  support: {
    eyebrow: "Qo'llab-quvvatlash",
    titlePre: "Savolingiz bormi?",
    titleAccent: "Javob beramiz",
    subtitlePre: "Kurslar, guruhlar yoki to'lovlar haqida savolingiz bo'lsa — raqamingizni qoldiring. Menejerlarimiz",
    subtitleBold: "bir kuni ichida",
    subtitlePost: "siz bilan bog'lanadi.",
    perk1: "Bepul konsultatsiya",
    perk1Text: "— qaysi kurs sizga mosligini birga tanlaymiz.",
    perk2: "Sinov darsi",
    perk2Text: "— o'qishni boshlashdan oldin darsga bepul qatnashib ko'rasiz.",
    formTitle: "Murojaat qoldiring",
    formSubtitle: "Shaklni to'ldiring — qolganini biz bajaramiz.",
    nameLabel: "Ismingiz",
    namePlaceholder: "Masalan: Aziza",
    phoneLabel: "Telefon raqam",
    phonePlaceholder: "+998 __ ___ __ __",
    messageLabel: "Xabar",
    messageOptional: "(ixtiyoriy)",
    messagePlaceholder: "Qaysi kurs sizni qiziqtiryapti? Savolingizni yozing…",
    submit: "Yuborish",
    submitting: "Yuborilmoqda…",
    privacy:
      "Ma'lumotlaringiz faqat siz bilan bog'lanish uchun ishlatiladi va uchinchi shaxslarga berilmaydi.",
    successTitle: "Xabaringiz qabul qilindi!",
    successText: "Menejerlarimiz tez orada {phone} raqamiga qo'ng'iroq qiladi.",
    again: "Yana yuborish",
  },
  register: {
    back: "Bosh sahifa",
    titlePre: "Ro'yxatdan o'tish —",
    titleAccent: "1 daqiqadan kam",
    subtitle:
      "Shaklni to'ldiring — menejerlarimiz siz bilan bog'lanib, bepul sinov darsiga yozib qo'yadi. Ro'yxatdan o'tish bepul va majburiy emas.",
    perk1: "Bepul sinov darsi",
    perk1Text: "O'qishni boshlashdan oldin darsga qatnashib, hamma narsani o'z ko'zingiz bilan ko'rasiz.",
    perk2: "O'zingizga mos guruh",
    perk2Text: "Darajangizga qarab guruh tanlanadi — haddan tashqari oddiy ham, qiyin ham bo'lmaydi.",
    perk3: "Tez javob",
    perk3Text: "Murojaatlarga bir kuni ichida qaytamiz — odatda ancha tezroq.",
    formTitle: "Ma'lumotlaringizni qoldiring",
    formSubtitle: "Barcha maydonlar shaxsiy ma'lumotlar himoyasida saqlanadi.",
    nameLabel: "Ism",
    namePlaceholder: "Aziza",
    surnameLabel: "Familiya",
    surnamePlaceholder: "Rahimova",
    phoneLabel: "Telefon raqam",
    phonePlaceholder: "+998 __ ___ __ __",
    phoneInvalid: "Raqamni to'liq kiriting: +998 90 123 45 67",
    coursesTitle: "Qaysi kursga yozilmoqchisiz?",
    courses: ["Ingliz tili — IELTS", "Rus tili", "Arab tili", "Matematika"],
    awarenessTitle: "Bizni qayerdan bilib oldingiz?",
    awareness: ["Instagram", "Telegram", "Do'stlarimdan", "Reklamadan", "Boshqa"],
    studiedTitle: "Oldin o'qiganmisiz?",
    studied: ["Yo'q, birinchi marta", "Ha, boshqa markazda", `Ha, ${BRAND_NAME}'da`],
    submit: "Ro'yxatdan o'tish",
    submitting: "Yuborilmoqda…",
    privacy: "Ma'lumotlaringiz faqat siz bilan bog'lanish uchun ishlatiladi.",
    successTitle: "Tabriklaymiz!",
    successText:
      "Arizangiz qabul qilindi. Menejerlarimiz tez orada {phone} raqamiga qo'ng'iroq qilib, sinov darsini belgilaydi.",
    backHome: "Bosh sahifaga qaytish",
    errorFields:
      "Iltimos, barcha maydonlarni to'ldiring va kamida bitta kursni tanlang.",
  },
  errors: {
    shortName: "Iltimos, ismingizni to'liq kiriting.",
    phone: "Telefon raqamni to'liq kiriting: +998 __ ___ __ __",
    network:
      "Serverga ulanib bo'lmadi. Internetni tekshirib, qayta urinib ko'ring.",
    generic: "Xatolik yuz berdi. Qayta urinib ko'ring.",
  },
  footer: {
    about:
      `${BRAND_NAME_FULL} — zamonaviy o'quv markazi. Ingliz (IELTS), Rus va Arab tillari hamda Matematika kurslari. Maqsadingizga yo'l ochib beramiz.`,
    pages: "Sahifalar",
    pageHome: "Bosh sahifa",
    pageHow: "Qanday ishlaydi",
    pageSuccess: "Natijalarimiz",
    pageSupport: "Qo'llab-quvvatlash",
    pageRegister: "Ro'yxatdan o'tish",
    coursesTitle: "Kurslar",
    courses: ["Ingliz tili — IELTS", "Rus tili", "Arab tili", "Matematika"],
    up: "Yuqoriga",
    rights: "Barcha huquqlar himoyalangan.",
    slogan: "Sifatli ta'lim — har bir o'quvchiga.",
  },
  lang: { label: "Til" },
};

const ru: Messages = {
  nav: {
    home: "Главная",
    how: "Как это работает",
    success: "Наши результаты",
    register: "Записаться",
  },
  hero: {
    badge: "6+ лет опыта",
    titlePre: "Будущее",
    titleAccent: "строим",
    titlePost: "уже сегодня",
    subtitle:
      `${BRAND_NAME_FULL} — курсы английского (IELTS), русского, арабского языков и математики. Опытные преподаватели, современная методика и индивидуальный подход к каждому ученику.`,
    cta: "Записаться сейчас",
    secondary: "Как это работает",
    stats: [
      { value: "1 500+", label: "выпускников" },
      { value: "70%", label: "высокие результаты" },
      { value: "10+", label: "опытных преподавателей" },
    ],
    quote:
      "«После того как я начала заниматься здесь, я получила 7,5 баллов на экзамене IELTS. Преподаватели уделяют внимание каждому из нас.»",
    author: "Малика — выпускница IELTS",
  },
  success: {
    eyebrow: "Наши результаты",
    title: "Цифры говорят сами за себя",
    subtitle:
      "За каждой цифрой стоит ученик, который стал на шаг ближе к своей цели.",
    items: [
      { target: 1500, suffix: "+", name: "Учеников", note: "обучались в нашем центре" },
      { target: 70, suffix: "%", name: "Успешность", note: "достигли своей цели" },
      { target: 10, suffix: "+", name: "Преподавателей", note: "опытные специалисты" },
      { target: 6, suffix: "+", name: "Лет опыта", note: "качественное образование" },
    ],
  },
  how: {
    eyebrow: "Как это работает",
    titlePre: "Четыре шага —",
    titleAccent: "новые знания",
    subtitle:
      "От регистрации до первого занятия — просто и понятно.",
    steps: [
      {
        name: "Зарегистрируйтесь",
        text: "Заполните форму на сайте за одну минуту: имя, номер телефона и интересующий предмет.",
      },
      {
        name: "Бесплатный пробный урок",
        text: "Наши менеджеры свяжутся с вами в течение дня и запишут на бесплатный пробный урок в удобное время.",
      },
      {
        name: "Найдите свой уровень",
        text: "На пробном уроке мы определим ваш уровень и подберём группу и программу именно для вас.",
      },
      {
        name: "Начните учиться",
        text: "Присоединяйтесь к занятиям и следите за своими результатами через еженедельные тесты и мониторинг.",
      },
    ],
    cta: "Сделайте первый шаг",
  },
  support: {
    eyebrow: "Поддержка",
    titlePre: "Есть вопрос?",
    titleAccent: "Ответим",
    subtitlePre: "Вопросы о курсах, группах или оплате — оставьте свой номер, и наши менеджеры",
    subtitleBold: "в течение дня",
    subtitlePost: "свяжутся с вами.",
    perk1: "Бесплатная консультация",
    perk1Text: "— вместе выберем курс, который вам подходит.",
    perk2: "Пробный урок",
    perk2Text: "— посетите занятие бесплатно, прежде чем начать обучение.",
    formTitle: "Оставьте заявку",
    formSubtitle: "Заполните форму — остальное мы сделаем сами.",
    nameLabel: "Ваше имя",
    namePlaceholder: "Например: Азиза",
    phoneLabel: "Номер телефона",
    phonePlaceholder: "+998 __ ___ __ __",
    messageLabel: "Сообщение",
    messageOptional: "(необязательно)",
    messagePlaceholder: "Какой курс вас интересует? Напишите ваш вопрос…",
    submit: "Отправить",
    submitting: "Отправляется…",
    privacy:
      "Ваши данные используются только для связи с вами и не передаются третьим лицам.",
    successTitle: "Ваше сообщение принято!",
    successText: "Наши менеджеры скоро позвонят на номер {phone}.",
    again: "Отправить ещё раз",
  },
  register: {
    back: "На главную",
    titlePre: "Запись —",
    titleAccent: "меньше минуты",
    subtitle:
      "Заполните форму — наши менеджеры свяжутся с вами и запишут на бесплатный пробный урок. Регистрация бесплатная и ни к чему не обязывает.",
    perk1: "Бесплатный пробный урок",
    perk1Text: "Посетите занятие и всё увидите своими глазами, прежде чем начать обучение.",
    perk2: "Группа под ваш уровень",
    perk2Text: "Группу подбирают по уровню: не слишком просто и не слишком сложно.",
    perk3: "Быстрый ответ",
    perk3Text: "Отвечаем в течение дня — обычно гораздо быстрее.",
    formTitle: "Оставьте свои данные",
    formSubtitle: "Все данные защищены в соответствии с политикой конфиденциальности.",
    nameLabel: "Имя",
    namePlaceholder: "Азиза",
    surnameLabel: "Фамилия",
    surnamePlaceholder: "Рахимова",
    phoneLabel: "Номер телефона",
    phonePlaceholder: "+998 __ ___ __ __",
    phoneInvalid: "Введите номер полностью: +998 90 123 45 67",
    coursesTitle: "На какой курс хотите записаться?",
    courses: ["Английский — IELTS", "Русский язык", "Арабский язык", "Математика"],
    awarenessTitle: "Откуда вы узнали о нас?",
    awareness: ["Instagram", "Telegram", "От друзей", "Из рекламы", "Другое"],
    studiedTitle: "Вы уже где-то учились?",
    studied: ["Нет, впервые", "Да, в другом центре", `Да, в ${BRAND_NAME}`],
    submit: "Записаться",
    submitting: "Отправляется…",
    privacy: "Ваши данные используются только для связи с вами.",
    successTitle: "Поздравляем!",
    successText:
      "Заявка принята. Наши менеджеры скоро позвонят на номер {phone} и назначат пробный урок.",
    backHome: "Вернуться на главную",
    errorFields: "Пожалуйста, заполните все поля и выберите хотя бы один курс.",
  },
  errors: {
    shortName: "Пожалуйста, введите имя полностью.",
    phone: "Введите номер телефона полностью: +998 __ ___ __ __",
    network:
      "Не удалось подключиться к серверу. Проверьте интернет и попробуйте снова.",
    generic: "Произошла ошибка. Попробуйте ещё раз.",
  },
  footer: {
    about:
      `${BRAND_NAME_FULL} — современный учебный центр. Курсы английского (IELTS), русского и арабского языков, а также математики. Помогаем вам идти к своей цели.`,
    pages: "Страницы",
    pageHome: "Главная",
    pageHow: "Как это работает",
    pageSuccess: "Наши результаты",
    pageSupport: "Поддержка",
    pageRegister: "Записаться",
    coursesTitle: "Курсы",
    courses: ["Английский — IELTS", "Русский язык", "Арабский язык", "Математика"],
    up: "Наверх",
    rights: "Все права защищены.",
    slogan: "Качественное образование — каждому ученику.",
  },
  lang: { label: "Язык" },
};

const en: Messages = {
  nav: {
    home: "Home",
    how: "How it works",
    success: "Our results",
    register: "Sign up",
  },
  hero: {
    badge: "6+ years of experience",
    titlePre: "We build the future",
    titleAccent: "starting",
    titlePost: "today",
    subtitle:
      `${BRAND_NAME_FULL} — English (IELTS), Russian, Arabic and Mathematics courses. Experienced teachers, modern methods and an individual approach to every student.`,
    cta: "Enroll now",
    secondary: "How it works",
    stats: [
      { value: "1,500+", label: "graduates" },
      { value: "70%", label: "success rate" },
      { value: "10+", label: "experienced teachers" },
    ],
    quote:
      "“Since I started studying here, I scored 7.5 on my IELTS exam. The teachers give personal attention to every one of us.”",
    author: "Malika — IELTS graduate",
  },
  success: {
    eyebrow: "Our results",
    title: "Numbers speak for themselves",
    subtitle:
      "Behind every number is a student who came one step closer to their goal.",
    items: [
      { target: 1500, suffix: "+", name: "Students", note: "have studied at our center" },
      { target: 70, suffix: "%", name: "Success rate", note: "achieved their goal" },
      { target: 10, suffix: "+", name: "Teachers", note: "experienced specialists" },
      { target: 6, suffix: "+", name: "Years of experience", note: "quality education" },
    ],
  },
  how: {
    eyebrow: "How it works",
    titlePre: "Four steps to",
    titleAccent: "new knowledge",
    subtitle: "From sign-up to your first lesson — simple and clear.",
    steps: [
      {
        name: "Sign up",
        text: "Fill in the form in one minute — your name, phone number and the subject you are interested in.",
      },
      {
        name: "Free trial lesson",
        text: "Our managers will contact you within a day and book a free trial lesson at a time that suits you.",
      },
      {
        name: "Find your level",
        text: "At the trial lesson we assess your level and match you with the right group and program.",
      },
      {
        name: "Start learning",
        text: "Join the lessons and track your progress through weekly tests and monitoring.",
      },
    ],
    cta: "Take the first step",
  },
  support: {
    eyebrow: "Support",
    titlePre: "Have a question?",
    titleAccent: "We'll answer",
    subtitlePre: "Questions about courses, groups or payments — leave your number and our managers",
    subtitleBold: "within a day",
    subtitlePost: "will get back to you.",
    perk1: "Free consultation",
    perk1Text: "— together we'll choose the course that suits you.",
    perk2: "Trial lesson",
    perk2Text: "— attend a lesson for free before you start learning.",
    formTitle: "Leave a request",
    formSubtitle: "Fill in the form — we'll take care of the rest.",
    nameLabel: "Your name",
    namePlaceholder: "For example: Aziza",
    phoneLabel: "Phone number",
    phonePlaceholder: "+998 __ ___ __ __",
    messageLabel: "Message",
    messageOptional: "(optional)",
    messagePlaceholder: "Which course interests you? Write your question…",
    submit: "Send",
    submitting: "Sending…",
    privacy:
      "Your details are used only to contact you and are never shared with third parties.",
    successTitle: "Your message has been received!",
    successText: "Our managers will call you at {phone} shortly.",
    again: "Send another",
  },
  register: {
    back: "Back to home",
    titlePre: "Sign up —",
    titleAccent: "under a minute",
    subtitle:
      "Fill in the form — our managers will contact you and book your free trial lesson. Sign-up is free and comes with no obligations.",
    perk1: "Free trial lesson",
    perk1Text: "Attend a lesson and see everything with your own eyes before you start.",
    perk2: "A group for your level",
    perk2Text: "Your group is chosen by level — never too easy, never too hard.",
    perk3: "Fast response",
    perk3Text: "We reply within a day — usually much sooner.",
    formTitle: "Leave your details",
    formSubtitle: "All details are kept safe under our privacy policy.",
    nameLabel: "First name",
    namePlaceholder: "Aziza",
    surnameLabel: "Last name",
    surnamePlaceholder: "Rahimova",
    phoneLabel: "Phone number",
    phonePlaceholder: "+998 __ ___ __ __",
    phoneInvalid: "Enter the full number: +998 90 123 45 67",
    coursesTitle: "Which course would you like to join?",
    courses: ["English — IELTS", "Russian", "Arabic", "Mathematics"],
    awarenessTitle: "How did you hear about us?",
    awareness: ["Instagram", "Telegram", "From friends", "From an ad", "Other"],
    studiedTitle: "Have you studied before?",
    studied: ["No, it's my first time", "Yes, at another center", `Yes, at ${BRAND_NAME}`],
    submit: "Sign up",
    submitting: "Sending…",
    privacy: "Your details are used only to contact you.",
    successTitle: "Congratulations!",
    successText:
      "Your application has been received. Our managers will call you at {phone} shortly to schedule your trial lesson.",
    backHome: "Back to home page",
    errorFields: "Please fill in all the fields and pick at least one course.",
  },
  errors: {
    shortName: "Please enter your full name.",
    phone: "Please enter the full phone number: +998 __ ___ __ __",
    network: "Could not reach the server. Check your connection and try again.",
    generic: "Something went wrong. Please try again.",
  },
  footer: {
    about:
      `${BRAND_NAME_FULL} is a modern learning center offering English (IELTS), Russian, Arabic and Mathematics courses. We help you move toward your goal.`,
    pages: "Pages",
    pageHome: "Home",
    pageHow: "How it works",
    pageSuccess: "Our results",
    pageSupport: "Support",
    pageRegister: "Sign up",
    coursesTitle: "Courses",
    courses: ["English — IELTS", "Russian", "Arabic", "Mathematics"],
    up: "Back to top",
    rights: "All rights reserved.",
    slogan: "Quality education for every student.",
  },
  lang: { label: "Language" },
};

const messages: Record<Locale, Messages> = { uz, ru, en };

export const locales: { code: Locale; label: string }[] = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

export function useI18n() {
  const t = computed(() => messages[locale.value]);

  function setLocale(next: Locale) {
    if (next === locale.value) return;
    locale.value = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = next;

      // Butun sahifa fade animatsiya bilan yangi tilda "yonib" chiqadi
      const app = document.getElementById("app");
      if (app && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        app.classList.remove("lang-switching");
        // Reflow: animatsiyani qaytadan ishga tushirish uchun zarur
        void app.offsetWidth;
        app.classList.add("lang-switching");
        window.setTimeout(() => app.classList.remove("lang-switching"), 450);
      }
    }
  }

  if (typeof document !== "undefined") {
    document.documentElement.lang = locale.value;
  }

  return { locale, t, setLocale };
}

/** Reklama manbasi va "oldin o'qigan" javoblari CRM'ga uzunlik bilan yuboriladi. */
export const awarenessKeys = [
  "instagram",
  "telegram",
  "friends",
  "ads",
  "other",
] as const;

export const studiedKeys = ["no", "other_center", "excellence"] as const;
