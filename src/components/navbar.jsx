import { List, User, Trophy, UsersThree } from '@phosphor-icons/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [isHamburguerOpen, setIsHamburguerOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const logo = 'https://i.ibb.co/4Pp6y2D/logo-HMP.png';

  const token = localStorage.getItem('authToken');

  const handleOpenMenu = () => {
    setIsHamburguerOpen(true);
    setTimeout(() => {
      setIsMenuVisible(true);
    }, 0);
  };

  // This navbar is English-only. Language switching removed.

  const handleCloseMenu = () => {
    setIsMenuVisible(false);
    setTimeout(() => {
      setIsHamburguerOpen(false);
    }, 50);
  };

  return (
    <>
      <nav className="from-fontyssPurple to-mauaBlue fixed top-0 left-0 z-50 my-[2vh] ml-6 flex h-[96vh] w-[5vw] flex-col items-center justify-between rounded-xl bg-white bg-gradient-to-b py-14 text-2xl font-light shadow-lg max-lg:hidden">
        {/* Hamburguer for expanding */}
        <div
          className={`group flex w-full flex-col items-center justify-center transition-transform duration-300 hover:scale-110 hover:cursor-pointer`}
        >
          <div className="bg-coolWhite mb-2 h-1 w-1/2 rounded-lg group-hover:bg-gray-300"></div>
          <div className="bg-coolWhite mb-2 h-1 w-1/2 rounded-lg group-hover:bg-gray-300"></div>
          <div className="bg-coolWhite h-1 w-1/2 rounded-lg group-hover:bg-gray-300"></div>
        </div>
        <ul className="flex grow flex-col items-center justify-center gap-4">
          <li
            className={`duration-200 ${true ? 'hover:text-mauaBlue text-mauaBlue bg-white' : 'bg-transparent text-white hover:text-gray-200'} flex h-14 w-14 items-center justify-center rounded-xl hover:scale-110 hover:cursor-pointer`}
            onClick={() => {
              navigate('/login');
              scrollTo(0, 0);
            }}
          >
            <UsersThree size={32} />
          </li>
          <li
            className={`duration-200 ${false ? 'hover:text-mauaBlue text-mauaBlue bg-white' : 'bg-transparent text-white hover:text-gray-200'} flex h-14 w-14 items-center justify-center rounded-xl hover:scale-110 hover:cursor-pointer`}
            // onClick={() => {
            //   navigate('/');
            //   scrollTo(0, 0);
            // }}
          >
            <Trophy size={32} />
          </li>
          {token && (
            <li
              className={`duration-200 ${false ? 'hover:text-mauaBlue text-mauaBlue bg-white' : 'bg-transparent text-white hover:text-gray-200'} flex h-14 w-14 items-center justify-center rounded-xl hover:scale-110 hover:cursor-pointer`}
              // onClick={() => {
              //   navigate('/');
              //   scrollTo(0, 0);
              // }}
            >
              <User size={32} />
            </li>
          )}
        </ul>
      </nav>
      {/* RESPONSIVENESS */}
      {/* <nav className="fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-between bg-white px-4 pr-8 text-2xl shadow-md lg:hidden">
        <img src={logo} alt="" />
        <div className="hover:cursor-pointer" onClick={handleOpenMenu}>
          <List size={32} />
        </div>
        {isHamburguerOpen && (
          <div
            className={`absolute top-0 left-0 flex h-[100vh] w-[100vw] backdrop-blur-md transition-all duration-100 ${isMenuVisible ? 'opacity-100' : 'opacity-0'} flex-col gap-5 bg-gray-500/50`}
            onClick={handleCloseMenu}
          >
            <div
              className={`absolute top-0 left-full flex h-[100vh] w-[50vw] flex-col items-center justify-between gap-5 bg-white py-10 transition-transform duration-100 ${isMenuVisible ? '-translate-x-full' : 'translate-x-0'}`}
            >
              <ul className="text-oceanGreen flex flex-col justify-center gap-10 text-center text-2xl font-thin">
                <li
                  className={`delay-100 duration-300 hover:cursor-pointer hover:text-gray-200 ${isMenuVisible ? 'translate-x-0' : 'translate-x-[100vw]'}`}
                  onClick={() => {
                    navigate('/');
                    scrollTo(0, 0);
                  }}
                >
                  Home
                </li>
                <li
                  className={`delay-100 duration-300 hover:cursor-pointer hover:text-gray-200 ${isMenuVisible ? 'translate-x-0' : 'translate-x-[100vw]'}`}
                  onClick={() => {
                    navigate('/login');
                    scrollTo(0, 0);
                  }}
                >
                  Login
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav> */}
    </>
  );
}
