import Header from "@/components/Header";

type CheckoutHeaderProps = {
  title: string;
  backIconSize?: number;
  onBackPress?: () => void;
};

export default function CheckoutHeader({
  title,
  backIconSize = 24,
  onBackPress,
}: CheckoutHeaderProps) {
  return (
    <Header
      backIconSize={backIconSize}
      centerTitle
      onBackPress={onBackPress}
      showBack
      title={title}
    />
  );
}
