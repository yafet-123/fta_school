import { MainHeader } from "../../components/common/MainHeader";
import Grade from '../../components/practice/Grade.jsx';
import {useRouter} from 'next/router'

export default function Book() {
  return (
    <div className="">
      <MainHeader title="Future Talent Academy : Books" />
      <div className="flex flex-col">
        <Grade />
      </div>
    </div>
  );
}
