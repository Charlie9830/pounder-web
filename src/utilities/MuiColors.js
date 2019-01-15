import { red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen,
    lime, yellow, amber, orange, deepOrange, brown, grey, blueGrey } from '@material-ui/core/colors';

export const GetMuiColorMap = () => {
    return {
        red: { id: 'red', color: red },
        pink: { id: 'pink', color: pink },
        purple: { id: 'purple', color: purple },
        deepPurple: { id: 'deepPurple', color: deepPurple },
        indigo: { id: 'indigo', color: indigo },
        blue: { id: 'blue', color: blue },
        lightBlue: { id: 'lightBlue', color: lightBlue },
        cyan: { id: 'cyan', color: cyan },
        teal: { id: 'teal', color: teal },
        green: { id: 'green', color: green },
        lightGreen: { id: 'lightGreen', color: lightGreen },
        lime: { id: 'lime', color: lime },
        yellow: { id: 'yellow', color: yellow },
        amber: { id: 'amber', color: amber }, 
        orange: { id: 'orange', color: orange },
        deepOrange: { id: 'deepOrange', color: deepOrange },
        brown: { id: 'brown', color: brown },
        grey: { id: 'grey', color: grey },
        blueGrey: { id: 'blueGrey', color: blueGrey }
    }
}

export const GetMuiColorArray = () => {
    let array = [];
    let muiColorMap = GetMuiColorMap();
    for (let propertyName in muiColorMap) {
        array.push(muiColorMap[propertyName])
    }

    return array;
}