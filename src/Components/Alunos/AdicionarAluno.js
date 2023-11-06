import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdicionarAluno = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [turno, setTurno] = useState('');
  const [curso, setCurso] = useState('');

  const handleSalvar = async () => {
    const novoAluno = {
      id: Date.now(),
      nome,
      matricula,
      turno,
      curso,
    };

    try {
      const alunosJSON = await AsyncStorage.getItem('alunos');
      let listaAlunos = [];

      if (alunosJSON !== null) {
        listaAlunos = JSON.parse(alunosJSON);
      }

      listaAlunos.push(novoAluno);

      await AsyncStorage.setItem('alunos', JSON.stringify(listaAlunos));
      
      navigation.navigate('AlunosList');
    } catch (error) {
      console.error('Erro ao salvar aluno: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Aluno</Text>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Matrícula"
        value={matricula}
        onChangeText={(text) => setMatricula(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Turno"
        value={turno}
        onChangeText={(text) => setTurno(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Curso"
        value={curso}
        onChangeText={(text) => setCurso(text)}
        style={styles.input}
      />
      <View style={styles.botaoContainer}>
        <TouchableOpacity
          style={[styles.botao, styles.botaoSalvar]}
          onPress={handleSalvar}
        >
          <Text style={styles.botaoTexto}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  botaoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  botao: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  botaoTexto: {
    color: 'white',
    textAlign: 'center',
  },
  botaoSalvar: {
    width: 100,
    backgroundColor: 'blue',
  },
});

export default AdicionarAluno;
