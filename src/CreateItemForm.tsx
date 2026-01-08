import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button.tsx';
 type Props = {
   createItem: (title: string) => void;
 }

export const CreateItemForm = ({ createItem}:Props) => {

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
      <input value={itemTitle}
             onChange={changeTaskHandler}
             onKeyDown={createTaskOnEnterHandler}
             className={error ? 'error' : ''}/>
      <Button title={'+'} onClick={createItemHandler}/>
      {error && <div className={'error-message'}>{error}</div>}
    </div>
  );
};

