import React from 'react';
import SelectSearch from 'react-select-search';
import {
    emojis,
    fonts,
    themes,
    friends,
} from 'mjs/data';

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

const imgStyle = {
    borderRadius: '50%',
    verticalAlign: 'middle',
    marginRight: 10,
};

const renderFriend = (props, option) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <button {...props} type="button">
        <span>
            <img alt="" style={imgStyle} width="40" height="40" src={option.photo} />
            <span>{option.name}</span>
        </span>
    </button>
);

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
            myFriends: [],
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
        const {
            theme,
            font,
            emoji,
            myFriends,
        } = this.state;

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
                                className="select-search-box select-search-box--emoji"
                                value={emoji}
                                search
                                placeholder="Choose your favorite emoji"
                                onChange={this.onEmojiChange}
                                filterOptions={(options) => options.slice(0, 124)}
                                fuse={{
                                    keys: ['category', 'keywords'],
                                    threshold: 0.1,
                                }}
                                options={emojis}
                            />
                        </div>
                    </div>
                </section>
                <section className="section alt">
                    <div className="wrapper">
                        <h1>Multiple</h1>
                        <p>
                            With a simple flag you can also enable multiple options to be
                            selected. In this example we have styled it differently than
                            the single selects. The select box will have different class modifiers
                            based the features that are enabled.
                        </p>
                        <div className="section__content">
                            <SelectSearch
                                className="select-search-box"
                                defaultValue={myFriends}
                                search
                                multiple
                                placeholder="Select your friends..."
                                renderOption={renderFriend}
                                options={friends}
                            />
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default App;
