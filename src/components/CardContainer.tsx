export default function CardContainer({children}){
  return(
    <div className='flex gap-3 flex-wrap mt-[10px]'>
      {children}
    </div>
  )
}