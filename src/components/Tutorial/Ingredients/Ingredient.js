import React from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import CustomSkeleton from '../../UI/CustomSkeleton';

const Ingredient = ({ ingredient, isLoading }) => {
  if (ingredient) {
    const name = ingredient?.original;
    return isLoading ? (
      <CustomSkeleton />
    ) : (
      <li>
        <FiCheckSquare /> {name}
      </li>
    );
  }
};

export default Ingredient;
