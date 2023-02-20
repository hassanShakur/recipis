import React from 'react';

import { useDispatch } from 'react-redux';
import {
  MdOutlineLightMode,
  MdOutlineDarkMode,
} from 'react-icons/md';

import { themeActions } from '../../store/theme-slice';

const Themer = () => {
  const dispatch = useDispatch();
  const handleThemeChange = () => {
    dispatch(themeActions.toggle());
  };

  return (
    <button
      type='button'
      className='themer'
      title='Toggle theme'
      onClick={handleThemeChange}
    >
      <MdOutlineDarkMode className='dark-icon' />
      <MdOutlineLightMode className='light-icon' />
      <span></span>
    </button>
  );
};

export default Themer;
