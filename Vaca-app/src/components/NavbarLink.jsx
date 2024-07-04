import React from 'react'

export default function NavbarLink({ pathname, path, text }){
  return (
    <Link
      className="lg:outline-none lg:hover:underline lg:focus:underline lg:active:underline relative flex justify-center"
      to={path}
    >
      {text}
      <TriangleUp visible={pathname.includes(path)} />
    </Link>
  );
};

const TriangleUp = ({ visible }) => {
  return (
    <div
      className={`${
        visible ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-500 w-0 h-0 absolute bottom-[-16px] sm:bottom-[-19px]
    border-l-[8px] border-l-transparent
    border-b-[8px] border-b-white
    border-r-[8px] border-r-transparent`}
    ></div>
  );
};

TriangleUp.propTypes = {
  hideOnMobile: PropTypes.bool,
  visible: PropTypes.bool,
};
