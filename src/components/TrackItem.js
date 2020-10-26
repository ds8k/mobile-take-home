import React, { useMemo } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Surface, TouchableRipple } from 'react-native-paper'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    marginBottom: 20,
    marginHorizontal: 24,
    backgroundColor: '#6a1c29',
    borderRadius: 15,
    elevation: 5,
  },
  trackContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  trackImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
    margin: 10,
  },
  trackInfo: {
    paddingLeft: 15,
    justifyContent: 'center',
  },
})

export const TrackItemInfo = ({ imageUrl, album, artist, track, textColor = 'white' }) =>
  useMemo(
    () => (
      <View style={styles.trackContainer}>
        <Image source={{ uri: imageUrl }} style={styles.trackImage} />
        <View style={styles.trackInfo}>
          <Text style={{ color: textColor }}>{artist}</Text>
          <Text style={{ color: textColor }}>{album}</Text>
          <Text style={{ color: textColor }}>{track}</Text>
        </View>
      </View>
    ),
    [imageUrl, album, artist, track],
  )

const TrackItem = (props) => {
  const { artist, album, track, url, imageUrl, onPress } = props

  return (
    <Surface style={styles.container}>
      <TouchableRipple
        rippleColor="rgba(206, 137, 100, .32)"
        onPress={() => onPress(props)}
        style={{ flex: 1 }}
      >
        <TrackItemInfo {...props} />
      </TouchableRipple>
    </Surface>
  )
}

export default TrackItem
