import {
  getDetailUser,
  getMyLikeRecepi,
  getMyRecepi,
  getMySaveRecepi,
} from "@/redux/features/userSlice";
import { useStore } from "@/redux/store";
import "@/styles/globals.css";
import { getCookie } from "@/utils/cookie";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Init />
      <Component {...pageProps} />
    </Provider>
  );
}

function Init() {
  const dispatch = useDispatch();

  useEffect(() => {
    const { token } = getCookie();
    if (token) {
      dispatch(getDetailUser());
      dispatch(getMyLikeRecepi());
      dispatch(getMySaveRecepi());
      dispatch(getMyRecepi());
    }
  }, [dispatch]);

  return null;
}

export default MyApp;
