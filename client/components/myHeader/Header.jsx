import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/shapley_logo.png';

const Header = () => {
    return (
        <div id='header' className='flex flex-row justify-evenly items-center p-5 border-b-2 bg-slate-50'>
          <Image src={logo} width={200} height={100}/>
          <div id='links' className='flex flex-row justify-around gap-8 items-center'>
            <Link href={"/"}> Home </Link>
            <Link href={"/value_calculation"}> Calculator </Link>
          </div>
        </div>
    );
};

export default Header;
