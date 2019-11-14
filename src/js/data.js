import emojilib from 'emojilib';

export const emojis = Object.entries(emojilib.lib).map(([value, data]) => ({
    value,
    name: data.char,
    category: data.category,
    keywords: data.keywords,
}));

export const fonts = [
    {
        type: 'group',
        name: 'Sans serif',
        items: [
            {
                value: 'nunito-sans',
                name: 'Nunito Sans',
                fontFamily: '\'Nunito Sans\', sans-serif',
            },
            {
                value: 'source-sans-pro',
                name: 'Source Sans Pro',
                fontFamily: '\'Source Sans Pro\', sans-serif',
            },
        ],
    },
    {
        type: 'group',
        name: 'Serif',
        items: [
            {
                value: 'merriweather',
                name: 'Merriweather',
                fontFamily: 'Merriweather, serif',
            },
            {
                value: 'rufina',
                name: 'Rufina',
                fontFamily: 'Rufina, serif',
            },
        ],
    },
    {
        type: 'group',
        name: 'Cursive',
        items: [
            {
                value: 'lobster',
                name: 'Lobster',
                fontFamily: 'Lobster, cusive',
            },
            {
                value: 'pacifico',
                name: 'Pacifico',
                fontFamily: 'Pacifico, cursive',
            },
        ],
    },
];

export const themes = [
    {
        value: 'light',
        name: 'Light',
    },
    {
        value: 'dark',
        name: 'Dark',
    },
];

// https://randomuser.me/
export const friends = [
    { name: 'Annie Cruz', value: 'annie.cruz', photo: 'https://randomuser.me/api/portraits/women/60.jpg' },
    {
        name: 'Eli Shelton',
        disabled: true,
        value: 'eli.shelton',
        photo: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    { name: 'Loretta Rogers', value: 'loretta.rogers', photo: 'https://randomuser.me/api/portraits/women/51.jpg' },
    { name: 'Lloyd Fisher', value: 'lloyd.fisher', photo: 'https://randomuser.me/api/portraits/men/34.jpg' },
    { name: 'Tiffany Gonzales', value: 'tiffany.gonzales', photo: 'https://randomuser.me/api/portraits/women/71.jpg' },
    { name: 'Charles Hardy', value: 'charles.hardy', photo: 'https://randomuser.me/api/portraits/men/12.jpg' },
    { name: 'Rudolf Wilson', value: 'rudolf.wilson', photo: 'https://randomuser.me/api/portraits/men/40.jpg' },
    { name: 'Emerald Hensley', value: 'emerald.hensley', photo: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Lorena McCoy', value: 'lorena.mccoy', photo: 'https://randomuser.me/api/portraits/women/70.jpg' },
    { name: 'Alicia Lamb', value: 'alicia.lamb', photo: 'https://randomuser.me/api/portraits/women/22.jpg' },
    { name: 'Maria Waters', value: 'maria.waters', photo: 'https://randomuser.me/api/portraits/women/82.jpg' },
];
