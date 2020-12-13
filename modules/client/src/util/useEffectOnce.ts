import { EffectCallback, useEffect } from 'react';

// removes react-hooks/exhaustive-deps warning
const useEffectOnce = (effect: EffectCallback) => useEffect(effect, []);

export default useEffectOnce;
