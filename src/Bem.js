const Bem = {

    mSeparator: '--',
    eSeparator: '__',

    m(base, modifier) {
        modifier = modifier.split(' ');
        let finalClass = [];

        modifier.forEach(function (className) {
            finalClass.push(base + '--' + className);
        });

        return finalClass.join(' ');
    },

    e(base, element) {
        return base + this.eSeparator + element;
    }

};

export default Bem;