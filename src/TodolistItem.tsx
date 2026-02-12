import {CreateItemForm} from './CreateItemForm.tsx';
import {Box} from '@mui/material';
import Button from '@mui/material/Button'
import {containerSx} from './TodolistItem.styles.ts';
import {changeTodolistFilterAC, FilterValueTitle, Todolist} from '@/model/todolists-reducer.ts';
import {createTaskAC} from '@/model/tasks-reducer.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {TodolistTitle} from '@/TodolistTitle.tsx';
import {Tasks} from '@/Tasks.tsx';


type Props = {
  todolist: Todolist
}


export const TodolistItem = ({todolist}:Props)=>{
  const {id,filter}=todolist


  const dispatch = useAppDispatch();


  const changeFilterHandler = (filter: FilterValueTitle) => {
    dispatch(changeTodolistFilterAC({id, filter}));
  }

  const createItemHandler = (title: string) => {
    dispatch(createTaskAC({id: id, title}))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist}/>
      <CreateItemForm createItem={createItemHandler}/>
     <Tasks todolist={todolist}/>


      <Box sx={containerSx}>
        <Button variant={filter === 'all' ? 'outlined' : 'text'}
                color={'inherit'}
                onClick={() => changeFilterHandler('all')}>
          All
        </Button>
        <Button variant={filter === 'active' ? 'outlined' : 'text'}
                color={'primary'}
                onClick={() => changeFilterHandler('active')}>
          Active
        </Button>
        <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                color={'secondary'}
                onClick={() => changeFilterHandler('completed')}>
          Completed
        </Button>
      </Box>
    </div>
  );
};

