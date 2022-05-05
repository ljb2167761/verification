import React, {
  FC,
  ReactElement,
  useState,
  useCallback,
  useEffect,
} from "react";
import { verification } from "../utils/public";
import "./index.scss";

interface Iprops {
  info: any;
  loading: Boolean;
}
const Info: FC<Iprops> = (props: Iprops): ReactElement => {
  const { info, loading } = props;
  return info?.qq || loading ? (
    <div className={`infoBox ${(loading && "loading") || ""}`}>
      <div className="imgBox">
        <img src={info.qlogo} alt="头像" />
      </div>
      <div>
        <p>姓名：{info.name}</p>
        <p>QQ：{info.qq}</p>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Info;
