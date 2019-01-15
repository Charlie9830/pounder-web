import { createMuiTheme }  from '@material-ui/core/styles';
import { GetMuiColorMap } from './MuiColors';

export function BuildMuiTheme(storedTheme) {
    let colorMap = GetMuiColorMap();
    return createMuiTheme({
        'palette': {
            'primary': colorMap[storedTheme.palette.primaryColorId],
            'secondary': colorMap[storedTheme.palette.secondaryColorId],
            'type': storedTheme.type,
            'background': {
                'default': "rgb(30,30,30)",
                'paper': 'rgb(42,42,42)'
            },
            'custom': {
                "today": mergeValues('#1455c0', storedTheme.palette.custom.today),
                "soon": mergeValues('#FF9300', storedTheme.palette.custom.soon),
                "overdue": mergeValues('#F00', storedTheme.palette.custom.overdue),
                "later": mergeValues('#22B30B', storedTheme.palette.custom.later),
                "unreadItem": mergeValues('#1455c0', storedTheme.palette.custom.unreadItem),
            }
        },
        // 'typography': {
        //     useNextVariants: true
        // }
    })
}

function mergeValues(defaultValue, storedValue) {
    if (storedValue === undefined) {
        return defaultValue;
    }

    else {
        return storedValue;
    }
}