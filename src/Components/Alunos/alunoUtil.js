import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para carregar a lista de alunos do AsyncStorage
export const carregarAlunos = async () => {
  try {
    const alunosJson = await AsyncStorage.getItem('alunos');
    if (alunosJson !== null) {
      return JSON.parse(alunosJson);
    }
    return [];
  } catch (error) {
    console.error('Erro ao carregar os alunos', error);
    return [];
  }
};

// Função para salvar a lista de alunos no AsyncStorage
export const salvarAlunos = async (alunos) => {
  try {
    await AsyncStorage.setItem('alunos', JSON.stringify(alunos));
  } catch (error) {
    console.error('Erro ao salvar os alunos', error);
  }
};

// Função para excluir um aluno da lista e atualizar o AsyncStorage
export const excluirAluno = async (alunoId) => {
  try {
    const alunos = await carregarAlunos();
    const novosAlunos = alunos.filter((aluno) => aluno.id !== alunoId);
    await salvarAlunos(novosAlunos);
  } catch (error) {
    console.error('Erro ao excluir o aluno', error);
  }
};
