import React, {
  FC,
  ReactElement,
  useState,
  useCallback,
  useEffect,
} from "react";
import { verification } from "../utils/public";
import { getQqInfo } from "../api/api";
import Info from "../components/Info";
import MessageWraper from "../components/Message";
import { IMessage } from "../utils/message";
import "./index.scss";

let timer: any = false;
const Home: FC = (): ReactElement => {
  const [loading, setLoading] = useState(false); //loading状态
  const [value, setValue] = useState(""); //输入qq号
  const [info, setInfo] = useState<any>({}); //qq信息
  const [messageInfo, setMessageInfo] = useState<IMessage>({}); //错误信息
  useEffect(() => {
    return () => {
      //有就清空
      if (timer as Function) {
        clearTimeout(timer);
      }
    };
  }, []);
  // 改变输入
  const onHandleChange = useCallback(
    (e: any) => {
      if (timer as Function) {
        clearTimeout(timer);
      }
      e.preventDefault();
      let value = e.target.value.trim();
      setValue(value);
      if (value === "") {
        return;
      }
      // 验证qq号格式
      const status = verification(value);
      timer = setTimeout(() => {
        if (!status) {
          clearTimeout(timer);
          setMessageInfo({ type: "warning", value: "请输入正确格式的QQ号码" });
          return;
        }
        queryQqInfo();
      }, 500);
    },
    [value]
  );
  // 获取qq信息
  const queryQqInfo = () => {
    setLoading(true);
    getQqInfo(value).then((res: any) => {
      if (res.code === "1") {
        setInfo(res);
      } else {
        setInfo({});
        setMessageInfo({ type: "error", value: res.msg || "服务器出错！" });
      }
      setLoading(false);
    });
  };

  return (
    <div className="content">
      <div className="searchBox">
        <input
          placeholder="请输入您的QQ号"
          value={value}
          onChange={(e: any) => onHandleChange(e)}
        />
      </div>
      <Info info={info} loading={loading} />
      <MessageWraper data={messageInfo} />
    </div>
  );
};

export default Home;
