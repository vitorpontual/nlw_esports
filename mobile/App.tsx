import { StatusBar } from "react-native";
import * as Notifications from 'expo-notifications';

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter'
import { Subscription } from 'expo-modules-core'

import { Routes } from './src/routes';
import { Background } from "./src/components/Background";
import { Loading } from "./src/components/Loading";
import { useEffect, useRef } from "react";
import { getPushNotificationToken } from "./src/service/getPushNotificationToken";



export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListiner = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  }, [])

  useEffect(() => {
    getNotificationListener.current = Notifications
      .addNotificationReceivedListener(notification => {
        console.log(notification)
      })

      responseNotificationListiner.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response)
      })

      return () => {
        if(getNotificationListener.current && responseNotificationListiner.current) {
          Notifications.removeNotificationSubscription(getNotificationListener.current);
          Notifications.removeNotificationSubscription(responseNotificationListiner.current);

        }
      }
  },[])

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}

