import React from 'react';
import Currency from '../UI/Currency';
import TextOpacity from '../UI/TextOpacity';

interface IProps {
  title: string;
  count: React.ReactNode;
  price: number;
}

const BuyMenuHeader = (props: IProps) => {
  return (
    <div className='flex justify-between py-2'>
      <h1 className='text-2xl'>{props.title}</h1>
      <TextOpacity>
        {props.count}, <Currency>{props.price}</Currency>
      </TextOpacity>
    </div>
  );
};

export default BuyMenuHeader;
