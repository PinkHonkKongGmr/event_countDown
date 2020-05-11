<h1>Учебный проект.</h1>
<a href='https://pinkhonkkonggmr.github.io/eventcountdown/index.html'>В действии</a>

<p></p>
В основе архитектуры проекта лежит паттерн MVC и парадигма ООП. Проект состоит из множества независимых модулей.<br> Каждый модуль несет свою определенную функцию, выполняет определенное поведение или хранит определенный "тип" (в контексте пренадлежности к разным категориям) данных<br>
Также применены некоторые приемы декларативного подхода, для создания более лаконичного кода.
<br>
Помимо MVC ,были использованы паттерны Наблюдатель, Декоратор, абстрактная фабрика(упрощенная форма =)).
<p></p>
<strong>Бизнес- задача приложения:</strong> создание счетчика в месяцах, днях, минутах и секундах до достижения определенного установленного пользователем
события. Далее в тексте - Событие.
<br>
<srtong>Логика:</strong> Пользователь создает Событие. Обязательно дает ему название. Вводит дату и по желанию время.
<br>Так он создает Cобытие. Далее он видит счетчик отсчета времени. Видит название Cобытия и дату. Если вводил время то и время.
<br> Получает оповещения если до События осталось меньше месяца, дня, часа, минуты или оно завершилось. Один раз после каждой перезагрузки страницы.
<br>У пользователя есть возможность создавать неограниченное количество Событий и удалять их.
<p></p>
<h2>Ниже идет описание модулей</h2>
1. Модуль domlib.<br>
View. Методы данного модуля отвечают за отрисовку необходимых DOM- элементов.<br>
Методы могут содержать вспомогательные инструменты для управления рендером. Например интервалы или методы вспомогательных классов.
<br>
В модуле открыт доступ к классам откуда нужно брать данные для начального рендера.
К интервалу привязаны некоторые дополнительные функции, объект eventComing, который отслеживает состояние объекта События.
<p></p>
2. Модуль eventblock. <br>
Controller. Отвечает за сбор, изменение данных и инкапсуляцию для передачи в domlib и рендера. Отвечает за изменение состояний объектов.
<br> Можно сказать является вольной интерпретацией абстрактной фабрики. Так как предоставляет общий интерфейс для создания семейства объектов.
<br>
Возвращает инкапсулированый объект, который является единицей условного объекта Событие. 
<br> Имеет графический интерфейс, реализованый через domlib для отслеживания состояния События в реальном времени.(таймер согласно тз:месяц,день, час, минута)
<br> Предоставляет интерфейс для удаления. Вместе с этим очиститься интервал, удалены все события и удален из dom- дерева и localstorage.
<p></p>
3. Модуль helpers. Содержит вспомогательные методы.
<br>
arrayCreator - создает массив с числами. Используется для корректного отображения числа дней в месяцах.
<br>Объект year предоставляет геттер leap.Благодаря нему можно отслеживать високосные года и выставлять правильно число дней в феврале.
<br>
Два метода для работы с localstorage (на самом деле это может быть и sessionstorage). Добавить в хранилище и удалить из него.
<br> Согласно тз реализована возможность хранения состояния. События сохраняются после перезагрузки страницы и тд. За сохранение данных
отвечает также eventblock.
<p></p>
4. Модуль fromLocalStorage. Является ленивым братом eventblock-а. Также возвращает условное событие с графическим представлением, возможностью удаления и отчистки всех данных.
<br> Однако он не занимается сбором и управлением данными. Он просто получает данные и передает в domlib. 
<br> В данном случае получает из локального хранилища. Но он при этом ничего не занет об источнике и не специфичен. Данные получает опосредовано и не важно откуда они получены. Из локалстораджа, или к примеру загружены с сервера.
<p></p>
5. Модули time, year, mounths, dateCompiler являются model. Содержат данные и предоставляют инструменты для работы с ними.
<p></p>
6. Модуль resultDB. 
<br> Объект принимает два параметра - defaultTime и mounths. 
<br>Первый используется на тот случай, если пользователь не захочет выставлять время. рекомендуется для этого параметра использовать
геттер time объекта time
<br> Второй используется для валидации значений, получаемых в сеттеры mounth и mounthKey.
<br> Внутри модуля eventblock все сеттеры resultDB принимают занчения из инпутов, что гарантирует надежность. Но тем ни менее, 
<br> так как в конечном итоге все данные проходят через resultDB, реализован дополнительный механизм безопасности. И все значения проходят валидацию внутри сеттеров.
<br>resultDB Является хранилищем данных. Собирает состояния и инкапсулирует в один объект. Объект передается в localstorage. 
<br> Универсален. данные могут предаваться и на сервер.
<p></p>
7. Модуль selectActions. Является вспомогательным. Для создания удобного и кастомизируемого интерфейса для сбора данных.
<p></p>
8. Еще один вспомогательный метод timeFormatter. Из объекта dateCompiler он получает уже обрабатанные данные. 
<br> Пользователь выбрал дату. Она прошла через dateCompiler. На выходе имеем число милисекунд до заданного События.
<br>timeFormatter обабатывает это число и переводит в объект, который переводит в секунды, минуты и тд.
<br>Данные из объекта уже потом красиво отрисовывает domlib.
<br> Модуль timeFormatter помимо отдноименного метода содержит декоратор result. Он проверяет не ввел ли пользователь прошедшую дату.
<p></p>
9. Модуль eventComing. Является обзервером. Он следит за состоянием приближающегося События. Отслеживает осталось ли до События
месяц, день, час, минута или оно вовсе закончено.
<p></p>
10. Модуль listeners. Имеет доступ к хранилищу и блокам с Событиями. Позволяет реагировать на приближение События и окончание.
<br>Содержат массивы, привязанные к определенным брейкпоинтам(остался месяц, день, завершено и тд) 
<br>Позволяет гибко выстраивать систему реагирования. Можно выводить алерты. Можно отрисовавыть модальные окна в корне документа.
<br> Можно выводить что-то в интерфейсе-блоках событий. Или запускать аудиооповещение. Настроить пуш-уведомления. В общем все, что угодно. Но потенциально =)
<br>Запуском управляет eventComing.

