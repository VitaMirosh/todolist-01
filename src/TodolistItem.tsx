import {CreateItemForm} from './CreateItemForm.tsx';
import {Todolist} from '@/model/todolists-reducer.ts';
import {createTaskAC} from '@/model/tasks-reducer.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {TodolistTitle} from '@/TodolistTitle.tsx';
import {Tasks} from '@/Tasks.tsx';
import {FilterButtons} from '@/FilterButtons.tsx';


type Props = {
  todolist: Todolist
}


export const TodolistItem = ({todolist}: Props) => {
  const {id} = todolist

  const dispatch = useAppDispatch();

  const createItemHandler = (title: string) => {
    dispatch(createTaskAC({id: id, title}))
  }
  return (
    <div>
      <TodolistTitle todolist={todolist}/>
      <CreateItemForm createItem={createItemHandler}/>
      <Tasks todolist={todolist}/>
      <FilterButtons todolist={todolist}/>

    </div>
  );
};

