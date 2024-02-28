const ButtonLinkFb = ({ link, title }) => {
  return (
    <a
      href={link}
      target='_blank'
      rel='noreferrer'
      className='items-center flex justify-center px-4 py-2.5 overflow-hidden text-sm text-white transition-colors duration-300 bg-blue-600 rounded-lg shadow w-auto sm:mx-2 sm:mt-0 hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80 z-[10]'
    >
      <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-brand-facebook-filled' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M18 2a1 1 0 0 1 .993 .883l.007 .117v4a1 1 0 0 1 -.883 .993l-.117 .007h-3v1h3a1 1 0 0 1 .991 1.131l-.02 .112l-1 4a1 1 0 0 1 -.858 .75l-.113 .007h-2v6a1 1 0 0 1 -.883 .993l-.117 .007h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-6h-2a1 1 0 0 1 -.993 -.883l-.007 -.117v-4a1 1 0 0 1 .883 -.993l.117 -.007h2v-1a6 6 0 0 1 5.775 -5.996l.225 -.004h3z' strokeWidth='0' fill='currentColor' /></svg>
      <span className='mx-2'>
        {title}
      </span>
    </a>
  );
}

export default ButtonLinkFb;
