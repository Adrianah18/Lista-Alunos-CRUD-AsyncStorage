import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [people, setPeople] = useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddPerson = () => {
    if (newPerson) {
      if (editIndex === -1) {
        setPeople([...people, newPerson]);
      } else {
        const updatedPeople = [...people];
        updatedPeople[editIndex] = newPerson;
        setPeople(updatedPeople);
        setEditIndex(-1);
      }
      setNewPerson('');
    }
  };

  const handleEditPerson = (index) => {
    setNewPerson(people[index]);
    setEditIndex(index);
  };

  const handleDeletePerson = (index) => {
    const updatedPeople = people.filter((_, i) => i !== index);
    setPeople(updatedPeople);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Pessoas</Text>
      <TextInput
        placeholder="Nome da Pessoa"
        value={newPerson}
        onChangeText={(text) => setNewPerson(text)}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddPerson}
      >
        <Text style={styles.buttonText}>
          {editIndex === -1 ? 'Adicionar' : 'Salvar'}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={people}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.personItem}>
            <Text>{item}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditPerson(index)}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeletePerson(index)}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop:50
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign:"center",
    marginBottom:25
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius:10,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white'
  },
  personItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:10, 
    borderWidth: 1,
    borderRadius:10,
    marginTop: 20
  },
  buttonContainer: {
    flexDirection: 'row',

  },
  editButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
});