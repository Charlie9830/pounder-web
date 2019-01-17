import { createMuiTheme }  from '@material-ui/core/styles';
import { GetMuiColorMap } from './MuiColors';


export function BuildMuiTheme(storedTheme) {
    let colorMap = GetMuiColorMap();

    return createMuiTheme({
        'palette': {
            'primary': colorMap[storedTheme.palette.primaryColorId].color,
            'secondary': colorMap[storedTheme.palette.secondaryColorId].color,
            'type': storedTheme.type,
            'background': getBackground(colorMap[storedTheme.palette.backgroundColorId], storedTheme.type),
            'custom': {
                "today": mergeValues('#1455c0', storedTheme.palette.custom.today),
                "soon": mergeValues('#FF9300', storedTheme.palette.custom.soon),
                "overdue": mergeValues('#F00', storedTheme.palette.custom.overdue),
                "later": mergeValues('#22B30B', storedTheme.palette.custom.later),
                "unreadItem": mergeValues('#1455c0', storedTheme.palette.custom.unreadItem),
            }
        },
        'spacing': {
            'unit': getSpacingUnit(storedTheme.isDense),
        },
        'typography': {
            useNextVariants: true,
            fontSize: getFontSize(storedTheme.isDense)
        },
        'overrides': {
            'MuiIconButton': {
                root: {
                    'padding': getMuiIconButtonPadding(storedTheme.isDense)
                }
            }
        }
    })
}

function getFontSize(isDense) {
    return isDense ? 14 : 14;
}

function getSpacingUnit(isDense) {
    return isDense ? 6 : 8;
}

function getMuiIconButtonPadding(isDense) {
    return isDense ? '8px' : '12px';
}

function getBackground(desiredMuiBackground, themeType) {
    if (themeType === 'dark') {
        return {
            default: desiredMuiBackground.color[900],
            paper: desiredMuiBackground.color['A400'],
        }
    }

    else {
        return {
            default: desiredMuiBackground.color[200],
            paper: desiredMuiBackground.color[50],
        }
    }
}

function mergeValues(defaultValue, storedValue) {
    if (storedValue === undefined) {
        return defaultValue;
    }

    else {
        return storedValue;
    }
}