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
	userLoginId: string;
	refetchProgram?: () => void;
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
	userLoginId:string;
}

interface IPicManagemenrModalProps extends ModalProps {
	handleResfresh?: any;
}

export type {
	ModalProps,
	IProgramDetailsModalProps,
	IProgramFilterModalProps,
	IKeywordDetailsModalProps,
	IPicManagemenrModalProps
};
