import { useEffect, useMemo, useState } from 'react';
import question from '../assets/question.svg';
import check from '../assets/claim-check.svg';
import cross from '../assets/claim-cross.svg';
import doublecheck from '../assets/doublecheck.svg';
import scroll from '../assets/claim-arrow.svg';
import { useWeb3React } from '@web3-react/core';
import { useAuthorization } from 'airdao-components-and-tools/hooks';
import ConnectWallet from '../components/Claim/ConnectWallet';
import CheckEligibility from '../components/Claim/CheckEligibility';
import ClaimReward from '../components/Claim/ClaimReward';
import SuccessClaim from '../components/Claim/SuccessClaim';
import NotToday from '../components/Claim/NotToday';
import { AmbErrorProviderWeb3 } from '@airdao/airdao-node-contracts';
import OhNo from '../components/Claim/OhNo';
import Awesome from '../components/Claim/Awesome';
import Giveaway from '../components/Claim/Giveaway';

const getTimeRemaining = (futureDate) => {
  const futureTime = new Date(futureDate).getTime();
  const currentTime = new Date().getTime();

  if (futureTime - currentTime < 0) {
    return '00 minutes';
  }
  let timeRemaining = Math.floor((futureTime - currentTime) / 1000);

  const days = Math.floor(timeRemaining / 86400);
  timeRemaining = timeRemaining % 86400;

  const hours = Math.floor(timeRemaining / 3600);
  timeRemaining = timeRemaining % 3600;

  const minutes = Math.floor(timeRemaining / 60);

  return `${days ? days + ' days ' : ''} ${
    hours < 10 ? '0' : ''
  }${hours} hours ${minutes < 10 ? '0' : ''}${minutes} minutes`;
};

const backendApi = 'https://airdrop-backend-api.ambrosus-test.io/';

const Claim = () => {
  const web3ReactInstance = useWeb3React();
  const { account } = web3ReactInstance;
  const { loginMetamask } = useAuthorization(web3ReactInstance);

  const [data, setData] = useState(null);
  const [eligibility, setEligibility] = useState(null);
  const [showClaimPage, setShowClaimPage] = useState(false);
  const [isSuccessClaim, setIsSuccessClaim] = useState(false);
  const [showNotTodayPage, setShowNotTodayPage] = useState(false);
  const [totalClaimed, setTotalClaimed] = useState(0);
  const [callData, setCallData] = useState('');
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const [contractAddress, setContractAddress] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [scrollUp, setScrollUp] = useState(false);

  useEffect(() => {
    getClaimCategories();

    const handleScroll = () => {
      setScrollUp(false);
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setScrollUp(true);
      }
    };
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!account) {
      setInitState();
    } else if (account && data) {
      checkPrevEligibility();
    }
  }, [account, data]);

  const getClaimCategories = async () => {
    const response = await fetch(`${backendApi}categories`);
    const categories = await response.json();

    let lastActiveIndex = 0;

    categories.forEach((el, i) => {
      if (el.key) {
        lastActiveIndex = i;
      }
    });
    setCurrentDay(
      `${(lastActiveIndex + 1) * 2 - 1} - ${(lastActiveIndex + 1) * 2}`
    );
    setData(categories);
  };

  const setInitState = () => {
    setShowNotTodayPage(false);
    setIsSuccessClaim(false);
    setShowClaimPage(false);
    setTotalClaimed(0);
    setEligibility(null);
  };

  const checkPrevEligibility = async () => {
    setInitState();

    const response = await fetch(`${backendApi}check?address=${account}`);
    const jsonData = await response.json();

    const activeEligibility = data.filter((el) => el.key);

    const filteredItems = {};
    let claimedAmount = 0;

    for (const key in jsonData.categories) {
      if (jsonData.categories[key].claimed) {
        claimedAmount += jsonData.categories[key].amount;
      }
      if (jsonData.categories[key].claimed || jsonData.categories[key].cache) {
        filteredItems[key] = jsonData.categories[key];
      }
    }

    setTotalClaimed(claimedAmount);
    setEligibility(filteredItems);
    setCallData(jsonData.calldata);
    setContractAddress(jsonData.contractAddress);

    const isCheckEligibilityAllowed = Object.values(jsonData.categories).find(
      (el) => !el.cache && !el.claimed
    );

    if (
      Object.keys(filteredItems).length === activeEligibility.length &&
      !isCheckEligibilityAllowed
    ) {
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
      `${backendApi}check?address=${account}&check=true`
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
      .sendTransaction({ to: contractAddress, data: callData })
      .then(() => setIsClaimLoading(true))
      .catch((e) => {
        if (e.message === 'Run out of tokens') {
          console.log(e.message)
        }
      });

    provider
      .waitForTransaction(tx.hash)
      .then(() => {
        setIsSuccessClaim(true);
        setTotalClaimed((state) => state + availableReward);
        setShowClaimPage(false);
      })
      .finally(() => setIsClaimLoading(false));
  };

  const stepStatusImg = useMemo(() => {
    if (!eligibility) {
      return {};
    }
    const imgs = {};

    Object.keys(eligibility).forEach((el) => {
      if (eligibility[el].claimed) {
        imgs[el] = doublecheck;
      } else {
        imgs[el] = eligibility[el].amount ? check : cross;
      }
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
          account={account}
        />
      );
    } else if (isSuccessClaim) {
      return <SuccessClaim />;
    } else if (showNotTodayPage) {
      const nextClaim = data.find((el) => !el.key);
      if (!nextClaim) {
        const isAnyClaimed = Object.values(eligibility).find((el) => el.claimed);

        return isAnyClaimed ? <Awesome /> : <OhNo />;
      }
      const nextClaimTimeRemaining = getTimeRemaining(nextClaim.timestamp);

      return <NotToday nextClaimTimeRemaining={nextClaimTimeRemaining} />;
    } else {
      return <CheckEligibility handleEligibility={handleEligibility} />;
    }
  }, [
    account,
    showClaimPage,
    isSuccessClaim,
    showNotTodayPage,
    isClaimLoading,
  ]);

  const scrollPage = () => {
    window.scrollTo(0, scrollUp ? 0 : document.body.scrollHeight);
  };

  return (
    <div className='claim-page'>
      <div className='container'>
        {(eligibility || !account) && (
          <div className='claim-wrapper content'>
            <div className='claim-top-wrapper'>
              <div className='claim-block'>
                <div className='claim-block__heading'>
                  <span className='claim-block__day'>Day {currentDay}</span>
                  {!!account &&
                    (totalClaimed ? (
                      <>
                        <span className='claim-block__claimed-text'>
                          Total AirBonds claimed:
                        </span>
                        <span className='claim-block__claimed'>
                          {totalClaimed}
                        </span>
                      </>
                    ) : (
                      <span className='claim-block__claimed-text'>
                        No AirBonds Claimed Yet
                      </span>
                    ))}
                </div>
                {currentStepBlock}
              </div>
              <ul className='claim-steps'>
                <span className='claim-steps__title'>Airdrop Timeline</span>
                {data &&
                  data.map((el, i) => (
                    <li
                      key={el.timestamp}
                      className={`claim-steps__item ${
                        !el.key ? 'claim-steps__item_disabled' : ''
                      }`}
                    >
                      <div className='claim-steps__item-status'>
                        <img
                          src={stepStatusImg[el.key] || question}
                          alt='question mark'
                        />
                        Day {((i + 1) * 2) - 1} - {(i + 1) * 2}
                      </div>

                      {el.label ||
                        `Will be opened in: ${getTimeRemaining(el.timestamp)}`}
                    </li>
                  ))}
              </ul>
            </div>
            <button onClick={scrollPage} className='claim-scroll' type='button'>
              <img
                src={scroll}
                alt='scroll button'
                className={scrollUp ? 'claim-scroll__img-rotate' : ''}
              />
            </button>
            <Giveaway />
          </div>
        )}
      </div>
    </div>
  );
};

export default Claim;
