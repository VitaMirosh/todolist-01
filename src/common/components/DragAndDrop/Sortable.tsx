import { useSortable } from "@dnd-kit/react/sortable"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { DomainTodolist } from "@/features/todolists/lib/types"

type Props = {
  id: string
  index: number
  todolist: DomainTodolist
}

export function Sortable({ id, index, todolist }: Props) {
  const { ref } = useSortable({ id, index })

  return (
    <li ref={ref} className="item">
      <TodolistItem todolist={todolist} />
    </li>
  )
}
