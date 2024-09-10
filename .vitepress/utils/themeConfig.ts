export const ThemeConfig = {
    getEditLink: (editPageText: string): { pattern: string; text: string; } => {
        return {
            pattern: "https://github.com/snowykami/blog/tree/main",
            text: editPageText
        };
    },

    getOutLine: (label: string): { label: string; level: [number, number]; } => {
        return {
            label: label,
            level: [2, 6]
        };
    },

    copyright: 'Copyright (C) 2020-2024 LiteyukiStudio. All Rights Reserved'
}
