"use client";

import { Component } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {}

interface State {
  open: boolean;
  title: string;
  message: string;
  onClickConfirm?(): void;
  onClickCancel?(): void;
  color?: "primary" | "error";
}

export interface DialogProps {
  title: string;
  message: string;
  onClickConfirm?(): void;
  onClickCancel?(): void;
  color?: "primary" | "error";
}

class DialogAlert extends Component<Props, State> {
  static instance: DialogAlert | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
      title: "",
      message: "",
    };
  }

  componentDidMount() {
    DialogAlert.instance = this;
  }

  componentWillUnmount() {
    DialogAlert.instance = null;
  }

  static showDialog(props: DialogProps) {
    DialogAlert.instance?.setState({
      open: true,
      ...props,
    });
  }

  static closeDialog() {
    DialogAlert.instance?.setState({
      open: false,
    });
  }

  render() {
    const { open, title, message, onClickConfirm, onClickCancel, color } =
      this.state;

    return (
      <Dialog
        open={open}
        onOpenChange={(open) => !open && this.setState({ open })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                onClickCancel?.();
                this.setState({ open: false });
              }}
            >
              Cancel
            </Button>
            <Button
              variant={color === "error" ? "destructive" : "default"}
              onClick={() => {
                onClickConfirm?.();
                this.setState({ open: false });
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
}

export default DialogAlert;
