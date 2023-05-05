import { ethers } from 'ethers';
import { createFactoryContract } from '../../../contracts';
import { useEffect, useMemo, useState } from 'react';
import provider from '../../../services/provider';
import useSwapActions from '../../BondExchange/hooks/useSwapActions';
import Decimal from 'decimal.js-light';

const {
  REACT_APP_AIR_BOND_ADDRESS: airBondAddress,
  REACT_APP_SAMB_ADDRESS: sambAddress,
} = process.env;

export default function usePoolInfo() {
  const [data, setData] = useState({});

  const POOL_ABI = [
    'function getReserves() view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast)',
    'function balanceOf(address owner) view returns (uint256)',
  ];

  // const router = useMemo(createRouterContract, []);
  const factory = useMemo(createFactoryContract, []);

  const { getAmountsOut } = useSwapActions();

  const getPoolInfo = async () => {
    const poolAddress = await factory.getPair(airBondAddress, sambAddress);
    const pool = new ethers.Contract(poolAddress, POOL_ABI, provider);

    const reserves = await pool.getReserves();

    const sambReserve = ethers.utils.formatEther(reserves[0]);
    const bondReserve = ethers.utils.formatEther(reserves[1]);
    const lastUpdated = new Date(reserves[2] * 1000).toString();

    const bnBondPerOneAmber = await getAmountsOut('1', ['SAMB', 'BOND']);
    const bnAmberPerOneBond = await getAmountsOut('1', ['BOND', 'SAMB']);

    const bondPerOneAmber = ethers.utils.formatEther(bnBondPerOneAmber);
    const amberPerOneBond = ethers.utils.formatEther(bnAmberPerOneBond);

    const dSambReserve = new Decimal(sambReserve);
    const dAirBondReserve = new Decimal(bondReserve);

    const desiredAmbPerOneBond = 1.2;

    const groupOne = dAirBondReserve
      .mul(desiredAmbPerOneBond)
      .minus(dSambReserve);
    const groupTwo = dSambReserve.mul(groupOne);
    const groupThree = dSambReserve.plus(
      dAirBondReserve.mul(desiredAmbPerOneBond)
    );
    const requiredAmb = groupTwo.div(groupThree);

    setData({
      'Pool address': poolAddress,
      'Amount of AMB in the pool': sambReserve,
      'Amount of BOND in the pool': bondReserve,
      'Amount of BONDs per 1 AMB': bondPerOneAmber,
      'Amount of AMBs per 1 BOND': amberPerOneBond,
      'Last updated': lastUpdated,
      requiredAmb: requiredAmb.toString(),
    });
  };

  useEffect(() => {
    getPoolInfo();
    provider.on('block', getPoolInfo);
    return () => provider.off('block', getPoolInfo);
  }, []);

  return data;
}
