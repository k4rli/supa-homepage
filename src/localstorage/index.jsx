/*global localStorage*/

export const loadState = () => {
    try {
        const state = localStorage.getItem('state');
        if (state === null) return undefined;
        return JSON.parse(state);
    } catch (err) {
        console.log(err);
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        localStorage.setItem('state', JSON.stringify(state));
    } catch (err) {
        console.log(err);
    }
};
