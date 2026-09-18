import { useDispatch } from "react-redux"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Field, FieldGroup } from "./ui/field"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { addTodo } from "../api/todo.api"

interface Iprops{
  open:boolean,
  setOpen:(value:boolean)=>void
}

export function AddUser({open,setOpen}:Iprops) {
    const dispatch=useDispatch()

    const handelSubmit=(e)=>{
        e.preventDefault()
        const formData=new FormData()
        formData.append("name", e.target.name.value)
        formData.append("description", e.target.description.value)
        const files = e.target.image.files
        console.log(files);
        for (const file of files) {
          formData.append(`Images`,file)
        }
        dispatch(addTodo(formData))
        setOpen(false)
        e.target.reset()
    }

  return (
    <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent className="sm:max-w-sm">
      <form onSubmit={handelSubmit}>
          <DialogHeader>
            <DialogTitle>New User</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="image">Image / File</Label>
              <Input id="image" multiple name="image" type="file" />
            </Field>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name"  />
            </Field>
            <Field>
              <Label htmlFor="description-1">Description</Label>
              <Input id="description-1" name="description"  />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button onClick={()=>setOpen(false)} variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
      </form>
        </DialogContent>
    </Dialog>
  )
}
