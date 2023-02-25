import { Skeleton } from '@mui/material';
import React from 'react';

const CustomSkeleton = (props) => {
  return (
    <Skeleton
      variant={props.variant || 'rounded'}
      width={props.width || '100%'}
      height={props.height || '100%'}
      animation='wave'
      sx={{ bgcolor: 'var(--section-back)' }}
    ></Skeleton>
  );
};

export default CustomSkeleton;
