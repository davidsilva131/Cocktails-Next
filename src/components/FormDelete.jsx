const FormDelete = () => {
  return (
    <form id='form'>
      <div className='flex flex-col'>
        <span>Está seguro de que quiere eliminar esta bebida?</span>
        <span><strong>Esta acción es irrevesible!!!</strong></span>
      </div>
    </form>
  )
}

export default FormDelete
