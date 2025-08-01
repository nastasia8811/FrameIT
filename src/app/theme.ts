export const colorsGradient = {
    primary: '#1D3557',
    accent: '#9B4DFF',
    background:  '#FFFFFF' ,
    cardBackground: 'linear-gradient(#0B0C10, #9B4DFF)',
    text: '#FFFFFF',
    secondaryText: '#D1D1D6',
    buttonBackground:  '#9B4DFF',
    buttonText: '#FFFFFF',
    border: 'linear-gradient(#0B0C10, #9B4DFF)',
    primaryGeneral: '#1D3557',
};

export const darkColorsGradient = {
    primary: '#FFFFFF',
    accent: '#9B4DFF',
    background:  'linear-gradient(#0B0C10, #9B4DFF)',
    cardBackground: '#1A1A1A',
    text: '#1D3557',
    secondaryText: '#B0B0B0',
    buttonBackground: '#FFFFFF',
    buttonText: '#1D3557',
    border: '#B0B0B0',
    primaryGeneral: '#1D3557'
};

export type Theme = "light" | "dark";

export const getThemeColors = (theme: Theme) => {
    return theme === "light" ? colorsGradient : darkColorsGradient;
};
