import { useMemo, useState } from 'react';
import question from '../assets/question.svg';
import check from '../assets/claim-check.svg';
import cross from '../assets/claim-cross.svg';
import { useWeb3React } from '@web3-react/core';
import { useAuthorization } from 'airdao-components-and-tools/hooks';
import ConnectWallet from '../components/Claim/ConnectWallet';
import CheckEligibility from '../components/Claim/CheckEligibility';
import ClaimReward from '../components/Claim/ClaimReward';
import SuccessClaim from '../components/Claim/SuccessClaim';

const Claim = () => {
  const web3ReactInstance = useWeb3React();
  const { account } = web3ReactInstance;
  const { loginMetamask } = useAuthorization(web3ReactInstance);

  const [eligibility, setEligibility] = useState({});
  const [isAbleToClaim, setIsAbleToClaim] = useState(false);
  const [isSuccessClaim, setIsSuccessClaim] = useState(false);

  const handleEligibility = () => {
    const mockData = {
      staking: true,
      bridge: false,
    };

    setEligibility(mockData);
    setIsAbleToClaim(true);
  };

  const claimRewards = () => {
    setIsAbleToClaim(false);
    setIsSuccessClaim(true);
  };

  const stepStatusImg = useMemo(() => {
    const imgs = {};

    Object.keys(eligibility).forEach((el) => {
      imgs[el] = eligibility[el] ? check : cross;
    });
    return imgs;
  }, [eligibility]);

  const currentStepBlock = () => {
    if (!account) {
      return <ConnectWallet loginMetamask={loginMetamask} />;
    } else if (isAbleToClaim) {
      return <ClaimReward claimRewards={claimRewards} />;
    } else if (isSuccessClaim) {
      return <SuccessClaim />;
    } else {
      return <CheckEligibility handleEligibility={handleEligibility} />;
    }
  };

  return (
    <div className='claim-page'>
      <div className='container'>
        <div className='claim-wrapper content'>
          {currentStepBlock()}
          <ul className='claim-steps '>
            <li className='claim-steps__item'>
              <img
                src={stepStatusImg['staking'] || question}
                alt='question mark'
              />
              Use Staking
            </li>
            <li className='claim-steps__item'>
              <img
                src={stepStatusImg['bridge'] || question}
                alt='question mark'
              />
              Bridged to AMB Network
            </li>
            <li className='claim-steps__item claim-steps__item_disabled'>
              <img src={question} alt='question mark' />
              Use Staking
            </li>
            <li className='claim-steps__item claim-steps__item_disabled'>
              <img src={question} alt='question mark' />
              Made Transactions
            </li>
            <li className='claim-steps__item claim-steps__item_disabled'>
              <img src={question} alt='question mark' />
              Will be open in: 24h 20min
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Claim;
