interface WalletBalance {
  currency: string;
  amount: number;
}

interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { ...rest } = props;

  const balances = useWalletBalances();

  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances: WalletBalance[] = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority: number = getPriority(balance.currency);
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority: number = getPriority(lhs.currency);
        const rightPriority: number = getPriority(rhs.currency);
        return rightPriority - leftPriority;
      });
  }, [balances]);

  const formattedBalances: FormattedWalletBalance[] = sortedBalances.map(
    (balance: WalletBalance) => {
      // not provided type for formatted balances => :FormattedWalletBalance[]
      return {
        ...balance,
        formatted: balance.amount.toFixed(2),
      };
    }
  );

  return (
    <div {...rest}>
      {sortedBalances.map((balance: WalletBalance) => {
        const formattedBalance: FormattedWalletBalance = {
          ...balance,
          formatted: balance.amount.toFixed(2),
        };
        return (
          <WalletRow
            key={balance.currency}
            amount={formattedBalance.amount}
            usdValue={prices[balance.currency] * formattedBalance.amount}
            formattedAmount={formattedBalance.formatted}
          />
        );
      })}
    </div>
  );
};
