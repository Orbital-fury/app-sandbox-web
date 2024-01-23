import { reducer } from './pc-elements.reducer';
import { pcElementsState } from './pc-elements.state';

describe('PcElements Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(pcElementsState, action);

      expect(result).toBe(pcElementsState);
    });
  });
});
