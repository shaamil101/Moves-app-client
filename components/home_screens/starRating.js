// chat gpt heavily helped with this code
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({ rating }) => {
  const numFullStars = Math.floor(rating);
  const hasHalfStar = rating - numFullStars > 0;
  const stars = [];

  // Add full stars
  for (let i = 0; i < numFullStars; i++) {
    stars.push(
      <Icon
        key={i}
        name="star"
        size="auto"
        color="#FFD700"
      />
    );
  }

  // Add half star if applicable
  if (hasHalfStar) {
    stars.push(
      <Icon
        key="half"
        name="star-half-o"
        size='auto'
        color="#FFD700"
      />
    );
  }

  // Add empty stars to fill up to 5 stars
  const remainingStars = 5 - stars.length;
  for (let i = 0; i < remainingStars; i++) {
    stars.push(
      <Icon
        key={`empty-${i}`}
        name="star-o"
        size='auto'
        color="#FFD700"
      />
    );
  }

  return <View style={styles.starContainer}>{stars}</View>;
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
  },
});

export default StarRating;
