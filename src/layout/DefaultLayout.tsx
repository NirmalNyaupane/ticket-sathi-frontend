"use client";
import { AUTH_COOKIE_NAME } from "@/constants";
import { loginReducer } from "@/redux/slices/auth.slice";
import { addUser } from '@/redux/slices/user.slice';
import { RootState } from "@/redux/store";
import { getCurrentUserApi } from "@/services/user.service";
import { getCookie } from "@/utils/cookie";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const [jwt, setJwt] = useState(getCookie(AUTH_COOKIE_NAME as string) ?? "");
  //selector
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth!);
 
  //react query for fetching data
  const { mutate } = useMutation({
    mutationFn: () => {
      return getCurrentUserApi();
    },
    onSuccess: (data) => {
      dispatch(
        loginReducer({
          is_organizer_registered: data.data.data.is_organizer_registered,
          is_verified: data.data.data.is_verified,
          role: data.data.data.role,
          id: data.data.data.id,
          access_token: jwt,
        })
      );
      dispatch(addUser(data.data.data));
    },
  });

  //fetched user data
  const fetchUser = () => {
    const jwt = getCookie(AUTH_COOKIE_NAME as string);
    if (jwt) {
      setJwt(jwt);
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      mutate();
    } else {
      axios.defaults.headers.common["Authorization"] = null;
    }
  };

  useEffect(() => {
    fetchUser();
  }, [auth]);

  return <main>{children}</main>;
};

export default DefaultLayout;
