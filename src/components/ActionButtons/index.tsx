import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Pencil, Trash2 } from "lucide-react";

import DialogAlert, { DialogProps } from "../DialogAlert";

interface Props {
  onDelete?(): void;
  onEdit?(): void;
  disableHoverListener?: boolean;
  dialogSettings: DialogProps;
}

const ActionButtons = ({
  onDelete,
  onEdit,
  disableHoverListener = false,
  dialogSettings,
}: Props) => {
  const onClickDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent onClick in the parent

    DialogAlert.showDialog({
      ...dialogSettings,
      onClickConfirm: () => {
        onDelete?.();
        DialogAlert.closeDialog();
      },
      color: "error",
    });
  };

  const onClickEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent onClick in the parent
    onEdit?.();
  };

  return (
    <TooltipProvider>
      <div className="flex items-center space-x-2">
        {!!onEdit && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClickEdit}
                data-testid="Edit"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
        )}
        {!!onDelete && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClickDelete}
                data-testid="Delete"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};

export default ActionButtons;
