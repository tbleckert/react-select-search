import React, { useMemo, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import classes from './assets/hooks.module.css';
import useSelect from '../src/useSelect';

export default {
  title: 'Hooks',
};

const classNames = {
    appear: classes.appear,
    appearActive: classes['appear-active'],
    appearDone: classes['appear-done'],
    enter: classes.enter,
    enterActive: classes['enter-active'],
    enterDone: classes['enter-done'],
    exit: classes.exit,
    exitActive: classes['exit-active'],
    exitDone: classes['exit-done'],
}

const CustomSelect = ({ options, value }) => {
    const [snapshot, valueProps, optionProps] = useSelect({
        options,
        value: null,
        allowEmpty: false,
    });

    return (
        <>
            <div {...valueProps} className={classes.button}>{`Size: ${snapshot.displayValue}`}</div>
            <CSSTransition in={snapshot.focus} timeout={200} mountOnEnter unmountOnExit classNames={classNames}>
                <div className={classes.select}>
                    <div className={classes.options}>
                        {snapshot.options.map((option) => (
                            <button
                                key={option.value}
                                {...optionProps}
                                value={option.value}
                                className={[classes.option, (snapshot.value.value === option.value) ? classes['is-selected'] : null].filter(Boolean).join(' ')}
                            >
                                {option.name}
                            </button>
                        ))}
                    </div>
                </div>
            </CSSTransition>
        </>
    )
}

export const CustomComponents = () => {
    const options = [
        { value: 's', name: 'Small' },
        { value: 'm', name: 'Medium' },
        { value: 'l', name: 'Large' },
    ];

    return <CustomSelect options={options} value={null} />;
};
