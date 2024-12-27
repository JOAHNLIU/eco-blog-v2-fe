# eco-blog

## Основні посилання
* https://github.com/JOAHNLIU/eco-blog-v2-be
* https://github.com/JOAHNLIU/eco-blog-v2-fe
* https://github.com/JOAHNLIU/eco-blog-v2-auth
* https://eco-blog-edu.org.ua/

**Коментар:**
Проект було виконано по патерну "Оптімістік ЮАЙ", коли кліент додає пости чи лайки, сподіваючись що сервер все в базі оновив правильно (виходячи зі статусу записів)

Систему було розгорнуто за підходом Infractructure as Code. За допомогою CI/CD процесу на гітхаб екшенсах, а також за допомогою GCP стеку, Google Application Engine + Google Cloud SQL (PostgreSQL)

## Опис
Eco-Blog - це платформа, де користувачі можуть розміщувати пости на екологічні теми та обговорювати їх. Блог спрямований на підвищення обізнаності про екологічні проблеми та сприяння екологічному способу життя.

## Ідея
Основна мета цього блогу - створити простір для обговорення екологічних питань. Користувачі зможуть:
- Ділитися своїми думками, ідеями та досвідом.
- Обговорювати різні екологічні теми.
- Навчатися новим методам збереження навколишнього середовища.

## Функціональність
- Реєстрація/авторизація користувачів.
- Створення та редагування постів.
- Коментування та обговорення постів інших користувачів, лайки постів.
- Функція пошуку постів за ключовими словами.

## Lab 2

1. Створення пакетів
- Створено ізольовану бібліотеку `eco-blog-v2-auth` для автентифікації на базі Firebase та підключення middleware.
- Cтворено репозиторії для бекенду і фронтенду `eco-blog-v2-be` & `eco-blog-v2-fe`
- Організовано код серверу для головного застосунку, включно з чітким розділенням відповідальностей між збереженням даних (storage), роутами та middleware.
- Встановлено необхідні залежності:
  - Основні: `firebase-admin`, `sequelize`.
  - Dev-залежності: `jest`, `eslint`.

2. Вибір стилю коду
- Прийнято єдиний стиль коду для всіх файлів, орієнтований на індустріальні стандарти.
- Налаштовано `Prettier` для автоматичного форматування та `ESLint` для перевірки відповідності коду вибраному стилю.

3. Налаштування форматтера
- Конфігуровано `Prettier` для автоматичного форматування коду за попередньо визначеними правилами.
- Додано файл конфігурації `.prettierrc` для кастомізації правил форматування.

4. Налаштування лінтера або статичного аналізатора
- Налаштовано `ESLint` з жорсткими правилами для виявлення помилок і дотримання найкращих практик.
- Створено файл `.eslint.config.js` для налаштування власних правил перевірки.

5. Налаштування Git-хуків
- Впроваджено Git-хуки за допомогою `Husky` для автоматизації перевірок якості коду перед кожним комітом і пушем.
- Хуки виконують:
  - Перевірку форматування за допомогою `Prettier`.
  - Перевірку лінтингу за допомогою `ESLint`.
  - Запуск тестів
- Забезпечено недопущення неякісного коду до репозиторію.


## Lab3
### Основні компоненти
1. **Frontend**:
   - Компоненти на React (UI-елементи, форми, списки постів і коментарів).
   - Взаємодія з бекендом через REST API.
   - Аутентифікація через Firebase.
   - Стан керується через Zustand.

2. **Backend**:
   - Реалізовано на Node.js + Express.
   - Підключення до бази даних через Sequelize ORM.
   - Використання бібліотеки `eco-blog-v2-auth` для валідації токенів Firebase та створення користувачів.
   - API-ендпоїнти для управління постами, лайками та коментарями.

3. **Database**:
   - PostgreSQL:
     - Таблиці `Users`, `Posts`, `Comments`, `Likes`, `CommentLikes`.
   - Взаємодія через ORM (Sequelize).

4. **Auth Module**:
   - Винесена бібліотека для ініціалізації Firebase та middleware для валідації токенів.

### Ключові сценарії
1. Створення посту
* Frontend: Надсилає запит POST /api/posts з токеном.
* Backend:Валідує токен.
* Перевіряє існування користувача (або створює нового).
* * Додає пост у таблицю Posts зі зв'язком з Users.
* Database: Запис додається у Posts.

2. Додавання лайка до посту
* Frontend: Надсилає запит POST /api/posts/:id/like.
* Backend:
* * Валідує токен.
* * Перевіряє, чи існує лайк.
* * Якщо є — видаляє його.
* * Якщо немає — додає новий.
* * Оновлює likesCount для посту.
* Database:
* * Таблиця Likes: Додається або видаляється запис.
* * Таблиця Posts: Оновлюється likesCount.

3. Додавання коментаря до посту
* Frontend: Надсилає запит POST /api/posts/:id/comments.
* Backend:
* * Валідує токен.
* * Додає коментар у таблицю Comments.
* * Оновлює commentsCount у пості.
* Database:
* * Таблиця Comments: Додається новий запис.
* * Таблиця Posts: Оновлюється commentsCount.

4. Агрегація даних (запит постів із лайками та коментарями)
* Frontend: Надсилає запит GET /api/posts.
* Backend:
* * Витягує всі пости з таблиці Posts.
* * Приєднує дані з таблиць Likes і Comments (через Sequelize).
* * Форматує дані для клієнта.
* Database:
* Таблиця Posts: Витягуються всі записи.
* Таблиці Likes, Comments: Вибираються відповідні записи для кожного посту.

### Схема бази даних
![bd-schema.jpg](readme_static%2Fbd-schema.jpg)

## Lab 4
Було створено версію фронтенду без підключення до беку і бази
https://github.com/JOAHNLIU/eco-blog-v2-fe/tree/lab-4
Також створено версію бекенду с замоканими даними
https://github.com/JOAHNLIU/eco-blog-v2-be/tree/7b27123cc5274df7d8eea52af71d1dea132c015b

## Lab 5
Виконання можна побачити у фінальній версії репозиторіїв


## Lab 6 
Тестування було імплементовано на базі JEST
Тести виконуються як інтеграційні
Було замокано авторизацію, і підкидається тестова база ( кожен раз дропаються дані і перенакатуються міграції)

![coverage.jpg](readme_static%2Fcoverage.jpg)

## Lab 7
P.S. Це наш особистий ад і наше страждання, на яке пішло більше всього часу

Перш за все було додано гітлаб екшени і описані в кожному з проектів
Рулсети є обовʼязковими. Підхід до розгортання наступний:
* При створенні мерж реквестів -- запускаємо [pr-checks.yml](.github%2Fworkflows%2Fpr-checks.yml)
* При мержі в майстер бранчу (прямий коміт заборонений рулсетом) відбувається лінтінг, тести і саме деплой [deploy.yml](.github%2Fworkflows%2Fdeploy.yml)
![actions-1.jpg](readme_static%2Factions-1.jpg)
![actions-2.jpg](readme_static%2Factions-2.jpg)

База була створена у GCP, а міграції є одним зі степів деплойменту


В кожному проекті описані app.yaml (backend.yaml, frontend.yaml)
А також у проекті eco-blog-v2-fe є файл з дістрібюцією трафіка, щоб /* ходило на фронт, проте /api/ ходило на бек сервіс

Сервіс доступний за посиланням https://eco-blog-edu.org.ua/

## Lab 8
Цю лабороторну ми до кінця не виконали, через нестачу часу, проте провели базові тестування перфомансу за допомогою інструменту лайтхаусу і інструменту гугла
![8-1.jpg](readme_static%2F8-1.jpg)
![8-2.jpg](readme_static%2F8-2.jpg)
![8-3.jpg](readme_static%2F8-3.jpg)

На третьому скріншоті було визначено основні проблеми що потрібно виправити у майбутньому

Це стосується стилізації а також мініфікації файлів

## Lab 9
Було визначено авторизацію і роботу з сесією як фунціонал що потребує винесення в бібліотеку
https://github.com/JOAHNLIU/eco-blog-v2-auth

Він був винесений і переписаний на TypeScript.

Він був інтегрований до https://github.com/JOAHNLIU/eco-blog-v2-be
шляхом встановленя його як залежності напряму з гітхабу

В бібліотеку передається метод зі стореджу для створення чи апдейту користувача

## Автори
Любченко І.М ІА-24
Шкарніков Д.О ІА-23
