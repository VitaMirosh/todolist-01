import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {changeTodolistTitleAC, deleteTodolistAC, Todolist} from '@/model/todolists-reducer.ts';
import {EditableSpan} from '@/EditableSpan.tsx';
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  todolist: Todolist
}
export const TodolistTitle = ({todolist}: Props) => {
  const {id, title} = todolist

  const dispatch = useAppDispatch();

  const deleteTodolistHandler = () => {
    dispatch(deleteTodolistAC({id}))
  }
  const changeTodolistHandler = (title: string) => {
    dispatch(changeTodolistTitleAC({id, title}))
  }
  return (
    <div className={'container'}>
      <h3><EditableSpan value={title} onChange={changeTodolistHandler}/></h3>
      <IconButton onClick={deleteTodolistHandler}>
        <DeleteIcon/>
      </IconButton>
    </div>
  );
};
