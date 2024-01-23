import { reducer } from './pc-constraints.reducer';
import { pcConstraintsState } from './pc-constraints.state';

describe('PcConstraints Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(pcConstraintsState, action);

      expect(result).toBe(pcConstraintsState);
    });
  });
});
