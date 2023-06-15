import { HouseLine, Trash } from 'phosphor-react-native'
import { useEffect, useState } from 'react'
import { Alert, Pressable, ScrollView, View } from 'react-native'
import Animated, { Layout } from 'react-native-reanimated'

import { useNavigation } from '@react-navigation/native'

import { Header } from '../../components/Header'
import { HistoryCard, HistoryProps } from '../../components/HistoryCard'
import { Loading } from '../../components/Loading'
import { historyGetAll, historyRemove } from '../../storage/quizHistoryStorage'
import { styles } from './styles'
import { Swipeable } from 'react-native-gesture-handler'
import { THEME } from '../../styles/theme'

export function History () {
  const [isLoading, setIsLoading] = useState(true)
  const [history, setHistory] = useState<HistoryProps[]>([])

  const { goBack } = useNavigation()

  async function fetchHistory () {
    const response = await historyGetAll()
    setHistory(response)
    setIsLoading(false)
  }

  async function remove (id: string) {
    await historyRemove(id)

    fetchHistory()
  }

  function handleRemove (id: string) {
    Alert.alert('Remover', 'Deseja remover esse registro?', [
      {
        text: 'Sim',
        onPress: async () => {
          await remove(id)
        }
      },
      { text: 'Não', style: 'cancel' }
    ])
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <Header
        title='Histórico'
        subtitle={`Seu histórico de estudos${'\n'}realizados`}
        icon={HouseLine}
        onPress={goBack}
      />

      <ScrollView
        contentContainerStyle={styles.history}
        showsVerticalScrollIndicator={false}
      >
        {history.map((item) => (
          <Animated.View key={item.id} layout={Layout.springify()}>
            <Swipeable
              containerStyle={styles.swipeableContainer}
              overshootLeft={false}
              renderLeftActions={() => (
                <Pressable
                  onPress={() => { handleRemove(item.id) }}
                  style={styles.swipeableRemove}
                >
                  <Trash size={32} color={THEME.COLORS.GREY_100} />
                </Pressable>
              )}
            >
              <HistoryCard data={item} />
            </Swipeable>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  )
}
