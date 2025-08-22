import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { setSelectedPlace } from '../store/actions/searchActions';
import palette from '../theme/palette';

const History: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.search.history); // assuming you store history in search slice

  const handleSelectHistory = (place: string) => {
    // Dispatch selected place by searching for details
    dispatch(setSelectedPlace({ description: place } as any)); // If you only store description
  };

  if (!history || history.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No search history yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={history}
      keyExtractor={(item, index) => `${item}-${index}`}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handleSelectHistory(item)}>
          <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default History;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    color: palette.textSecondary,
    fontSize: 16,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: palette.background,
  },
  itemText: {
    fontSize: 16,
    color: palette.textPrimary,
  },
  separator: {
    height: 1,
    backgroundColor: palette.border,
    marginHorizontal: 15,
  },
});
