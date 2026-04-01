# Выполненные шаги

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
