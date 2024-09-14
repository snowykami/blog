export const ThemeConfig = {
    getEditLink: (editPageText: string): { pattern: (params: { filePath: string; }) => string; text: string; } => {
        return {
            pattern: ({filePath}: { filePath: string; }): string => {
                // 匹配 /dev/api或 /{lang}/dev/api
                return `https://github.com/snowykami/blog/tree/main/${filePath}`
            },
            text: editPageText
        };
    },
    getOutLine: (label: string): { label: string; level: [number, number]; } => {
        return {
            label: label,
            level: [2, 6]
        };
    },
}
