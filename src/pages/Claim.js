/* eslint-disable */
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
import { AmbErrorProviderWeb3 } from '@airdao/airdao-node-contracts';

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

const contractAddress = '0x5aaC4B010822AE3cC1143FAB900700BE6Df9210e';
const backendApi = 'https://airdrop-backend-api.ambrosus-test.io/check?address=';

const Claim = () => {
  const data = usePrismicPageData('claim');
  const web3ReactInstance = useWeb3React();
  const { account } = web3ReactInstance;
  const { loginMetamask } = useAuthorization(web3ReactInstance);

  const [eligibility, setEligibility] = useState(null);
  const [showClaimPage, setShowClaimPage] = useState(false);
  const [isSuccessClaim, setIsSuccessClaim] = useState(false);
  const [showNotTodayPage, setShowNotTodayPage] = useState(false);
  const [totalClaimed, setTotalClaimed] = useState(0);
  const [callData, setCallData] = useState('');
  const [isClaimLoading, setIsClaimLoading] = useState(false);

  useEffect(() => {
    if (account && data) {
      checkPrevEligibility();
    }
  }, [account, data]);

  const checkPrevEligibility = async () => {
    setShowNotTodayPage(false);
    setIsSuccessClaim(false);
    setShowClaimPage(false);

    const response = await fetch(
      `${backendApi}${account}`
    );

    const jsonData = await response.json();
    const activeEligibility = data['claim-item'].filter(
      (el) => el['is-claim-active']
    );
    const filteredItems = {};
    let claimedAmount = 0

    for (const key in jsonData.categories) {
      if (jsonData.categories[key].claimed) {
        claimedAmount += jsonData.categories[key].amount
      }
      if (jsonData.categories[key].claimed || jsonData.categories[key].cache) {
        filteredItems[key] = jsonData.categories[key];
      }
    }

    setTotalClaimed(claimedAmount);
    setEligibility(filteredItems);
    setCallData(jsonData.calldata);

     const isCheckEligibilityAllowed = Object.values(jsonData.categories).find((el) => !el.cache);

    if (Object.keys(filteredItems).length === activeEligibility.length && !isCheckEligibilityAllowed) {
      const isAbleToClaim = checkClaimAvailable(filteredItems);
      if (isAbleToClaim) {
        setShowClaimPage(true);
      } else {
        const showNotToday = Object.values(filteredItems).every(
          (el) => el.claimed || !el.amount
        );
        setShowNotTodayPage(showNotToday);
      }
    }
  };

  const handleEligibility = async () => {
    const response = await fetch(
      `${backendApi}${account}&check=true`
    );
    const jsonData = await response.json();

    setEligibility(jsonData.categories);
    setCallData(jsonData.calldata);

    const isAbleToClaim = checkClaimAvailable(jsonData.categories);
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

  const claimRewards = async () => {
    const provider = new AmbErrorProviderWeb3(window.ethereum);
    const signer = provider.getSigner();

    const tx = await signer
      .sendTransaction({
        to: contractAddress,
        data: callData,
      })

    setIsClaimLoading(true);

    provider.waitForTransaction(tx.hash)
      .then(() => {
        setIsSuccessClaim(true);
        setTotalClaimed(availableReward);
        setShowClaimPage(false)
      })
      .finally(() => setIsClaimLoading(false));
  };

  const stepStatusImg = useMemo(() => {
    if (!eligibility) {
      return {};
    }
    const imgs = {};

    Object.keys(eligibility).forEach((el) => {
      imgs[el] = eligibility[el].amount ? check : cross;
    });
    return imgs;
  }, [eligibility]);

  const availableReward = useMemo(() => {
    if (!eligibility) {
      return {};
    }
    return Object.values(eligibility)
      .filter((item) => !item.claimed)
      .reduce((acc, item) => acc + item.amount, 0);
  }, [eligibility]);

  const currentStepBlock = useMemo(() => {
    if (!account) {
      return <ConnectWallet loginMetamask={loginMetamask} />;
    } else if (showClaimPage) {
      return (
        <ClaimReward
          isClaimLoading={isClaimLoading}
          availableReward={availableReward}
          claimRewards={claimRewards}
        />
      );
    } else if (isSuccessClaim) {
      return <SuccessClaim />;
    } else if (showNotTodayPage) {
      const nextClaim = data['claim-item'].find((el) => !el['is-claim-active']);
      if (!nextClaim) {
        return <CheckEligibility handleEligibility={handleEligibility} />;
      }
      const nextClaimTimeRemaining = getTimeRemaining(
        nextClaim['claim-open-time']
      );

      return <NotToday nextClaimTimeRemaining={nextClaimTimeRemaining} />;
    } else {
      return <CheckEligibility handleEligibility={handleEligibility} />;
    }
  }, [account, showClaimPage, isSuccessClaim, showNotTodayPage, isClaimLoading]);

  return (
    <div className='claim-page'>
      <div className='container'>
        {(eligibility || !account) && (
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
              {currentStepBlock}
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
        )}
      </div>
    </div>
  );
};

export default Claim;
