import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { useAddTodolistMutation } from "@/features/todolists/api/todolistsApi"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { DragDropProvider } from "@dnd-kit/react"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists"

export const Main = () => {
  const [addTodolist] = useAddTodolistMutation()

  return (
    <DragDropProvider>
      <Container maxWidth={"lg"}>
        <Grid container sx={{ mb: "30px" }}>
          <CreateItemForm onCreateItem={addTodolist} />
        </Grid>
        <Grid container spacing={4}>
          <Todolists />
        </Grid>
      </Container>
    </DragDropProvider>
  )
}
