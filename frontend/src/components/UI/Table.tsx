interface IProps {
  headers: string[];
  children: React.ReactNode;
}

const Table = (props: IProps) => {
  return (
    <table className='w-full rounded text-left text-white/50 child:border-b child:border-white/10'>
      <thead className='bg-stone-800'>
        <tr className='child:cursor-pointer child:px-3 child:py-2'>
          {props.headers.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className='bg-stone-900 child:border-b child:border-white/10 child:child:px-3 child:child:py-2'>
        {props.children}
      </tbody>
    </table>
  );
};

export default Table;
