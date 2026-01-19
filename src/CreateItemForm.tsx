import {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button'
import {TextField} from '@mui/material';

type Props = {
  createItem: (title: string) => void;
}

export const CreateItemForm = ({createItem}: Props) => {

  const [itemTitle, setItemTitle] = useState('');
  const [error, setError] = useState<string | null>(null);


  const createItemHandler = () => {
    if (itemTitle.trim() !== '') {
      createItem(itemTitle.trim())
      setItemTitle('')
    } else {
      setError('Title is required')
    }

  }
  const changeTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(event.currentTarget.value)
    setError(null)

  }

  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createItemHandler()

    }
  }

  return (
    <div>
      <TextField label={'Enter a title'}
                 variant={'outlined'}
                 className={error ? 'error' : ''}
                 value={itemTitle}
                 size={'small'}
                 onChange={changeTaskHandler}
                 onKeyDown={createTaskOnEnterHandler}/>
      <Button variant="contained" onClick={createItemHandler}>+</Button>
      {error && <div className={'error-message'}>{error}</div>}
    </div>
  );
};

