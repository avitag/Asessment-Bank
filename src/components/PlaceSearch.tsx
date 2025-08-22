import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { searchPlaces, selectPlace } from '../store/actions/searchActions';
import { Place } from '../store/types';

const PlaceSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const results = useAppSelector((state) => state.search.results);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(false); 

  const onChangeText = (text: string) => {
    setQuery(text);
     setSelected(false);
    if (text.length > 0) {
      dispatch(searchPlaces(text));
    }
  };

  const onSelectPlace = (place: Place) => {
    console.log('Selected place:', place);
    dispatch(selectPlace(place.placeId));
    setQuery(place.description);
    setSelected(true); 
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        placeholder="Search a place"
        onChangeText={onChangeText}
      />
      {query.length > 0 && !selected && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.placeId}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSelectPlace(item)} style={styles.item}>
              <Text>{item.description}</Text>
            </TouchableOpacity>
          )}
          style={styles.list}
        />
      )}
    </View>
  );
};

export default PlaceSearch;

const styles = StyleSheet.create({
  container: { zIndex: 10, padding: 10, backgroundColor: 'white' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8 },
  list: { marginTop: 5, maxHeight: 200 },
  item: { padding: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
});
