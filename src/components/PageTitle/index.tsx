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
    <div className="mb-6 flex justify-between items-center gap-2">
      <div>
        {heading && (
          <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
        )}
        {subHeading && <p className="text-muted-foreground">{subHeading}</p>}
      </div>
      {buttonTitle && onClickButton && (
        <div className="mt-4">
          <Button
            className="w-full bg-[#10B981] hover:bg-[#059669] text-white h-12 text-base"
            onClick={onClickButton}
          >
            {buttonTitle}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PageTitle;
