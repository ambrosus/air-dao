import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CurrencyInput = ({
  disabled = false,
  value = '',
  onChange = () => {},
  selectedCoin = {},
  isValueInvalid = false,
  onBlur = () => {},
  className = '',
  balance = '',
}) => {
  const [timer, setTimer] = useState();

  const handleInput = ({ target: { value: newValue } }) => {
    const formattedValue = newValue.replace(',', '.');
    if (/^\d*(\.\d{0,6})?$/.test(formattedValue) || formattedValue === '') {
      onChange(formattedValue);

      if (timer) clearTimeout(timer);
      setTimer(setTimeout(onBlur, 1000, formattedValue));
    }
  };

  const handleKeyPress = (e) => {
    // discard all symbols except listed in regex
    if (!/(1|2|3|4|5|6|7|8|9|0|,|\.)/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div
      className={`currency-input
       ${className}
       ${disabled ? 'currency-input_receive' : ''}
       ${isValueInvalid ? 'currency-input_invalid' : ''}
       ${value.length > 12 ? 'currency-input_too-long' : ''}
       `}
    >
      <label className='currency-input__label'>
        {disabled ? 'Receive:' : 'Send:'}
      </label>
      <div className='currency-input__balance'>Balance: {balance}</div>
      <input
        type='text'
        placeholder='0.0'
        value={value}
        className='currency-input__input'
        onChange={handleInput}
        onKeyPress={handleKeyPress}
        readOnly={disabled}
      />
      <button type='button' className='currency-input__coin-button'>
        <img
          src={selectedCoin.icon}
          className='currency-input__currency-icon'
        />
        {selectedCoin.symbol}
      </button>
    </div>
  );
};

CurrencyInput.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  selectedCoin: PropTypes.object,
  isValueInvalid: PropTypes.bool,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  balance: PropTypes.string,
};

export default CurrencyInput;
