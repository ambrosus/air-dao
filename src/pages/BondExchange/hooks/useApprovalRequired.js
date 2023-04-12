import { useEffect, useState } from 'react';
import useSwapActions from './useSwapActions';

export default function useAirBondApprovalRequired(airBondAmount) {
  const [isApprovalRequired, setIsApprovalRequired] = useState(false);
  const { checkAllowance } = useSwapActions();

  useEffect(() => {
    if (!airBondAmount) {
      setIsApprovalRequired(false);
      return;
    }

    checkAllowance(airBondAmount).then(setIsApprovalRequired);
  }, [airBondAmount]);

  return isApprovalRequired;
}
