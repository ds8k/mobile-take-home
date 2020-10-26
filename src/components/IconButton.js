import React from 'react'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableRipple } from 'react-native-paper'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const IconButton = ({ onPress, ...props }) => (
  <TouchableRipple style={styles.container} onPress={onPress}>
    <Icon {...props} />
  </TouchableRipple>
)

export default IconButton
