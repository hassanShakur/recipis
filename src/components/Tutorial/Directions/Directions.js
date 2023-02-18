import React from 'react';
import Step from './Step';

import _ from 'lodash';

const Directions = () => {
  return (
    <div className='directions'>
      <h2>Directions</h2>
      <div className='steps'>
        {_.range(6).map((_, id) => {
          return <Step key={id} />;
        })}
      </div>

      <div className='btns'>
        <button type='button'>prev</button>
        <button type='button'>next</button>
      </div>
    </div>
  );
};

export default Directions;
