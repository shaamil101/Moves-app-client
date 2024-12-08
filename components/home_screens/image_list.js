import React from 'react';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import StarRating from './starRating';

const ImageList = ( {results} ) => {
  return (
    <View>
      {results.map((result, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image source={{ uri : result.photo }} style={styles.image} />
          <View style={styles.captionContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.captionTitle}>{result.name}</Text>
              <StarRating style={styles.captionRating} rating={result.rating} />
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.captionDescription}>
                  {result.distance.toFixed(1) + ' mi'}
              </Text>
              <Text style={styles.captionPrice}>
                  {result.price_level ? '$'.repeat(result.price_level) : 'Price level not available'}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        // backgroundColor: '#f5f5f5',
        paddingHorizontal: 10,
      },
      center: {
        alignItems: 'center',
      },
      imageContainer: {
        marginBottom: 20,
        alignItems: 'center',
      },
      image: {
        width: 300,
        height: 200,
        borderRadius: 10,
      },
      captionContainer: {
        width: 300, // Make sure the caption container takes full width
        // paddingHorizontal: 10, // Add some horizontal padding for better look
        marginTop: 10,
      },
      titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      captionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        flexShrink: 1, // Allow the title to shrink if necessary
      },
      captionRating: {
        marginLeft: 'auto',
      },
      infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      captionDescription: {
        fontSize: 14,
        color: '#666',
        textAlign: 'right',
      },
      captionPrice: {
        fontSize: 14,
        color: '#666',
      },
});

export default ImageList;
