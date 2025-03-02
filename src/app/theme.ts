// theme.ts

export const colorsGradient = {
    primary: '#1D3557',      // темно-синий
    accent: '#9B4DFF',       // яркий фиолетовый
    background:  '#FFFFFF' ,// градиент от темного синего к фиолетовому
    cardBackground: 'linear-gradient(#0B0C10, #9B4DFF)',  // фон для карточек исправить
    text: '#FFFFFF',         // белый
    secondaryText: '#D1D1D6', // светло-серый
    buttonBackground:  '#9B4DFF',// кнопки с акцентом исправить
    buttonText: '#FFFFFF',   // текст на кнопках исправить
    border: 'linear-gradient(#0B0C10, #9B4DFF)',
};

export const darkColorsGradient = {
    primary: '#FFFFFF',      // темно-синий
    accent: '#9B4DFF',       // яркий фиолетовый
    background:  'linear-gradient(#0B0C10, #9B4DFF)', // темно-серый фон для темной темы
    cardBackground: '#1A1A1A', // фон для карточек
    text: '#1D3557',         // белый
    secondaryText: '#B0B0B0', // светло-серый для вторичных текстов
    buttonBackground: '#FFFFFF'  , // кнопки с акцентом
    buttonText: '#1D3557'   , // текст на кнопках
    border: '#B0B0B0'
};

// Типы для тем
export type Theme = "light" | "dark";

export const getThemeColors = (theme: Theme) => {
    return theme === "light" ? colorsGradient : darkColorsGradient;
};
