import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import { containerSx } from "@/common/styles"
import { TodolistSkeleton } from "@/features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton.tsx"
import { Sortable } from "@/common/components/DragAndDrop/Sortable.tsx"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi.ts"

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery(undefined, {
    pollingInterval: 10000,
    skipPollingIfUnfocused: false,
  })

  if (isLoading) {
    return (
      <Box sx={containerSx} style={{ gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    )
  }

  return (
    <>
      {todolists?.map((todolist, index) => (
        <Grid>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <Sortable id={todolist.id} index={index} todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
