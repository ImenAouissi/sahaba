// src/lib/sahaba-data.ts
// ─── ملف إعادة تصدير — لا تعدّل هذا الملف مباشرة ───
// البيانات موزّعة على ملفات منفصلة:
//   • sahaba.data.ts  ← بيانات الصحابة
//   • stories.data.ts ← القصص
//   • quiz.data.ts    ← الاختبار
//
// هذا الملف يبقى لضمان عمل جميع الـ imports الحالية دون تغيير.

export type { Sahabi } from "./sahaba.data";
export { SAHABA, FEATURED_SAHABA } from "./sahaba.data";

export type { Story } from "./stories.data";
export { STORIES } from "./stories.data";

export type { QuizQ } from "./quiz.data";
export { QUIZ } from "./quiz.data";