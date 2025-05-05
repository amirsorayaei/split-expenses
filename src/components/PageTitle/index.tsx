import { FC } from "react";
import { Button } from "@/components/ui/button";

interface PageTitleProps {
  heading?: string;
  subHeading?: string;
  buttonTitle?: string;
  onClickButton?(): void;
}

const PageTitle: FC<PageTitleProps> = ({
  heading,
  subHeading,
  buttonTitle,
  onClickButton,
}) => {
  return (
    <div className="mb-6 flex flex-col gap-2">
      {heading && (
        <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
      )}
      {subHeading && <p className="text-muted-foreground">{subHeading}</p>}
      {buttonTitle && onClickButton && (
        <div className="mt-4">
          <Button onClick={onClickButton}>{buttonTitle}</Button>
        </div>
      )}
    </div>
  );
};

export default PageTitle;
