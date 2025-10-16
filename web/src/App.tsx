import { useEffect, useState } from 'react'
import './App.css'
import { Trash } from 'phosphor-react';

type Task = {
  id: number;
  titulo: string;
  feito: boolean;
}

function App() {

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const APIresponse = await fetch('http://localhost:3000/tasks/')
      const tasks = await APIresponse.json()
      console.log("Total de tarefas: ", tasks.length)
      setTasks(tasks)
    };
    fetchData()
  }, [])


  const HandleCheckboxClick = async (id: number) => {

    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, feito: !task.feito } : task
    );
    setTasks(updatedTasks);

    const state = updatedTasks.find(task => task.id === id)?.feito ? 'done' : 'undo';

    try {
      await fetch(`http://localhost:3000/tasks/${id}/${state}`, { method: 'POST' })
      if (state === 'done') {
        console.log(`Tarefa ${id} marcada como feita.`)
      } else {
        console.log(`Tarefa ${id} desmarcada.`)
      }
    } catch (error) {
      console.error("Erro ao alterar tarefa:", error)
    }


  }

  const deleteTask = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}/delete`, { method: 'DELETE' })
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      console.log(`Tarefa ${id} deletada com sucesso.`)
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error)
    }
  }

  const createTask = async () => {
    const input = document.querySelector('.newTaskInput') as HTMLInputElement | null;
    const titulo = input?.value.trim();

    try {
      await fetch(`http://localhost:3000/tasks/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo })
      })
      if (!titulo) {
        console.warn('Título vazio. Criação cancelada.');
        return;
      }

      const listResponse = await fetch('http://localhost:3000/tasks/');
      if (!listResponse.ok) {
        console.error('Falha ao atualizar lista de tarefas após criação.');
        return;
      }
      const updated = await listResponse.json();
      setTasks(updated);
      if (input) {
        input.value = '';
        input.focus();
      }
      console.log('Tarefa criada com sucesso.');
      
    } catch (error) {
      console.error("Erro ao criar tarefa:", error)
    }
  }


  return (
    <>
      <div className="App">
        <h1>Bem vindo ao To-Do do Henrique</h1>
        <div className="card">
          <h2>Você tem {tasks.length} tarefas pendentes</h2>
          <ul>
            {tasks.map((task) => (
              <label className='listTask' key={task.id}>
                <input
                  type='checkbox'
                  checked={task.feito}
                  onClick={() =>
                    HandleCheckboxClick(task.id)}
                  className='checkbox'
                /> {task.titulo}
                <button className='trashButton' onClick={async () => deleteTask(task.id)}>
                  <Trash size={20} />
                </button>
                <br />
              </label>
            ))}
          </ul>
          <div className='divider' />
          <div className='newTaskContainer'>
            <input className='newTaskInput' placeholder='Digite a nova tarefa' />
            <button className='newTaskButton' onClick={async () => createTask()}>
              <p>Criar Nova Tarefa</p>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App


