import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditarAluno({ route, navigation }) {
  const { aluno } = route.params;
  const [nome, setNome] = useState(aluno.nome);
  const [matricula, setMatricula] = useState(aluno.matricula);
  const [turno, setTurno] = useState(aluno.turno);
  const [curso, setCurso] = useState(aluno.curso);

  const handleSalvar = async () => {
    const alunoEditado = {
      id: aluno.id,
      nome,
      matricula,
      turno,
      curso,
    };

    try {
      // Obtenha a lista atual de alunos do AsyncStorage
      const alunosJSON = await AsyncStorage.getItem('alunos');
      let listaAlunos = [];

      if (alunosJSON !== null) {
        listaAlunos = JSON.parse(alunosJSON);
      }

      // Encontre o índice do aluno na lista e substitua-o pelo aluno editado
      const index = listaAlunos.findIndex((a) => a.id === aluno.id);
      if (index !== -1) {
        listaAlunos[index] = alunoEditado;
      }

      // Atualize a lista de alunos no AsyncStorage
      await AsyncStorage.setItem('alunos', JSON.stringify(listaAlunos));

      // Navegue de volta para a tela de detalhes com o aluno editado
      navigation.navigate('DetalhesAluno', { aluno: alunoEditado });
    } catch (error) {
      console.error('Erro ao salvar aluno editado: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Aluno</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Matrícula"
        value={matricula}
        onChangeText={(text) => setMatricula(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Turno"
        value={turno}
        onChangeText={(text) => setTurno(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Curso"
        value={curso}
        onChangeText={(text) => setCurso(text)}
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
}

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
    backgroundColor: 'green', // Cor de fundo do botão
    padding: 10,
    borderRadius: 5,
  },
  botaoTexto: {
    textAlign: 'center',
    color: 'white', // Cor do texto dentro do botão
  },
  botaoSalvar: {
    width: 100,
    backgroundColor: 'blue', // Cor de fundo do botão Salvar
  },
});
