import { MainHeader } from "../../components/common/MainHeader";
import Category from '../../components/books/Category.jsx';
import {useRouter} from 'next/router'

export default function Book() {
  return (
    <div className="">
      <MainHeader title="Future Talent Academy : Books" />
      <div className="flex flex-col">
        <Category />
      </div>
    </div>
  );
}
