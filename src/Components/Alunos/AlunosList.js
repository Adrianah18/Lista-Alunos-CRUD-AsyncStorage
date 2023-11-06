import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AlunosList = ({ navigation }) => {
  const [alunos, setAlunos] = useState([]);

  const carregarAlunos = async () => {
    try {
      const alunosJSON = await AsyncStorage.getItem('alunos');
      if (alunosJSON !== null) {
        const alunosData = JSON.parse(alunosJSON);
        setAlunos(alunosData);
      }
    } catch (error) {
      console.error('Erro ao carregar alunos: ', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarAlunos();
    });

    return unsubscribe;
  }, [navigation]);

  const handleExcluir = (alunoId) => {
    const novaListaAlunos = alunos.filter((aluno) => aluno.id !== alunoId);
    setAlunos(novaListaAlunos);

    // Atualize o AsyncStorage com a lista atualizada de alunos após a exclusão
    AsyncStorage.setItem('alunos', JSON.stringify(novaListaAlunos))
      .catch((error) => {
        console.error('Erro ao salvar alunos após exclusão: ', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Alunos</Text>
      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.alunoItem}>
            <Text style={styles.nomeAluno}>{item.nome}</Text>
            <View style={styles.botoesContainer}>
              <TouchableOpacity
                style={[styles.botaoDetalhes, { marginBottom: 5 }]}
                onPress={() => navigation.navigate('DetalhesAluno', { aluno: item })}
              >
                <Text style={styles.botaoTexto}>Detalhes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.botaoExcluir, { marginBottom: 5 }]}
                onPress={() => handleExcluir(item.id)}
              >
                <Text style={styles.botaoTexto}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Button
        title="Adicionar Aluno"
        onPress={() => navigation.navigate('AdicionarAluno')}
      />
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
  alunoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
  },
  nomeAluno: {
    fontSize: 16,
  },
  botoesContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  botaoDetalhes: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: 85,
  },
  botaoExcluir: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: 85,
  },
  botaoTexto: {
    color: 'white',
    textAlign: 'center',
  },
});

export default AlunosList;
