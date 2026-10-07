# CV — Oleksii Kolosov (QA Engineer)

Сучасне інтерактивне резюме на базі **SvelteKit** та **Svelte 5 Runes** з **Linux-подібною decoupled-архітектурою**, де дані (модель/ядро) повністю відокремлені від графічних оболонок (Desktop Environments / Themes).

## 🏛️ Архітектура

- **Kernel Data Layer (`src/lib/core/`):**
  - `types.ts` — суворі TypeScript інтерфейси.
  - `resume-data-uk.ts` / `resume-data-en.ts` — чисті незмінні моделі резюме (досвід, навички, контакти, освіта, допуски).
  - `system-state.svelte.ts` — реактивний контролер стану системи (активна оболонка, мова, пошук, звук).
- **Pluggable Shells (`src/lib/shells/`):**
  - **ATN Dark Reference** — оригінальний графічний темний стиль референсу (A4 single-page fit).
  - **Hyprland QA HUD** — тайлінговий хай-тек інтерфейс стенду випробувань ATN з живою телеметрією кліматичної камери.
  - **Linux Terminal (Arch CLI)** — інтерактивний Zsh-термінал з `neofetch`, командами (`whoami`, `experience`, `skills`, `test-run`).
  - **Executive Paper** — корпоративна світла тема, оптимізована під HR ATS та друк A4.

## 🚀 Запуск проєкту

```sh
# Встановлення залежностей (якщо потрібно)
npm install

# Запуск dev-сервера
npm run dev

# Перевірка типів та компонентів
npm run check

# Збірка продакшн версії
npm run build
```

## 🖨️ Друк та збереження у PDF

Для експорту резюме використовуйте комбінацію `Ctrl + P` або кнопку **«PDF / Друк»** на верхній панелі.
Підтримується точне збереження оригінальних кольорів та фонів (`print-color-adjust: exact`) та стандартизований вигляд формату A4.
