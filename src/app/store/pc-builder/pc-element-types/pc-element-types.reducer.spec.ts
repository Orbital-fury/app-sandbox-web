import { pcElementTypesState } from './pc-element-types.state';
import { reducer } from './pc-element-types.reducer';

describe('PcElementTypes Reducer', () => {
    describe('an unknown action', () => {
        it('should return the previous state', () => {
            const action = {} as any;

            const result = reducer(pcElementTypesState, action);

            expect(result).toBe(pcElementTypesState);
        });
    });
});
