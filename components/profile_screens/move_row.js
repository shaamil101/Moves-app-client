import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const MoveRow = ({ name, isOwner, onPress }) => {
    return (
        <TouchableOpacity style={styles.link} onPress={onPress}>
            <View style={styles.linkContent}>
                <Text style={styles.linkText} numberOfLines={2} ellipsizeMode="tail">{name}</Text>
                {isOwner === true && 
                    <View style={styles.ownerBadge}>
                        <Text style={styles.ownerText}>
                            Creator
                        </Text>
                    </View>
                }
                <Ionicons name="chevron-forward" size={20} color="black" />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 100,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 50,
    fontStyle: 'italic',
  },
  title2: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    // fontStyle: 'italic',
  },
  link: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: '100%',
  },
  linkContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 18,
    color: '#000',
    width: '50%',
  },
  ownerBadge: {
    backgroundColor: '#006400', // Dark green color
    borderRadius: 15, // Adjust the value for roundness
    paddingHorizontal: 10, // Add padding for text spacing
  },
  ownerText: {
    fontSize: 18,
    color: '#fff', // White color for text
  },
});

export default MoveRow;
