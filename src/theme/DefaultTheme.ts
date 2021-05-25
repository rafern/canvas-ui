import type { Alignment2D } from './Alignment2D';
import { ThemeProperty } from './ThemeProperty';
import type { Padding } from './Padding';
import { Alignment } from './Alignment';
import { Theme } from './Theme';

export const defaultTheme = new Theme(new Map<ThemeProperty, unknown>([
    [ThemeProperty.CanvasFill, 'rgba(0,0,0,0.5)'], // 50% opaque black
    [ThemeProperty.ContainerPadding, <Padding>{
        left: 4,
        right: 4,
        top: 4,
        bottom: 4,
    }],
    [ThemeProperty.ContainerAlignment, <Alignment2D>{
        horizontal: Alignment.Start, vertical: Alignment.Start
    }],
    [ThemeProperty.ContainerSpacing, 4],
    [ThemeProperty.PrimaryFill, 'rgb(0,127,255)'], // Azure blue
    [ThemeProperty.AccentFill, 'rgb(0,195,255)'], // Greener azure blue
    [ThemeProperty.BackgroundFill, 'rgb(32,32,32)'], // Dark grey
    [ThemeProperty.BackgroundGlowFill, 'rgb(48,48,48)'], // Lighter dark grey
    [ThemeProperty.SliderFlexRatio, 1],
    [ThemeProperty.SliderMainBasis, 100],
    [ThemeProperty.SliderCrossBasis, 10],
    [ThemeProperty.BodyTextFont, '16px sans'],
    [ThemeProperty.BodyTextFill, 'white'],
    [ThemeProperty.LabelMinWidth, 0],
    [ThemeProperty.LabelMinAscent, 0],
    [ThemeProperty.LabelMinDescent, 3],
    [ThemeProperty.CheckboxLength, 12],
    [ThemeProperty.CheckboxInnerPadding, 2],
    [ThemeProperty.InputBackgroundFill, 'white'],
    [ThemeProperty.InputTextFont, '16px mono'],
    [ThemeProperty.InputTextFill, 'black'],
    [ThemeProperty.InputTextFillDisabled, 'grey'],
    [ThemeProperty.InputTextFlexRatio, 1],
    [ThemeProperty.InputTextMinWidth, 100],
    [ThemeProperty.InputTextMinAscent, 16],
    [ThemeProperty.InputTextMinDescent, 3],
    [ThemeProperty.BlinkRate, 0.8],
    [ThemeProperty.CursorPadding, 2],
    [ThemeProperty.CursorThickness, 2],
    [ThemeProperty.ScrollBarThickness, 10],
]));
