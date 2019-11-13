import React from 'react';
import emojilib from 'emojilib';
import SelectSearch from 'react-select-search';

const themes = [
    {
        value: 'light',
        name: 'Light',
    },
    {
        value: 'dark',
        name: 'Dark',
    },
];

const fonts = [
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

const emojis = Object.entries(emojilib.lib).map(([value, data]) => ({
    value,
    name: data.char,
    category: data.category,
    keywords: data.keywords,
}));

function loadFonts() {
    let flatFonts = [];

    fonts.forEach((group) => {
        flatFonts = [...flatFonts, ...group.items.map((item) => item.name)];
    });

    window.WebFontConfig = {
        google: { families: flatFonts },
    };

    (function loadFontScript(d) {
        const wf = d.createElement('script');
        const s = d.scripts[0];

        wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
        wf.async = true;
        s.parentNode.insertBefore(wf, s);
    }(document));
}

const renderFontValue = (valueProps, ref, { fontFamily }) => {
    const style = {
        fontFamily: fontFamily || null,
    };

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <input ref={ref} {...valueProps} style={style} />
    );
};

const renderFontOption = (props, { name, fontFamily }) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <button {...props} type="button">
        <span style={{ fontFamily }}>{name}</span>
    </button>
);

class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            theme: 'light',
            font: 'nunito-sans',
            emoji: 'sunglasses',
        };
    }

    componentDidMount() {
        loadFonts();
    }

    onThemeChange = (theme) => {
        this.setState({ theme });

        document.documentElement.className = `${theme}-mode`;
    };

    onFontChange = (font, { fontFamily }) => {
        this.setState({ font });

        let style = document.getElementById('font');

        if (!style) {
            style = document.createElement('style');

            style.id = 'font';
            style.type = 'text/css';

            document.head.appendChild(style);
        }

        style.innerHTML = `body { --font: ${fontFamily}; }`;
    };

    onEmojiChange = (emoji) => {
        this.setState({ emoji });
    };

    render() {
        const { theme, font, emoji } = this.state;

        return (
            <>
                <div className="hero">
                    <div className="wrapper">
                        <h1>Lightweight select component for React.</h1>
                    </div>
                </div>
                <section className="section">
                    <div className="wrapper">
                        <h1>Default behavior</h1>
                        <p>
                            The default behavior is meant to work as a zero config,
                            drop-in replacement of the standard HTML select component. Obviously
                            with the added power and flexibility of React, fully stylable.
                        </p>
                        <div className="section__content">
                            <SelectSearch
                                value={theme}
                                onChange={this.onThemeChange}
                                options={themes}
                            />
                        </div>
                    </div>
                </section>
                <section className="section alt">
                    <div className="wrapper">
                        <h1>Customizable</h1>
                        <p>
                            Besides from being fully stylable, you can also control
                            the render of each component. You can, for example, render
                            each option differently.
                        </p>
                        <div className="section__content">
                            <SelectSearch
                                value={font}
                                onChange={this.onFontChange}
                                renderOption={renderFontOption}
                                renderValue={renderFontValue}
                                options={fonts}
                            />
                        </div>
                    </div>
                </section>
                <section className="section alt">
                    <div className="wrapper">
                        <h1>Fuzzy search</h1>
                        <p>
                            React select search comes with prebuilt, optional support
                            for fuzzy search. Quick search on any property in your options.
                        </p>
                        <div className="section__content">
                            <SelectSearch
                                className="select-search-box"
                                value={emoji}
                                search
                                placeholder="Choose your favorite emoji"
                                onChange={this.onEmojiChange}
                                filterOptions={(options) => options.slice(0, 24)}
                                fuse={{
                                    keys: ['category', 'keywords'],
                                    threshold: 0.1,
                                }}
                                options={emojis}
                            />
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default App;
