/* eslint-disable import/no-duplicates */
import 'react-native-gesture-handler'

import { StatusBar } from 'react-native'

import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'

import { Loading } from './src/components/Loading'
import { Routes } from './src/routes'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App () {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Routes />
    </GestureHandlerRootView>
  )
}
