import { Card, Text } from '@ant-design/react-native';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setSelectedPlace } from '../store/actions/searchActions';
import { Place } from '../store/types';

const Suggestions: React.FC = () => {
  const dispatch = useAppDispatch();
  const suggestions = useAppSelector((state) => state.search.results);

  const handleSelect = (place: Place) => {
    dispatch(setSelectedPlace(place));
  };

  const renderItem = ({ item }: { item: Place }) => (
    <TouchableOpacity onPress={() => handleSelect(item)}>
      <Card style={styles.card}>
        <Text>{item.description}</Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={suggestions}
      keyExtractor={(item) => item.placeId}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      ListEmptyComponent={<Text style={styles.emptyText}>No suggestions found.</Text>}
    />
  );
};

export default Suggestions;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    marginBottom: 8,
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});
