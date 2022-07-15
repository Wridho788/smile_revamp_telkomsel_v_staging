import * as React from 'react';
import {Label, Card} from '../../../components'
import {Button} from "@mui/material";

interface MainCardProps {
    label: string
    title:string
    description:string
}
const Index: React.FC<MainCardProps> = ({label, title, description} : MainCardProps) => {
  return(
        <>
            <Label label={label} />
            <Card title={title} description={description} />
            <Button variant="contained" color="warning">Hello World</Button>
        </>
  )
}
export default Index