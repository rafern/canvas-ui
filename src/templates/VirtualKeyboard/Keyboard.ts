import type { MultiContainer } from '../../widgets/MultiContainer';
import type { KeyTemplateFunction } from './KeyRow';
import type { Theme } from '../../theme/Theme';
import type { KeyContext } from './KeyContext';
import { BackspaceKey } from './BackspaceKey';
import { EscapeKey } from './EscapeKey';
import { EnterKey } from './EnterKey';
import { ShiftKey } from './ShiftKey';
import { SpaceKey } from './SpaceKey';
import { Column } from '../Column';
import { KeyRow } from './KeyRow';

const defaultVirtualKeyboardTemplate = [
    // First row
    [['`1234567890-=', '~!@#$%^&*()_+']],
    // Second row
    [['qwertyuiop[]\\', 'QWERTYUIOP{}|']],
    // Third row
    [['asdfghjkl;\'', 'ASDFGHJKL:"'], EnterKey],
    // Fourth row
    [ShiftKey, ['zxcvbnm,./', 'ZXCVBNM<>?']],
    // Fifth row
    [BackspaceKey, SpaceKey, EscapeKey],
];

// Template for entire virtual keyboard, which is a Column of KeyRows sharing a
// key context. If no keyboard template is given, the default QUERTY one is used
export function VirtualKeyboard(keyContext: KeyContext, keyboardTemplate: Array<Array<string[] | KeyTemplateFunction>> | null = null, themeOverride: Theme | null = null): MultiContainer {
    if(keyboardTemplate === null)
        keyboardTemplate = defaultVirtualKeyboardTemplate;

    const column = Column(themeOverride);
    for(const rowTemplate of keyboardTemplate)
        column.add(KeyRow(rowTemplate, keyContext, themeOverride));

    return column;
}
