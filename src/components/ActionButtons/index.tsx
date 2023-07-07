import { IconButton, Tooltip, useTheme } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

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
  const theme = useTheme();

  const onClickDelete = (e: any) => {
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

  const onClickEdit = (e: any) => {
    e.stopPropagation(); // Prevent onClick in the parent
    onEdit?.();
  };

  return (
    <>
      {!!onEdit && (
        <Tooltip
          data-testid="Edit"
          disableHoverListener={disableHoverListener}
          title="Edit"
          arrow
          onClick={onClickEdit}
        >
          <IconButton
            sx={{
              "&:hover": {
                background: theme.colors.primary.lighter,
              },
              color: theme.palette.primary.main,
            }}
            color="inherit"
            size="small"
          >
            <EditTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      {!!onDelete && (
        <Tooltip
          data-testid="Delete"
          disableHoverListener={disableHoverListener}
          title="Delete"
          arrow
          onClick={onClickDelete}
        >
          <IconButton
            sx={{
              "&:hover": { background: theme.colors.error.lighter },
              color: theme.palette.error.main,
            }}
            color="inherit"
            size="small"
          >
            <DeleteTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default ActionButtons;
