
interface PaginationProps {
    page: any;
    totalPages: string | number;
    setPage: any;

 }

export   function Pagination({page, totalPages,setPage}:PaginationProps) {
    const onLeftClickHandler = () =>{
        if(page>0){
          setPage(page-1)
        }
      }
      const onRightClickHandler = () =>{
        if(page+1 !== totalPages){
          setPage(page+1)
        }
      }

    return (
        <div className='flex items-center'>
          <button className='mr-2 border-2 px-2' onClick={onLeftClickHandler}><div>◀</div></button>
          <div>{page} de {totalPages}</div>
            <button className='ml-2 border-2 px-2' onClick={onRightClickHandler}><div>▶</div></button>
        </div>
    );
};

export default Pagination;