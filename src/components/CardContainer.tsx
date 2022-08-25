import { ReactNode } from "react";

export default function CardContainer({children}: {children: ReactNode}){
  return(
    <div className='flex gap-3 flex-wrap mt-[10px]'>
      {children}
    </div>
  )
}