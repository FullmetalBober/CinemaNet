interface IProps {
  children: React.ReactNode;
}

const Currency = ({ children }: IProps) => {
  return (
    <>
      <small>$</small>
      {children}
    </>
  );
};

export default Currency;
