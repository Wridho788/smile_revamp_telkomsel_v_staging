interface ModalProps {
  open: any;
  handleClose?: any;
  title?: string;
  description?: any;
}

interface IProgramDetailsModalProps extends ModalProps {
  roleAccess: boolean;
  data: any;
}

interface IKeywordDetailsModalProps extends ModalProps {
  roleAccess?: boolean;
  data: any;
}

export type {
  ModalProps,
  IProgramDetailsModalProps,
  IKeywordDetailsModalProps,
};
