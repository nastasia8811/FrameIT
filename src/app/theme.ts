export const colorsGradient = {
    primary: '#1D3557',
    accent: '#9B4DFF',
    background: '#FFFFFF',
    cardBackground: '#F5F5F5',
    text: '#1D3557',
    secondaryText: '#6B7280',
    buttonBackground: '#9B4DFF',
    buttonText: '#FFFFFF',
    border: '#D1D5DB',
    primaryGeneral: '#1D3557',
};

export const darkColorsGradient = {
    primary: '#FFFFFF',
    accent: '#9B4DFF',
    background: 'linear-gradient(#0B0C10, #9B4DFF)',
    cardBackground: '#1A1A1A',
    text: '#FFFFFF',
    secondaryText: '#B0B0B0',
    buttonBackground: '#FFFFFF',
    buttonText: '#1D3557',
    border: '#4B5563',
    primaryGeneral: '#E5E7EB',
};

export type Theme = "light" | "dark";

export const getThemeColors = (theme: Theme) => {
    return theme === "light" ? colorsGradient : darkColorsGradient;
};
