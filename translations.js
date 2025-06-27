
export const translations = {
      ru: {
        keyboard: '⌨️ Клавиатура',
        keyboard_on: 'Клавиатура (вкл)',
        language: '🌐 Язык',
        shadow: '✨ Тень',
        shadow_on: 'Тень (вкл)',
        rules: '📜 Правила',
        match_count: '🔢 Количество спичек',
        view_time: '⏱️ Время созерцания',
        theme: '🎨 Тема',
        night: 'Ночь',
        day: 'День',
        start: 'Начать',
        check: 'Проверить',
        new_game: 'Новая игра',
        settings: 'Настройки',
        settings_on: 'Настройки (вкл)',
        close: 'Закрыть',
        question: 'Сколько спичек?',
        up: 'Вверх',
        down: 'Вниз',
        right: 'Вправо',
        left: 'Влево',
        ok: 'ОК',
        delete: '⌫',
        seconds: 'сек',
        rules_content: `
          <p><strong>Правила игры:</strong></p>
          <p>1. Выбери количество спичек и время созерцания в настройках.</p>
          <p>2. Нажми "Начать".</p>
          <p>3. Запомни направления спичек за отведенное время.</p>
          <p>4. Укажи, сколько головок смотрит вверх, вниз, вправо, влево.</p>
          <p>5. Нажми "Проверить" или кликни по полю для проверки результата.</p>
          <p>6. Нажми "Новая игра" или кликни по полю для новой игры.</p>
          <p><strong>Направления спичек:</strong></p>
          <p>Головка (красный круг) указывает направление по часовой системе:</p>
          <pre>
           0°/360° (Вверх)
                   12
                    ↑
        315°        |        45°
          ↖         |         ↗
      11    ↖       |       ↗    1
              ↖     |     ↗
          10    ↖   |   ↗    2
                  ↖ | ↗
    270° <----- 9 --+-- 3 -----> 90°
 (Влево)            |             (Вправо)
                  ↙ | ↘
           8    ↙   |   ↘    4
              ↙     |     ↘
           7   ↙    |    ↘    5
          ↙         |         ↘
        225°        |        135°
                    ↓
                    6
                180° (Вниз)
</pre>
          <p>- 315°–45°: Вверх (около 12 часов)</p>
          <p>- 45°–135°: Вправо (около 3 часов)</p>
          <p>- 135°–225°: Вниз (около 6 часов)</p>
          <p>- 225°–315°: Влево (около 9 часов)</p>
          <p><strong>Цель:</strong> Развитие контроля внимания, тренировка внутреннего взора.</p>
          <p><strong>Процесс:</strong> Остановить внутренний диалог, бросить быстрый короткий взгляд (сфотографировать).</p>
          <p><strong>Возможные побочные действия:</strong> Через годы тренировок внимание внутреннего взора оживает, становится подобно вниманию сновидения за счёт большого вложения энергии. Это может задействоваться в грёзах и ясновидении.</p>
          <p><strong>Рекомендации:</strong> В день делать много повторов. Если получается удержать картинку на мгновение, сделай минимум 60 повторов. Первый этап — удерживать картинку во внутреннем взоре минуту.</p>
        `
      },
      uk: {
        keyboard: '⌨️ Клавіатура',
        keyboard_on: 'Клавіатура (увімк)',
        language: '🌐 Мова',
        shadow: '✨ Тінь',
        shadow_on: 'Тінь (увімк)',
        rules: '📜 Правила',
        match_count: '🔢 Кількість сірників',
        view_time: '⏱️ Час споглядання',
        theme: '🎨 Тема',
        night: 'Ніч',
        day: 'День',
        start: 'Почати',
        check: 'Перевірити',
        new_game: 'Нова гра',
        settings: 'Налаштування',
        settings_on: 'Налаштування (увімк)',
        close: 'Закрити',
        question: 'Скільки сірників?',
        up: 'Вгору',
        down: 'Вниз',
        right: 'Вправо',
        left: 'Вліво',
        ok: 'ОК',
        delete: '⌫',
        seconds: 'сек',
        rules_content: `
          <p><strong>Правила гри:</strong></p>
          <p>1. Обери кількість сірників і час споглядання в налаштуваннях.</p>
          <p>2. Натисни "Почати".</p>
          <p>3. Запам'ятай напрямки сірників за відведений час.</p>
          <p>4. Вкажи, скільки голівок дивиться вгору, вниз, вправо, вліво.</p>
          <p>5. Натисни "Перевірити" або клацни по полю для перевірки результату.</p>
          <p>6. Натисни "Нова гра" або клацни по полю для нової гри.</p>
          <p><strong>Напрямки сірників:</strong></p>
          <p>Голівка (червоний круг) вказує напрямок за годинниковою системою:</p>
          <pre>
           0°/360° (Вгору)
                   12
                    ↑
        315°        |        45°
          ↖         |         ↗
      11    ↖       |       ↗    1
              ↖     |     ↗
          10    ↖   |   ↗    2
                  ↖ | ↗
    270° <----- 9 --+-- 3 -----> 90°
 (Вліво)            |             (Вправо)
                  ↙ | ↘
           8    ↙   |   ↘    4
              ↙     |     ↘
           7   ↙    |    ↘    5
          ↙         |         ↘
        225°        |        135°
                    ↓
                    6
                180° (Вниз)
</pre>
          <p>- 315°–45°: Вгору (близько 12 години)</p>
          <p>- 45°–135°: Вправо (близько 3 години)</p>
          <p>- 135°–225°: Вниз (близько 6 години)</p>
          <p>- 225°–315°: Вліво (близько 9 години)</p>
          <p><strong>Мета:</strong> Розвиток контролю уваги, тренування внутрішнього зору.</p>
          <p><strong>Процес:</strong> Зупинити внутрішній діалог, кинути швидкий короткий погляд (сфотографувати).</p>
          <p><strong>Можливі побічні ефекти:</strong> Через роки тренувань увага внутрішнього зору оживає, стає подібною до уваги сновидінь завдяки великим вкладенням енергії. Це може використовуватися в мріях і ясновидінні.</p>
          <p><strong>Рекомендації:</strong> У день роби багато повторів. Якщо вдається утримати картинку на мить, виконай щонайменше 60 повторів. Перший етап — утримувати картинку у внутрішньому зорі хвилину.</p>
        `
      },
      en: {
        keyboard: '⌨️ Keyboard',
        keyboard_on: 'Keyboard (on)',
        language: '🌐 Language',
        shadow: '✨ Shadow',
        shadow_on: 'Shadow (on)',
        rules: '📜 Rules',
        match_count: '🔢 Number of matches',
        view_time: '⏱️ Viewing time',
        theme: '🎨 Theme',
        night: 'Night',
        day: 'Day',
        start: 'Start',
        check: 'Check',
        new_game: 'New game',
        settings: 'Settings',
        settings_on: 'Settings (on)',
        close: 'Close',
        question: 'How many matches?',
        up: 'Up',
        down: 'Down',
        right: 'Right',
        left: 'Left',
        ok: 'OK',
        delete: '⌫',
        seconds: 'sec',
        rules_content: `
          <p><strong>Game Rules:</strong></p>
          <p>1. Choose the number of matches and viewing time in settings.</p>
          <p>2. Press "Start".</p>
          <p>3. Memorize the directions of the matches within the allotted time.</p>
          <p>4. Indicate how many match heads point up, down, right, and left.</p>
          <p>5. Press "Check" or click the field to check the result.</p>
          <p>6. Press "New game" or click the field for a new game.</p>
          <p><strong>Match Directions:</strong></p>
          <p>The match head (red circle) indicates the direction based on the clock system:</p>
          <pre>
           0°/360° (Up)
                   12
                    ↑
        315°        |        45°
          ↖         |         ↗
      11    ↖       |       ↗    1
              ↖     |     ↗
          10    ↖   |   ↗    2
                  ↖ | ↗
    270° <----- 9 --+-- 3 -----> 90°
 (Left)             |             (Right)
                  ↙ | ↘
           8    ↙   |   ↘    4
              ↙     |     ↘
           7   ↙    |    ↘    5
          ↙         |         ↘
        225°        |        135°
                    ↓
                    6
                180° (Down)
</pre>
          <p>- 315°–45°: Up (around 12 o'clock)</p>
          <p>- 45°–135°: Right (around 3 o'clock)</p>
          <p>- 135°–225°: Down (around 6 o'clock)</p>
          <p>- 225°–315°: Left (around 9 o'clock)</p>
          <p><strong>Goal:</strong> Develop attention control and train the inner vision.</p>
          <p><strong>Process:</strong> Stop the inner dialogue, take a quick short glance (snapshot).</p>
          <p><strong>Possible side effects:</strong> After years of training, the attention of the inner vision comes alive, becoming similar to dream attention due to significant energy investment. This can be engaged in daydreams and clairvoyance.</p>
          <p><strong>Recommendations:</strong> Do many repetitions daily. If you can hold the image for a moment, do at least 60 repetitions. The first stage is to hold the image in your inner vision for a minute.</p>
        `
      },
      es: {
        keyboard: '⌨️ Teclado',
        keyboard_on: 'Teclado (activado)',
        language: '🌐 Idioma',
        shadow: '✨ Sombra',
        shadow_on: 'Sombra (activada)',
        rules: '📜 Reglas',
        match_count: '🔢 Número de cerillas',
        view_time: '⏱️ Tiempo de observación',
        theme: '🎨 Tema',
        night: 'Noche',
        day: 'Día',
        start: 'Comenzar',
        check: 'Verificar',
        new_game: 'Nuevo juego',
        settings: 'Configuración',
        settings_on: 'Configuración (activada)',
        close: 'Cerrar',
        question: '¿Cuántas cerillas?',
        up: 'Arriba',
        down: 'Abajo',
        right: 'Derecha',
        left: 'Izquierda',
        ok: 'OK',
        delete: '⌫',
        seconds: 'seg',
        rules_content: `
          <p><strong>Reglas del juego:</strong></p>
          <p>1. Elige el número de cerillas y el tiempo de observación en la configuración.</p>
          <p>2. Presiona "Comenzar".</p>
          <p>3. Memoriza las direcciones de las cerillas en el tiempo asignado.</p>
          <p>4. Indica cuántas cabezas de cerillas apuntan hacia arriba, abajo, derecha e izquierda.</p>
          <p>5. Presiona "Verificar" o haz clic en el campo para comprobar el resultado.</p>
          <p>6. Presiona "Nuevo juego" o haz clic en el campo para un nuevo juego.</p>
          <p><strong>Direcciones de las cerillas:</strong></p>
          <p>La cabeza de la cerilla (círculo rojo) indica la dirección según el sistema de reloj:</p>
          <pre>
           0°/360° (Arriba)
                   12
                    ↑
        315°        |        45°
          ↖         |         ↗
      11    ↖       |       ↗    1
              ↖     |     ↗
          10    ↖   |   ↗    2
                  ↖ | ↗
    270° <----- 9 --+-- 3 -----> 90°
 (Izquierda)        |             (Derecha)
                  ↙ | ↘
           8    ↙   |   ↘    4
              ↙     |     ↘
           7   ↙    |    ↘    5
          ↙         |         ↘
        225°        |        135°
                    ↓
                    6
                180° (Abajo)
</pre>
          <p>- 315°–45°: Arriba (alrededor de las 12 en punto)</p>
          <p>- 45°–135°: Derecha (alrededor de las 3 en punto)</p>
          <p>- 135°–225°: Abajo (alrededor de las 6 en punto)</p>
          <p>- 225°–315°: Izquierda (alrededor de las 9 en punto)</p>
          <p><strong>Objetivo:</strong> Desarrollar el control de la atención y entrenar la visión interna.</p>
          <p><strong>Proceso:</strong> Detener el diálogo interno, dar una mirada rápida y breve (capturar).</p>
          <p><strong>Efectos secundarios posibles:</strong> Después de años de entrenamiento, la atención de la visión interna cobra vida, volviéndose similar a la atención de los sueños debido a una gran inversión de energía. Esto puede involucrarse en ensoñaciones y clarividencia.</p>
          <p><strong>Recomendaciones:</strong> Realiza muchas repeticiones diarias. Si puedes mantener la imagen por un momento, haz al menos 60 repeticiones. La primera etapa es mantener la imagen en tu visión interna durante un minuto.</p>
        `
      },
      symbols: {
        keyboard: '▥◬⊸',
        keyboard_on: '▥◬⊸ ◉',
        language: '◬⸠▥',
        shadow: '⊹↻▥',
        shadow_on: '⊹↻▥ ◉',
        rules: '⊸▥⊹',
        match_count: '⊹⊹ ◈',
        view_time: '↻▥ ⊸',
        theme: '▥→',
        night: '▥|',
        day: '▥◉',
        start: '◉◬',
        check: '◬→◈',
        new_game: '↻→◉',
        settings: '▥|⊹',
        settings_on: '▥|⊹ ◉',
        close: '⸠⸠',
        question: '⊹⊹ ◈?',
        up: '◬',
        down: '◬',
        right: '◬',
        left: '◬',
        ok: '◬',
        delete: '⌫',
        seconds: '↻',
        rules_content: `
          <p><strong>⊸▥⊹:</strong></p>
          <p>1. ▥|⊹ → ⊹⊹◈, ↻▥⊸.</p>
          <p>2. ◬→ ◉◬.</p>
          <p>3. 🧠→ ⊹⊹ ◬.</p>
          <p>4. ◈→ ⊹⊹ ↑, ↓, →, ←.</p>
          <p>5. ◬→◈ | ◉◬→◈.</p>
          <p>6. ↻→◉ | ◉↻→◉.</p>
          <p><strong>⊹⊹ ◬:</strong></p>
          <p>🔴 ◬→:</p>
          <pre>
           0°/360° (↑)
                   12
                    ↑
        315°        |        45°
          ↖         |         ↗
      11    ↖       |       ↗    1
              ↖     |     ↗
          10    ↖   |   ↗    2
                  ↖ | ↗
    270° <----- 9 --+-- 3 -----> 90°
   (←)              |             (→)
                  ↙ | ↘
           8    ↙   |   ↘    4
              ↙     |     ↘
           7   ↙    |    ↘    5
          ↙         |         ↘
        225°        |        135°
                    ↓
                    6
                180° (↓)
</pre>
          <p>- 315°–45°: ↑</p>
          <p>- 45°–135°: →</p>
          <p>- 135°–225°: ↓</p>
          <p>- 225°–315°: ←</p>
          <p><strong>🎯:</strong> ◬⊸|▥|⊹|↻▥→3⊸→⊹|⊹|◈▥→⸠|⊹|↻</p>
          <p><strong>🔄:</strong> ◉⸠|↺▥|⊹|◈⸠→▥/◉|⊹|⊹↺|⊹|▥=◈</p>
          <p><strong>⚠️:</strong> ◬⊸|▥|⊹|↻▥→3⊸→⊹|⊹|◈▥→⸠|⊹|↻</p>
          <p><strong>📝:</strong> ◉⸠|↺▥|⊹|◈⸠→▥/◉|⊹|⊹↺|⊹|▥=◈</p>
        `
      }
    };