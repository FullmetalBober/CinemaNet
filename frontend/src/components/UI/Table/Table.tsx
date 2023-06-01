import { Children, useMemo, useState } from 'react';

export type TableHeader = {
  name: string;
  type?: 'date' | 'number' | 'string' | 'none';
};

interface IProps {
  headers: TableHeader[];
  children: React.ReactNode;
}

const Table = (props: IProps) => {
  const [sortedField, setSortedField] = useState<
    { key: number; type?: string } | undefined
  >(undefined);
  const [sortedDirection, setSortedDirection] = useState<'asc' | 'desc'>('asc');

  const sortedChildren = useMemo(() => {
    const childrenArray = Children.toArray(props.children);
    if (sortedField && sortedField.type !== 'none') {
      return childrenArray.sort((a: any, b: any) => {
        let aField =
          a.props.children[sortedField.key].props['data-order'] ||
          a.props.children[sortedField.key].props['dataOrder'] ||
          a.props.children[sortedField.key].props.children;
        let bField =
          b.props.children[sortedField.key].props['data-order'] ||
          b.props.children[sortedField.key].props['dataOrder'] ||
          b.props.children[sortedField.key].props.children;

        if (sortedField.type === 'date') {
          aField = new Date(aField).getTime();
          bField = new Date(bField).getTime();
        } else if (sortedField.type === 'number') {
          aField = +aField;
          bField = +bField;
        } else {
          aField = aField.toLowerCase();
          bField = bField.toLowerCase();
        }

        let result = 0;
        if (aField < bField) result = 1;
        else if (aField > bField) result = -1;
        if (sortedDirection === 'asc') return result * -1;
        return result;
      });
    }
    return childrenArray;
  }, [props.children, sortedField?.key, sortedDirection]);

  return (
    <table className='w-full rounded text-left text-white/50 child:border-b child:border-white/10'>
      <thead className='bg-stone-800'>
        <tr>
          {props.headers.map((header, index) => (
            <th
              key={header.name}
              onClick={() => {
                if (sortedField?.key === index)
                  setSortedDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
                else {
                  setSortedField({ key: index, type: header.type });
                  setSortedDirection('asc');
                }
              }}
              className={`cursor-pointer px-3 py-2 transition ${
                sortedField?.key === index
                  ? 'bg-stone-700 text-white/80'
                  : 'bg-stone-800 hover:bg-stone-700'
              }`}
            >
              {header.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='bg-stone-900 child:border-b child:border-white/10 child:child:px-3 child:child:py-2 hover:child:bg-white/10'>
        {sortedChildren}
      </tbody>
    </table>
  );
};

export default Table;
