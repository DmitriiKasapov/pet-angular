# Выполненные шаги

- 2026-04-01 — Шаг 6 (финал). Полировка UI — адаптивность + пустые состояния
  - `layout.css`: header-inner расширен до 1200px (совпадает с доской), мобильный паддинг, логотип без текста < 640px
  - `analytics.css`: мобильная адаптация — уменьшены паддинги, таблица задач скрывает колонки Project/Status
  - `weekly-board-page.html`: доска обёрнута в `overflow-x: auto` с `min-width: 600px` для мобильного скролла
  - `weekly-board-page.ts`: добавлен `isCurrentWeek` computed + `goToCurrentWeek()`, кнопка Today в хедере доски
  - `base.css`: responsive паддинги для страниц на мобиле (< 640px)
  - `worklog-list.html`: пустое состояние улучшено — заголовок + подсказка в рамке
  - `comments-section.html`: пустое состояние улучшено — заголовок + подсказка в рамке
  - `app.routes.ts`: дефолтный маршрут изменён на /board
  - `app-header.html`: Week перемещён первым в навигации
  - Статус: done


- 2026-04-01 — Шаг 8. Analytics Page — /analytics
  - `analytics.service.ts`: `getWeekAnalytics()` — возвращает totalHours, entryCount, days[7], projects[], tasks[]
  - `analytics-page.ts / .html`: навигация по неделям через signals, computed analytics/weekLabel/isCurrentWeek
  - `blocks/week-summary`: общий итог (часы + записи)
  - `blocks/days-summary`: 7 дней с progress-bar (CSS-полоски)
  - `blocks/projects-summary`: проекты — название + часы сверху, цветная полоска снизу, сортировка по убыванию
  - `blocks/tasks-summary`: таблица задач (код, название, проект, статус, часы), сортировка по убыванию
  - `styles/components/analytics.css`: полные стили страницы
  - `app.routes.ts`: маршрут /analytics (lazy)
  - `app-header.html`: ссылка Analytics в навигацию
  - Правки UI: полоска проекта перенесена под строку названия/часов
  - Глобальные стили переведены с .scss на .css (Tailwind v4 совместимость), удалены .scss партиалы
  - `worklog-block` вынесен в отдельный компонент `pages/weekly-board-page/modules/worklog-block/`
  - Статус: done
  - `app.routes.ts`: маршрут /analytics (lazy)
  - `app-header.html`: ссылка Analytics в навигацию
  - Статус: done


- 2026-04-01 — Шаг 7. Weekly Board Page — реализована полноценная страница еженедельного тайм-грида
  - `worklog.service.ts`: добавлены методы `getByWeek`, `update`, `delete`
  - `src/app/core/utils/board-utils.ts`: новый утилитарный модуль (snapToGrid, clampHours, getWeekStart, addDays, formatDate, getDayIndex, константы HOUR_HEIGHT/SNAP_HOURS/MIN_DURATION)
  - `weekly-board-page.ts` / `.html`: полностью переписан — навигация по неделям, signals, computed weekDays/weekLabel, CRUD-обработчики
  - `blocks/board-grid/board-grid.ts` / `.html`: компонент сетки с drag-to-move и resize-to-duration, HostListener mousemove/mouseup, ViewChildren для определения колонки по X
  - `modules/board-worklog-form/board-worklog-form.ts` / `.html`: ReactiveForm-модалка для логирования работы (taskId, date, startHour, durationHours, comment)
  - `src/styles/components/board.scss`: полные стили грида (ruler, columns, worklog-block, drag-float, resize-handle, drag-preview)
  - `src/styles.scss`: импорт board.scss
  - Билд: успешен, ошибок нет — done

- 2026-04-01 — Шаг 6 (частично). Полировка UI — header, footer, search-zone
  - AppHeaderComponent (shared element) — sticky header, лого DevLog + SVG, навигация Projects / Week, active-link подсветка через routerLinkActive
  - AppFooterComponent (shared element) — тонкий footer, copyright, Dmitry Kasapov
  - app.html / app.ts обновлены: layout flex-column, header + main + footer
  - base.scss: body/app-root/app-main — flex column, min-h-100vh
  - layout.scss: стили .header-inner, .header-logo, .nav-link, .footer-inner, .search-zone
  - styles.scss: импорт layout.scss
  - search-zone (border-top + border-bottom) применён в project-list.html и task-list.html
  - /board маршрут добавлен (заглушка WeeklyBoardPageComponent)
  - Сборка чистая
  - Статус: частично done (остаётся адаптивность и проверка пустых состояний)

- 2026-04-01 — Шаг 5. Страница задачи — /tasks/:id
  - TaskDetailPageComponent — сигналы, computed totalHours
  - TaskHeaderComponent (block) — код, название, статус badge, описание, estimate, дата создания, смена статуса через select
  - WorklogListComponent (block) — список worklog-записей с форматом времени, суммарные часы
  - CommentsSectionComponent (block) — список комментариев задачи
  - WorklogFormComponent (module) — форма добавления worklog (дата, startHour, durationHours, comment), ReactiveFormsModule, inject(FormBuilder)
  - CommentFormComponent (module) — форма добавления комментария, textarea + Post
  - tasks.service.ts — добавлен метод updateStatus()
  - worklog.service.ts — добавлен метод create()
  - comments.service.ts — новый сервис (getByTask, create)
  - app.routes.ts — добавлен маршрут /tasks/:id (lazy)
  - Обработка 404: "Task not found" + ссылка назад
  - Сборка чистая
  - Статус: done

- 2026-04-01 — Шаг 4. Страница проекта — /projects/:id
  - ProjectDetailPageComponent — сигналы, computed summaries, табы tasks/analytics
  - ProjectHeaderComponent (block) — название, код, цвет, описание, кол-во задач, общие часы
  - TaskListComponent (block) — поиск, список TaskCardComponent, пустые состояния
  - TaskCardComponent (module) — код, название, статус badge, часы / estimate, ссылка на /tasks/:id
  - TaskFormComponent (module) — модальное окно, Reactive Forms, авто-генерация кода задачи
  - ProjectAnalyticsComponent (block) — суммарные часы, список задач с прогресс-барами, сортировка по часам
  - tasks.service.ts — добавлен метод create() с авто-генерацией кода (PROJECT-001, 002...)
  - Обработка 404: "Project not found" + кнопка назад
  - Сборка чистая
  - Статус: done

- 2026-04-01 — Настройка Tailwind CSS v4 + Angular 21
  - Переход styles.css → styles.scss, обновлён angular.json
  - postcss.config.json (Angular читает только JSON-формат)
  - @source "./src/app/**/*.{html,ts}" для сканирования шаблонов
  - Исправлен cards.scss (@apply card убран, стили продублированы)
  - Статус: done

- 2026-04-01 — Правки UI по итогам тестирования
  - Список проектов: карточки → простые строки (код + название + описание)
  - Название проекта выделено жирным
  - На странице проекта: поиск + кнопка отделены бордером от списка задач
  - Статус: done

- 2026-04-01 — Шаг 3. Каталог проектов — страница /projects
  - projects.service.ts, tasks.service.ts, worklog.service.ts (базовый read) в core/services/
  - ProjectsPageComponent с signal-based состоянием (query, showForm, summaries computed)
  - ProjectListComponent (block/section) — поиск + список карточек + пустые состояния
  - ProjectCardComponent (module) — карточка с цветным акцентом, кодом, статистикой, ссылкой
  - ProjectFormComponent (module) — модальное окно, Reactive Forms, preset-цвета, валидация кода
  - EmptyStateComponent (shared element) — с content projection для action-кнопки
  - app.routes.ts — /projects (lazy), /projects/:id (заглушка), redirect / → /projects
  - Сборка чистая, lazy chunks работают
  - Статус: done

- 2026-04-01 — Шаг 2. Модели данных и seed
  - Интерфейсы: Project, Task (+ TaskStatus), WorklogEntry, TaskComment в src/app/models/
  - Seed-файлы: 3 проекта, 11 задач, 15 worklog-записей, 5 комментариев в src/app/data/seed/
  - storage.service.ts — универсальная работа с localStorage (getItem/setItem/removeItem/hasItem/clearAllAppData)
  - seed.service.ts — первичная инициализация по флагу worklog-seeded
  - APP_INITIALIZER в app.config.ts подключает SeedService.initialize()
  - Сборка проходит без ошибок
  - Статус: done
  - UPD: seed-задачи переименованы в развёрнутый стиль (полные описательные названия на английском); в CLAUDE.md зафиксировано правило — весь UI только на английском

- 2026-04-01 — Шаг 1. Инициализация проекта и репозиторий
  - Angular 19, standalone, без SSR, с routing
  - Tailwind CSS v4 (@tailwindcss/vite), Angular CDK
  - Структура папок: components/blocks/modules/elements, pages/*/blocks/modules, core/services, data/seed, models
  - CSS-архитектура: src/styles/base/theme|base|typography, src/styles/components/buttons|inputs|badges|cards
  - Дизайн-токены в @theme {}: цвета, статусы, тени, радиусы, спейсинг
  - Git инициализирован, репо: DmitriiKasapov/pet-angular
  - Статус: done
