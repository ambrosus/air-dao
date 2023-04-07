import {useEffect, useMemo, useState} from 'react';
import question from '../assets/question.svg';
import check from '../assets/claim-check.svg';
import cross from '../assets/claim-cross.svg';
import { useWeb3React } from '@web3-react/core';
import { useAuthorization } from 'airdao-components-and-tools/hooks';
import ConnectWallet from '../components/Claim/ConnectWallet';
import CheckEligibility from '../components/Claim/CheckEligibility';
import ClaimReward from '../components/Claim/ClaimReward';
import SuccessClaim from '../components/Claim/SuccessClaim';
import NotToday from '../components/Claim/NotToday';
import { usePrismicPageData } from '../hooks/usePrismicPageData';
import { providers } from 'ethers';

const getTimeRemaining = (futureDate) => {
  const futureTime = new Date(futureDate).getTime();
  const currentTime = new Date().getTime();
  let timeRemaining = Math.floor((futureTime - currentTime) / 1000);

  const days = Math.floor(timeRemaining / 86400);
  timeRemaining = timeRemaining % 86400;

  const hours = Math.floor(timeRemaining / 3600);
  timeRemaining = timeRemaining % 3600;

  const minutes = Math.floor(timeRemaining / 60);

  return `${days} days ${hours < 10 ? '0' : ''}${hours} hours ${
    minutes < 10 ? '0' : ''
  }${minutes} minutes`;
};

const contractAddress = '0xBDc316826B77d198Eec93BC813F2796e7f26c2b3';

const Claim = () => {
  const data = usePrismicPageData('claim');
  const web3ReactInstance = useWeb3React();
  const { account } = web3ReactInstance;
  const { loginMetamask } = useAuthorization(web3ReactInstance);

  const [eligibility, setEligibility] = useState({});
  const [showClaimPage, setShowClaimPage] = useState(false);
  const [isSuccessClaim, setIsSuccessClaim] = useState(false);
  const [showNotTodayPage, setShowNotTodayPage] = useState(false);
  const [totalClaimed, setTotalClaimed] = useState(0);

  useEffect(() => {
    if (account && data) {
      checkPrevEligibility();
    }
  }, [account, data]);

  const checkPrevEligibility = async () => {
    const response = await fetch(
      `http://135.181.152.255/previous?address=${account}`
    );
    const jsonData = await response.json();
    const activeEligibility = data['claim-item'].filter(
      (el) => el['is-claim-active']
    );

    setEligibility(jsonData);

    if (Object.keys(jsonData).length === activeEligibility.length) {
      const isAbleToClaim = checkClaimAvailable(jsonData);

      if (isAbleToClaim) {
        setShowClaimPage(true);
      } else {
        const showNotToday = Object.values(jsonData).every(
          (el) => el.claimed || !el.amount
        );

        setShowNotTodayPage(showNotToday);
      }
    }
  };

  const handleEligibility = async () => {
    const response = await fetch(
      `http://135.181.152.255/check?address=${account}`
    );
    const jsonData = await response.json();
    console.log(jsonData);
    setEligibility(jsonData);

    const isAbleToClaim = checkClaimAvailable(jsonData);

    if (isAbleToClaim) {
      setShowClaimPage(true);
    } else {
      setShowNotTodayPage(true);
    }
  };

  const checkClaimAvailable = (eligibilityData) => {
    return !!Object.values(eligibilityData).find(
      (el) => el.amount && !el.claimed
    );
  };

  const claimRewards = () => {
    const provider = new providers.JsonRpcProvider();
    const signer = provider.getSigner();

    const callData = '';

    signer
      .sendTransaction({ to: contractAddress, data: callData })
      .then(() => {
        setIsSuccessClaim(true);
        setTotalClaimed(availableReward);
      })
      .finally(() => setShowClaimPage(false));
  };

  const stepStatusImg = useMemo(() => {
    const imgs = {};

    Object.keys(eligibility).forEach((el) => {
      imgs[el] = eligibility[el].amount ? check : cross;
    });
    return imgs;
  }, [eligibility]);

  const availableReward = useMemo(() => {
    return Object.values(eligibility)
      .filter((item) => !item.claimed)
      .reduce((acc, item) => acc + item.amount, 0);
  }, [eligibility]);

  const currentStepBlock = () => {
    if (!account) {
      return <ConnectWallet loginMetamask={loginMetamask} />;
    } else if (showClaimPage) {
      return (
        <ClaimReward
          availableReward={availableReward}
          claimRewards={claimRewards}
        />
      );
    } else if (isSuccessClaim) {
      return <SuccessClaim />;
    } else if (showNotTodayPage) {
      const nextClaim = data['claim-item'].find((el) => !el['is-claim-active']);
      const nextClaimTimeRemaining = getTimeRemaining(
        nextClaim['claim-open-time']
      );

      return <NotToday nextClaimTimeRemaining={nextClaimTimeRemaining} />;
    } else {
      return <CheckEligibility handleEligibility={handleEligibility} />;
    }
  };

  return (
    <div className='claim-page'>
      <div className='container'>
        <div className='claim-wrapper content'>
          <div className='claim-block'>
            <div className='claim-block__heading'>
              <span className='claim-block__day'>Day 1</span>
              {!!totalClaimed && (
                <>
                  <span className='claim-block__claimed-text'>
                    Total AirBonds claimed:
                  </span>
                  <span className='claim-block__claimed'>{totalClaimed}</span>
                </>
              )}
            </div>
            {currentStepBlock()}
          </div>
          <ul className='claim-steps '>
            {data &&
              data['claim-item'].map((el) => (
                <li
                  key={el['claim-open-time']}
                  className={`claim-steps__item ${
                    !el['is-claim-active'] ? 'claim-steps__item_disabled' : ''
                  }`}
                >
                  <img
                    src={stepStatusImg[el.value[0]?.text] || question}
                    alt='question mark'
                  />
                  {el['is-claim-active']
                    ? el.label[0].text
                    : `Will be opened in: ${getTimeRemaining(
                        el['claim-open-time']
                      )}`}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Claim;
