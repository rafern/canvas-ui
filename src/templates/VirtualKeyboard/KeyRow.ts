import type { MultiContainer } from '../../widgets/MultiContainer';
import type { FilledButton } from '../../widgets/FilledButton';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { GlyphKey } from './GlyphKey';
import { Row } from '../Row';

export type KeyTemplateFunction = (keyContext: KeyContext, themeOverride: Theme | null) => FilledButton;

// Template for a Row of virtual keys (BasicKey, ShiftKey, GlyphKey, etc...).
// Generates given a template
export function KeyRow(rowTemplate: Array<string[] | KeyTemplateFunction>, keyContext: KeyContext, themeOverride: Theme | null = null): MultiContainer {
    const row = Row(themeOverride);
    for(const entry of rowTemplate) {
        if(typeof entry === 'function') {
            // Entry is in template function format
            const templateFunction = entry;
            row.add(templateFunction(keyContext, themeOverride));
        }
        else if(typeof entry[0] === 'string' && typeof entry[1] === 'string') {
            // Entry is in multiple glyphs format
            const glyphs = entry[0];
            const altGlyphs = entry[1];
            for(let i = 0; i < glyphs.length; i++) {
                let altGlyph = null;
                if(i < altGlyphs.length)
                    altGlyph = altGlyphs[i];

                row.add(GlyphKey(glyphs[i], altGlyph, keyContext, themeOverride));
            }
        }
        else {
            throw new Error(`Unknown virtual key row template format for entry: ${entry}`);
        }
    }

    return row;
}