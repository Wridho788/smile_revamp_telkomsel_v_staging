interface ModalProps {
  open: any;
  handleClose?: any;
  title?: string;
  description?: any;
}

interface IProgramDetailsModalProps extends ModalProps {
  roleAccess: boolean;
  data: any;
  isHqLogin: boolean;
}

interface IProgramFilterModalProps extends ModalProps {
  roleAccess: boolean;
  data: any;
  isHqLogin: boolean;
}

interface IKeywordDetailsModalProps extends ModalProps {
  roleAccess: boolean;
  data: any;
  isHqLogin?: boolean;
}

interface IPicManagemenrModalProps extends ModalProps {
  handleResfresh?: any;
}

export type {
  ModalProps,
  IProgramDetailsModalProps,
  IProgramFilterModalProps,
  IKeywordDetailsModalProps,
  IPicManagemenrModalProps,
};
