import { Text, View } from 'react-native'

import { LevelBars } from '../LevelBars'

import { styles } from './styles'

export interface HistoryProps {
  id: string
  title: string
  points: number
  questions: number
  level: number
}

interface Props {
  data: HistoryProps
}

export function HistoryCard ({ data }: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          {data.title}
        </Text>

        <Text style={styles.subtitle}>
          Você acertou {data.points} de {data.questions}
        </Text>
      </View>

      <LevelBars level={data.level} />
    </View>
  )
}
