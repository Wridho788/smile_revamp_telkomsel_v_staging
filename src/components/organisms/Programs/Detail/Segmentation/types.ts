
export interface SegmentationProps {
    programId:string,
    children?: React.ReactNode;
}
export interface ListProps extends SegmentationProps{
    programId:string,
    type : string,
}
