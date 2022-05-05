import { useState, useEffect } from "react";
import "./index.scss";

let timer:any
export default function MessageWraper(params: any) {
  const { data } = params;
  // 提示列表
  const [list, setlist] = useState<any>([]);
  useEffect(() => {
    return () => {
      //有就清空
      if (timer as Function) {
        clearTimeout(timer);
      }
    };
  }, []);
  useEffect(() => {
    if (data.type) {
      // 提示信息存到列表
      let newList = JSON.parse(JSON.stringify(list))
      newList.push(data);
      setlist(newList);
    }
  }, [data]);
  useEffect(() => {
    if (list.length > 0) {
      // 提示信息停留1秒
      if(timer){
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        let newList =
          list.filter((item: any, index: number) => index != 0) || [];
        setlist(newList);
      }, 1000);
    }
  }, [list]);
  return (
    <div className={`messageBox ${list.length > 0 ? "show" : ""}`}>
      {list &&
        list.length > 0 &&
        list.map((item: any, index: Number) => {
          return (
            <div key={`${index}`} className={`${item.type}`}>
              {item.value}
            </div>
          );
        })}
    </div>
  );
}
