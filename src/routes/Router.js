import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AlunoList from '../Components/Alunos/AlunosList'
import AdicionarAluno from '../Components/Alunos/AdicionarAluno';
import EditarAluno from '../Components/Alunos/EditarAluno';
import DetalhesAluno from '../Components/Alunos/DetalhesAluno';

const Stack = createStackNavigator();
function Routes() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='AlunosList' component={AlunoList} />
        <Stack.Screen name='AdicionarAluno' component={AdicionarAluno} />
        <Stack.Screen name='EditarAluno' component={EditarAluno}/>
        <Stack.Screen name='DetalhesAluno' component={DetalhesAluno}/>
     </Stack.Navigator>
    );
  }
  export default Routes;
